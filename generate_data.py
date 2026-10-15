# -*- coding: utf-8 -*-
"""Generate prototype mock data from org.csv"""
import csv
import json
import hashlib
from pathlib import Path

ROOT = Path(__file__).parent
PRODUCTS = [
    ("CREDIT", "Кредитный продукт"),
    ("FACTORING", "Факторинг"),
    ("LEASING", "Лизинг"),
    ("BG", "Банковская гарантия"),
    ("BIZ_CARD", "Бизнес-карта"),
    ("CASH_COLL", "Инкассация"),
    ("CASH_COLL_ONLINE", "Онлайн-инкассация"),
    ("FX_CTRL", "Валютный контроль и перевод"),
    ("PAYROLL", "Зарплатный проект"),
    ("RKO", "Расчетный счет (РКО)"),
    ("ACQ_ECOM", "Интернет-эквайринг"),
    ("ACQ_POS", "Торговый эквайринг"),
    ("SBP", "Система быстрых платежей"),
    ("FX_CONV", "Конвертация валюты (ВЭД)"),
    ("DEPOSIT", "Депозит"),
    ("FIXED_BALANCE", "Фиксированный остаток"),
    ("INTEREST_BALANCE", "Проценты на остаток по счету"),
    ("LC", "Аккредитив"),
    ("HEDGE", "Хеджирование"),
]

SURNAMES = [
    "Иванов", "Петров", "Сидоров", "Смирнов", "Кузнецов", "Попов", "Васильев",
    "Соколов", "Михайлов", "Новиков", "Фёдоров", "Морозов", "Волков", "Алексеев",
    "Лебедев", "Семёнов", "Егоров", "Павлов", "Козлов", "Степанов", "Николаев",
    "Орлов", "Андреев", "Макаров", "Никитин", "Захаров", "Зайцев", "Соловьёв",
    "Борисов", "Яковлев", "Григорьев", "Романов", "Воробьёв", "Сергеев", "Фролов",
    "Александров", "Дмитриев", "Королёв", "Гусев", "Киселёв", "Ильин", "Максимов",
    "Поляков", "Сорокин", "Виноградов", "Ковалёв", "Белов", "Медведев", "Антонов",
    "Тарасов", "Жуков", "Баранов", "Филиппов", "Комаров", "Давыдов", "Беляев",
    "Герасимов", "Богданов", "Осипов", "Сидорова", "Иванова", "Петрова", "Смирнова",
    "Кузнецова", "Попова", "Васильева", "Соколова", "Новикова", "Морозова", "Волкова",
    "Лебедева", "Козлова", "Орлова", "Никитина", "Зайцева", "Романова", "Сергеева",
]
MALE_NAMES = ["Александр", "Дмитрий", "Максим", "Сергей", "Андрей", "Алексей", "Артём", "Илья", "Кирилл", "Михаил", "Никита", "Иван", "Егор", "Роман", "Владимир", "Павел", "Денис", "Тимур", "Олег", "Юрий"]
FEMALE_NAMES = ["Анна", "Мария", "Елена", "Ольга", "Наталья", "Екатерина", "Ирина", "Татьяна", "Светлана", "Юлия", "Анастасия", "Дарья", "Виктория", "Полина", "Алина"]
MALE_PATR = ["Александрович", "Дмитриевич", "Сергеевич", "Андреевич", "Алексеевич", "Иванович", "Михайлович", "Николаевич", "Павлович", "Викторович"]
FEMALE_PATR = ["Александровна", "Дмитриевна", "Сергеевна", "Андреевна", "Алексеевна", "Ивановна", "Михайловна", "Николаевна", "Павловна", "Викторовна"]

COMPANY_PREFIX = ["ООО", "АО", "ПАО", "ЗАО"]
COMPANY_CORE = [
    "СеверТорг", "ВостокСнаб", "ТехноПром", "АльфаСтрой", "МегаЛогистик", "РусАгро",
    "СибМеталл", "УралХим", "ЮгТранс", "БалтФлот", "НеваСофт", "МосСервис",
    "ПрофиТрейд", "ГлобалФуд", "ИнвестГрупп", "СтройМастер", "ЭкоЛайт", "ФинЛизинг",
    "КапиталПлюс", "ДальЭкспорт", "ЦентрПак", "РитейлХаб", "МедТехника", "АвтоДилер",
    "Горизонт", "Импульс", "Вектор", "Партнёр", "Стандарт", "Орион", "Атлант", "Феникс",
]


def seed_int(s: str) -> int:
    return int(hashlib.md5(s.encode("utf-8")).hexdigest()[:8], 16)


class RNG:
    def __init__(self, seed: int):
        self.state = seed & 0xFFFFFFFF

    def next(self) -> int:
        self.state = (1103515245 * self.state + 12345) & 0x7FFFFFFF
        return self.state

    def randint(self, a: int, b: int) -> int:
        if b <= a:
            return a
        return a + self.next() % (b - a + 1)

    def choice(self, arr):
        return arr[self.next() % len(arr)]

    def random(self) -> float:
        return (self.next() % 10000) / 10000.0


def make_name(rng: RNG, idx: int) -> str:
    female = rng.random() < 0.42
    if female:
        sur = rng.choice([s for s in SURNAMES if s.endswith("а") or s.endswith("ова") or s.endswith("ева") or s.endswith("ина")])
        if not sur.endswith(("а", "я")):
            sur = rng.choice(["Иванова", "Петрова", "Смирнова", "Козлова", "Орлова", "Новикова", "Волкова", "Лебедева", "Сергеева", "Морозова"])
        return f"{sur} {rng.choice(FEMALE_NAMES)[0]}.{rng.choice(FEMALE_PATR)[0]}."
    sur = rng.choice([s for s in SURNAMES if not s.endswith("а")])
    return f"{sur} {rng.choice(MALE_NAMES)[0]}.{rng.choice(MALE_PATR)[0]}."


def company_name(rng: RNG, i: int) -> str:
    return f"{rng.choice(COMPANY_PREFIX)} «{rng.choice(COMPANY_CORE)}-{rng.randint(10, 99)}»"


def gen_km_metrics(km_id: str, team_size_hint: int = 3):
    rng = RNG(seed_int(km_id))
    potential = rng.randint(45, 120)
    clients = int(potential * (0.55 + rng.random() * 0.25))
    prospects = potential - clients
    ab_share = 0.45 + rng.random() * 0.4
    with_ab = int(potential * ab_share)

    # Persona archetypes based on seed
    archetype = rng.next() % 5
    # 0 leader, 1 normal, 2 lagger with capacity, 3 base locked (high active UKP), 4 high expire

    if archetype == 3:
        active_ukp = int(potential * (0.72 + rng.random() * 0.18))
        available = max(0, min(potential - active_ukp, rng.randint(0, 8)))
        delta_ukp = rng.randint(0, 3)
    elif archetype == 2:
        active_ukp = int(potential * (0.15 + rng.random() * 0.15))
        available = potential - active_ukp - rng.randint(5, 15)
        available = max(15, available)
        delta_ukp = rng.randint(0, 2)
    elif archetype == 0:
        active_ukp = int(potential * (0.35 + rng.random() * 0.2))
        available = max(8, potential - active_ukp - rng.randint(0, 10))
        delta_ukp = min(available, rng.randint(7, 14))
    elif archetype == 4:
        active_ukp = int(potential * (0.25 + rng.random() * 0.2))
        available = max(5, potential - active_ukp - rng.randint(0, 12))
        delta_ukp = rng.randint(3, 8)
    else:
        active_ukp = int(potential * (0.3 + rng.random() * 0.25))
        available = max(0, potential - active_ukp - rng.randint(0, 12))
        delta_ukp = min(available, rng.randint(3, 9))

    viewed = int(active_ukp * (0.45 + rng.random() * 0.35))
    accepted = int(viewed * (0.2 + rng.random() * 0.35))
    expired = rng.randint(0, 8) if archetype == 4 else rng.randint(0, 3)
    chat = int(potential * (0.25 + rng.random() * 0.3))

    apps_p1 = max(0, accepted - rng.randint(0, 2) + rng.randint(0, 2))
    apps_p2 = rng.randint(1, 6)
    apps_p3 = rng.randint(0, 5)
    apps = apps_p1 + apps_p2 + apps_p3
    deals = max(0, int(apps * (0.2 + rng.random() * 0.35)))
    delta_deals = rng.randint(0, min(3, deals))
    delta_apps = rng.randint(0, min(6, apps))

    capacity_used = round(delta_ukp / available, 2) if available > 0 else None

    if available <= 5 and delta_ukp <= 3:
        status = "locked"
    elif available >= 20 and delta_ukp <= 2:
        status = "lag"
    elif delta_ukp >= 8 or (capacity_used and capacity_used >= 0.5):
        status = "lead"
    else:
        status = "norm"

    # per-product light stats
    products = {}
    for code, _ in PRODUCTS:
        pr = RNG(seed_int(km_id + code))
        pot = pr.randint(3, max(4, potential // 4))
        act = pr.randint(0, pot)
        avail = max(0, pot - act)
        dlt = pr.randint(0, min(avail, 4))
        products[code] = {
            "potential": pot,
            "active": act,
            "available": avail,
            "deltaUkp": dlt,
            "apps": pr.randint(0, 4),
            "deals": pr.randint(0, 2),
        }

    return {
        "potential": potential,
        "clients": clients,
        "prospects": prospects,
        "withAb": with_ab,
        "activeUkp": active_ukp,
        "available": available,
        "chat": chat,
        "viewed": viewed,
        "accepted": accepted,
        "expiredWeek": expired,
        "deltaUkp": delta_ukp,
        "deltaApps": delta_apps,
        "deltaDeals": delta_deals,
        "apps": apps,
        "appsP1": apps_p1,
        "appsP2": apps_p2,
        "appsP3": apps_p3,
        "deals": deals,
        "capacityUsed": capacity_used,
        "status": status,
        "archetype": archetype,
        "products": products,
    }


def gen_ukps_for_km(km, n=12):
    rng = RNG(seed_int(km["id"] + ":ukp"))
    statuses = [
        ("sent", 0.22),
        ("viewed", 0.28),
        ("discuss", 0.12),
        ("accepted", 0.14),
        ("rejected", 0.08),
        ("expired", 0.12),
        ("done", 0.04),
    ]
    ukps = []
    for i in range(n):
        r = rng.random()
        acc = 0
        st = "sent"
        for name, p in statuses:
            acc += p
            if r <= acc:
                st = name
                break
        nprod = 1 if rng.random() < 0.7 else 2
        prods = []
        for _ in range(nprod):
            prods.append(rng.choice(PRODUCTS)[0])
        prods = list(dict.fromkeys(prods))
        day = rng.randint(15, 28)
        hour = rng.randint(9, 18)
        minute = rng.randint(0, 59)
        sent = f"2025-09-{day:02d}T{hour:02d}:{minute:02d}:00"
        ttl_left = rng.randint(0, 14) if st in ("sent", "viewed", "discuss") else 0
        viewed_at = None
        if st not in ("sent", "expired"):
            viewed_at = f"2025-09-{min(28, day + rng.randint(0, 3)):02d}T{rng.randint(10, 19):02d}:{rng.randint(0, 59):02d}:00"
        ukps.append({
            "id": f"UKP-{km['id'][-4:]}-{i+1:03d}",
            "sentAt": sent,
            "kmId": km["id"],
            "kmName": km["name"],
            "client": company_name(rng, i),
            "clientType": "client" if rng.random() < 0.7 else "prospect",
            "lpr": f"{rng.choice(['ФД', 'ГД', 'Казначей', 'Собственник'])}",
            "products": prods,
            "status": st,
            "viewedAt": viewed_at,
            "ttlLeft": ttl_left,
            "hasApp": st in ("accepted", "done") and rng.random() < 0.7,
            "hasDeal": st == "done" or (st == "accepted" and rng.random() < 0.25),
        })
    return ukps


def main():
    teams = []
    with open(ROOT / "org.csv", encoding="utf-8") as f:
        reader = csv.DictReader(f, delimiter=";")
        for row in reader:
            teams.append({
                "division": row["Дивизион"].strip(),
                "region": row["Регион"].strip(),
                "team": row["Команда"].strip(),
                "kmCount": int(row["Кол-во КМ"]),
            })

    kms = []
    km_idx = 0
    for ti, t in enumerate(teams):
        for j in range(t["kmCount"]):
            km_idx += 1
            kid = f"KM{km_idx:04d}"
            rng = RNG(seed_int(kid + t["team"]))
            name = make_name(rng, km_idx)
            metrics = gen_km_metrics(kid)
            kms.append({
                "id": kid,
                "name": name,
                "division": t["division"],
                "region": t["region"],
                "team": t["team"],
                **{k: v for k, v in metrics.items() if k != "products"},
                "products": metrics["products"],
            })

    # UKPs only for default scope (Moscow Upr 1 Otd 1) to keep file smaller — rest generated in browser if needed
    default_kms = [k for k in kms if k["division"] == "МОСКОВСКИЙ" and k["region"] == "Москва Упр 1" and "Отд 1" in k["team"]]
    ukps = []
    for k in default_kms:
        ukps.extend(gen_ukps_for_km(k, 10))

    # Also generate UKPs for all KMs in a compact way when filtered — store generator seed only
    # For prototype: generate UKPs on the fly in JS from km list for filtered set

    out = {
        "meta": {
            "weekLabel": "22–28 сен 2025",
            "prevWeekLabel": "15–21 сен 2025",
            "ttlDays": 14,
            "defaultDivision": "МОСКОВСКИЙ",
            "defaultRegion": "Москва Упр 1",
            "defaultTeamContains": "Отд 1",
            "totalTeams": len(teams),
            "totalKms": len(kms),
        },
        "products": [{"code": c, "name": n} for c, n in PRODUCTS],
        "teams": teams,
        "kms": kms,
        "ukpsSample": ukps,
    }

    js_path = ROOT / "data.js"
    with open(js_path, "w", encoding="utf-8") as f:
        f.write("window.PROTO_DATA = ")
        json.dump(out, f, ensure_ascii=False, separators=(",", ":"))
        f.write(";\n")

    print(f"teams={len(teams)} kms={len(kms)} ukps_sample={len(ukps)} -> {js_path}")


if __name__ == "__main__":
    main()
