# PLUTO Language – Syntax & Real-World Usage Research

## 1. PLUTOとは

**PLUTO** = "Procedure Language for Users in Test and Operations"

- 規格: **ECSS-E-ST-70-32C** (European Committee for Space Standardization, 2008)
- 欧州宇宙標準化機関(ECSS)が策定したオープン標準（無料公開）
- 宇宙システムのテスト・運用手順を記述するためのDSL
- 「人間が読める」+「機械でパースできる」二面性が最大の特徴
- 宇宙分野で設計されたが、機械・機器の監視・制御が必要なあらゆる分野に適用可能

---

## 2. 手順書（Procedure）の構造

PLUTOの手順書は以下の4つのブロックから構成される。

```
procedure <name>
  preconditions     ← 実行前に満たすべき条件
    ...
  end preconditions

  main              ← 主処理（コマンド送信・テレメトリ確認・計算など）
    step <stepname>
      ...
    end step
  end main

  confirmation      ← 手順完了後の確認条件
    ...
  end confirmation
end procedure
```

各 `step` はそれ自体が「ミニ手順」であり、自身の preconditions / main / confirmation / watchdog を持てる。

---

## 3. 文法の主要要素

### 3.1 基本仕様

| 項目 | 内容 |
|------|------|
| 大文字小文字 | **大文字小文字を区別しない** (case-insensitive) |
| コメント | `/* ... */` または `// ...` |
| セミコロン | 文の区切りに使用 |

### 3.2 キーワード（抜粋）

```
procedure  end  step  preconditions  main  confirmation  watchdog
if  then  else  end if
while  do  end while
repeat  until
wait  until  for
initiate  confirm  abort
send  command
check  value  of
set  variable
call
```

### 3.3 型システム

| 型 | 例 |
|----|-----|
| 整数 | `42`, `-10` |
| 実数 | `3.14`, `-0.5` |
| 文字列 | `"hello"` |
| ブール | `true`, `false` |
| 時刻 | `12:00:00`, `2024-01-01` |
| 工学単位付き数値 | `60 degC`, `0.2 deg/h`, `100 rpm` |

### 3.4 条件・制御構文

```pluto
-- if-then-else
if value of TempSensor > 60 degC then
  initiate and confirm CoolingSystem;
end if

-- wait until（テレメトリ監視）
wait until value of GyroStatus = ACTIVE;

-- wait for（タイムアウト付き）
wait for 30 s until value of PowerOK = true;

-- while ループ
while value of Counter < 10 do
  set Counter = Counter + 1;
end while
```

### 3.5 アクティビティ（コマンド）呼び出し

```pluto
-- コマンド送信のみ
initiate SwitchOnGyro;

-- 送信＋完了確認まで待つ
initiate and confirm SwitchOnGyro;

-- 中止
abort SwitchOnGyro;
```

### 3.6 テレメトリ参照（reporting data）

```pluto
-- パラメータ値の取得
value of GyroTemp        -- ジャイロ温度
value of BatteryVoltage  -- バッテリー電圧

-- 複合条件
value of GyroTemp > 60 degC and value of BatteryVoltage > 28 V
```

---

## 4. 実際のPLUTOコード例

### 例1: ジャイロセンサー起動手順（ECSS標準仕様書より）

```pluto
procedure
  preconditions
    wait until value of GyroTemp > 60 degC
  end preconditions

  main
    initiate and confirm SwitchOnGyroConverter;
    initiate and confirm SwitchOnGyro5;
    initiate and confirm Gyro5FineMode;
  end main

  confirmation
    wait until value of Gyro5 < 0.2 deg/h
  end confirmation
end procedure
```

↓ これがPython（LibreCubeパーサー）に変換されると：

```python
from pluto import *
from model import *

class Procedure_test0921(Procedure):
    def preconditions(self):
        if self.wait_until_expression(
            lambda: GyroTemp.get_value() > ureg('60degC')) is False:
            return False

    def main(self):
        act = ActivityCall(self, SwitchOnGyroConverter)
        if self.initiate_and_confirm_activity(act) is False: return False
        act = ActivityCall(self, SwitchOnGyro5)
        if self.initiate_and_confirm_activity(act) is False: return False
        act = ActivityCall(self, Gyro5FineMode)
        if self.initiate_and_confirm_activity(act) is False: return False

    def confirmation(self):
        if self.wait_until_expression(
            lambda: Gyro5.get_value() < ureg('0.2deg')/h) is False:
            return False
```

### 例2: ステップ構造を持つ手順

```pluto
procedure OrbitManeuver
  main
    step PrepareThrusters
      preconditions
        wait until value of ThrusterTemp > 20 degC
      end preconditions
      main
        initiate and confirm ThrusterValveOpen;
        set FuelPressure = 200 kPa;
      end main
    end step

    step FireThrusters
      main
        initiate and confirm MainThrusterBurn;
        wait for 120 s until value of DeltaV > 5 m/s;
      end main
      confirmation
        check value of ThrusterStatus = NOMINAL;
      end confirmation
    end step
  end main
end procedure
```

---

## 5. Tree-sitter Grammar設計への示唆

| PLUTOの特徴 | Tree-sitter実装方針 |
|-------------|---------------------|
| `procedure...end procedure` のネスト構造 | 再帰的なルール定義 |
| `step...end step` のネスト | procedure内の子ノードとして定義 |
| `value of <identifier>` の構文 | `seq('value', 'of', $.identifier)` |
| 工学単位 `60 degC` | 数値＋単位の複合トークン |
| case-insensitive | `extras` + カスタムスキャナーで対応 |
| `initiate and confirm` などの複合キーワード | `seq` で表現 |

---

## 6. 実際のミッションでの採用事例

### ESA（欧州宇宙機関）ミッション
- **Gaia** – 天の川銀河の10億星マッピングミッション。ESAのSCOS（宇宙船制御システム）と連携してPLUTOを運用自動化に使用
- **Sentinel** – 地球観測衛星群。ESOC（欧州宇宙運用センター、ダルムシュタット）からPLUTO手順で制御
- 上記は**MATIS**（Mission Automation System）経由でMOIS（製造・運用情報システム）からPLUTO手順がエクスポートされ実行される

### DLR（ドイツ航空宇宙センター）
- 複数のミッションの自動化運用にPLUTOを使用（LibreCube公式資料より）

### RADARSAT-2（カナダ宇宙庁 / MDA）
- カナダの商業地球観測衛星。**RASE（Remote Autonomous Scheduling Environment）**環境でPLUTOを採用
- リアルタイムのIn-flight宇宙機制御に初めて商業ミッションでPLUTOを本格採用した先例
- 2004年のSpace Ops会議で論文発表: "The PLUTO Operations Procedure Language Standard and its Use for RADARSAT-2 Mission Operations"

### Galileo衛星測位システム（ESA / EU）
- PLUTO d18（ドラフト18版）をSMF（Spacecraft Model Framework）向けにカスタマイズして使用
- MATISシステム経由で手順を管理・実行

### INPE（ブラジル宇宙研究所）
- Brazilian satellite の On-Board Data Handling Computer (OBDH) の機能テストにPLUTOを採用
- Space System Model (SSM) 仕様と組み合わせたテスト環境を開発

### LibreCube（オープンソースCubeSat）
- PLUTOパーサー（Python実装）をGSoC 2019で開発
- CubeSatや小型衛星のテスト・運用自動化にPLUTOを推進

---

## 7. 参考リンク

- [ECSS-E-ST-70-32C 標準仕様書](https://ecss.nl/standard/ecss-e-st-70-32c-test-and-operations-procedure-language/)
- [LibreCube python-pluto-parser](https://gitlab.com/librecube/lib/python-pluto-parser)
- [LibreCube PLUTO to Python Parser 発表スライド (OSCW 2019)](https://events.libre.space/event/3/contributions/49/)
- [RADARSAT-2へのPLUTO適用論文 (AIAA 2004)](https://arc.aiaa.org/doi/abs/10.2514/6.2004-538-333)
- [LibreCube VSCodium PLUTOプラグイン](https://gitlab.com/librecube/tools/vscodium-pluto-syntax)
