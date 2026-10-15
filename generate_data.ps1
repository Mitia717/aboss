$ErrorActionPreference = "Stop"
$root = Split-Path -Parent $MyInvocation.MyCommand.Path
$csvPath = Join-Path $root "org.csv"
$rows = Import-Csv -Path $csvPath -Delimiter ";"

$products = @(
  @{code="CREDIT"; name="Кредитный продукт"},
  @{code="FACTORING"; name="Факторинг"},
  @{code="LEASING"; name="Лизинг"},
  @{code="BG"; name="Банковская гарантия"},
  @{code="BIZ_CARD"; name="Бизнес-карта"},
  @{code="CASH_COLL"; name="Инкассация"},
  @{code="CASH_COLL_ONLINE"; name="Онлайн-инкассация"},
  @{code="FX_CTRL"; name="Валютный контроль и перевод"},
  @{code="PAYROLL"; name="Зарплатный проект"},
  @{code="RKO"; name="Расчетный счет (РКО)"},
  @{code="ACQ_ECOM"; name="Интернет-эквайринг"},
  @{code="ACQ_POS"; name="Торговый эквайринг"},
  @{code="SBP"; name="Система быстрых платежей"},
  @{code="FX_CONV"; name="Конвертация валюты (ВЭД)"},
  @{code="DEPOSIT"; name="Депозит"},
  @{code="FIXED_BALANCE"; name="Фиксированный остаток"},
  @{code="INTEREST_BALANCE"; name="Проценты на остаток по счету"},
  @{code="LC"; name="Аккредитив"},
  @{code="HEDGE"; name="Хеджирование"}
)

# Lightweight: export teams only; KM metrics generated in browser
$teams = @()
foreach ($r in $rows) {
  $teams += [ordered]@{
    division = $r."Дивизион".Trim()
    region = $r."Регион".Trim()
    team = $r."Команда".Trim()
    kmCount = [int]$r."Кол-во КМ"
  }
}

$out = [ordered]@{
  meta = [ordered]@{
    weekLabel = "22–28 сен 2025"
    prevWeekLabel = "15–21 сен 2025"
    ttlDays = 14
    defaultDivision = "МОСКОВСКИЙ"
    defaultRegion = "Москва Упр 1"
    defaultTeamPrefix = "Москва. Упр 1 Отд 1"
    totalTeams = $teams.Count
  }
  products = $products
  teams = $teams
}

$json = $out | ConvertTo-Json -Depth 6 -Compress
$js = "window.PROTO_DATA = $json;`n"
$outPath = Join-Path $root "data.js"
[System.IO.File]::WriteAllText($outPath, $js, [System.Text.UTF8Encoding]::new($false))
Write-Host "Wrote $outPath teams=$($teams.Count)"
