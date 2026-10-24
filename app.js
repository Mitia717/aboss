/* Alfa-boss Sales Intelligence — prototype v2 */
(function () {
  "use strict";

  const META = window.PROTO_META;
  const PRODUCTS = window.PRODUCTS;
  const WEEK_LABS = ["−5 нед.", "−4 нед.", "−3 нед.", "−2 нед.", "−1 нед.", "тек."];

  const TIPS = {
    potential: "Уровень 1 воронки. Все клиенты и проспекты на закреплении КМ. Источник: витрина закрепления.",
    allClients: "Уровень 2 воронки. Все клиенты банка на закреплении (без проспектов).",
    withComm: "Уровень 3 воронки. Клиенты с коммуникациями: чаты, УКП, почта (tbd), звонки (tbd).",
    consents: "Уровень 4 воронки. Согласия клиентов: акцепты УКП, хештеги Альфа Босс.",
    appsComposite: "Уровень 5 воронки. Состав заявок: мастер-система после согласия, лендинги, лиды ТМ, заявки ДБО.",
    dealsComposite: "Уровень 6 воронки. Состав сделок: цифровые и офлайн.",
    withAb: "ЮЛ, у которых есть ЛПР с меткой Alfa-boss (БОСС) — доступ в режим. Без метки нельзя отправить УКП.",
    activatedAb: "Активированные ЛПР — из имеющих метку хотя бы раз входили в режим Alfa-boss. Справа — прирост WoW %.",
    penetration: "Проникновение Alfa-boss = ЮЛ с меткой / клиентская база. Чем выше, тем полезнее инструмент.",
    ukpCoverage: "Покрытие УКП = активные УКП / клиентская база. Доля базы КМ, которая сейчас под действующим предложением.",
    abPenWeek: "Проникновение Alfa-boss за неделю = клиенты с активными ЛПР в режиме Alfa-boss за неделю / клиентская база.",
    productsPerClient: "Продуктовое проникновение на клиента в коммуникациях = среднее число продуктов в коммуникациях на одного клиента с коммуникацией.",
    commCoverage: "Охват коммуникациями = клиенты с коммуникацией / все клиенты банка.",
    convCommDigital: "Конверсия коммуникаций в сделки в цифре = цифровые сделки / клиенты с коммуникацией.",
    convAppsDeals: "Конверсия заявок в сделки = сделки / заявки.",
    prodPerActivity: "Количество продуктов на клиента в активностях = среднее число продуктов в активностях на клиента с коммуникацией.",
    activeUkp: "Под активным УКП — ЮЛ с незавершённым УКП. Справа — WoW %.",
    available: "Доступно к УКП — ёмкость базы среди ЮЛ с меткой БОСС без активного УКП. Справа — WoW %.",
    deltaUkp: "УКП направлено — недельный flow отправок. Справа — WoW % к прошлой неделе.",
    expired: "Истекло без просмотра — УКП, деактивированные по TTL (14 дн.) без просмотра ЛПР за неделю. Сигнал качества оффера / ЛПР / уведомлений.",
    apps: "Заявки — уникальные ЮЛ с заявкой на продукт. P1 = после УКП; P2 = КМ без УКП; P3 = самообслуживание Alfa-boss. Число заявок может быть > акцептов УКП.",
    deals: "Сделки за период. Рядом с цифрой — абсолютный прирост за неделю; справа — WoW %.",
    normTempo: "Заменено на «Прогноз vs Факт».",
    convAcc: "Конверсия в акцепт = акцепты / отправленные УКП. Справа — изменение за неделю в процентных пунктах (п.п.).",
    convApp: "Конверсия в заявку = заявки P1 / отправленные. Подпись N/M. Справа — изменение в п.п.",
    convDeal: "Конверсия в сделку = сделки из УКП / отправленные. Подпись N/M. Справа — изменение в п.п.",
    capacity: "Ёмкость использована = Δ УКП / доступно к отправке. При доступно≈0 низкий Δ не штраф.",
    forecast: "Прогноз сделок по клиентам с коммуникацией (пайплайн × конверсии). Справа — WoW %.",
    forecastVsFact: "Прогноз vs факт за отчётную неделю. Значение: факт / прогноз (сделки недели vs УКП×конв. в сделку). Справа — исполнение факт/прогноз в % (≥100% зелёным).",
    sentTotal: "Отправлено УКП (учёт) — знаменатель конверсий: ЮЛ с фактом отправки УКП в аналитическом окне (активные + завершённые/истёкшие цепочки).",
    chat: "Цифровой контакт — ЮЛ, у которых в периоде был чат КМ↔ЛПР и/или действующее предложение УКП. Достаточно одного из двух.",
    kmInChat: "Активные КМ в чатах — число клиентских менеджеров, у которых за неделю был чат с ЛПР. В подписи — доля от всех КМ в срезе. Справа — WoW %.",
    clientsInChat: "Активные клиенты в чатах — ЮЛ с активными ЛПР в чатах за неделю. В подписи — число ЛПР в этих чатах. Справа — WoW %.",
    clients: "Клиенты банка в потенциале (уже на обслуживании).",
    prospects: "Проспекты — закреплены за КМ, ещё не клиенты банка.",
    vsDelta: "Отклонение недельного Δ УКП менеджера от медианы КМ в текущем срезе.",
    vsConv: "Отклонение конверсии в акцепт от медианы среза, в процентных пунктах. Отрицательное при слабом качестве УКП.",
    divCov: "Две доли охвата: от всех клиентов банка и от активированных клиентов (вход в Alfa-boss). Числитель — клиенты с чатом или действующим УКП. Справа — прирост в п.п. и место в рейтинге.",
    divProdPerClient: "Среднее число продуктов, обсуждённых в коммуникациях, на одного клиента с коммуникацией (чат или УКП). Абсолютный прирост за неделю и место среди дивизионов.",
    divCovRank: "Доля охвата клиентов коммуникациями в регионе/управлении.",
    divPerKm: "Клиенты с коммуникацией (чат или УКП) на одного КМ в регионе/управлении."
  };

  const SURNAMES_M = ["Иванов","Петров","Сидоров","Смирнов","Кузнецов","Попов","Васильев","Соколов","Михайлов","Новиков","Фёдоров","Морозов","Волков","Алексеев","Лебедев","Семёнов","Егоров","Павлов","Козлов","Степанов","Николаев","Орлов","Андреев","Макаров","Никитин","Захаров","Зайцев","Соловьёв","Борисов","Яковлев","Григорьев","Романов","Воробьёв","Сергеев","Фролов","Дмитриев","Королёв","Гусев","Киселёв","Ильин","Максимов","Поляков","Сорокин","Белов","Медведев","Антонов","Тарасов","Жуков","Баранов","Комаров"];
  const SURNAMES_F = ["Иванова","Петрова","Сидорова","Смирнова","Кузнецова","Попова","Васильева","Соколова","Новикова","Морозова","Волкова","Лебедева","Козлова","Орлова","Никитина","Зайцева","Романова","Сергеева","Фролова","Максимова","Белова","Антонова","Жукова","Комарова","Давыдова","Осипова","Андреева","Павлова","Егорова","Алексеева"];
  const NAMES_M = ["Александр","Дмитрий","Максим","Сергей","Андрей","Алексей","Артём","Илья","Кирилл","Михаил","Никита","Иван","Егор","Роман","Владимир","Павел","Денис","Олег","Юрий","Тимур"];
  const NAMES_F = ["Анна","Мария","Елена","Ольга","Наталья","Екатерина","Ирина","Татьяна","Светлана","Юлия","Анастасия","Дарья","Виктория","Полина","Алина"];
  const PATR = ["А.","Д.","С.","Н.","В.","И.","М.","П.","Ю.","Р."];
  const CO_PREF = ["ООО","АО","ПАО"];
  const CO_CORE = ["СеверТорг","ВостокСнаб","ТехноПром","АльфаСтрой","МегаЛогистик","РусАгро","СибМеталл","УралХим","ЮгТранс","БалтФлот","НеваСофт","МосСервис","ПрофиТрейд","ГлобалФуд","СтройМастер","ЭкоЛайт","КапиталПлюс","ЦентрПак","РитейлХаб","Горизонт","Импульс","Вектор","Партнёр","Орион","Атлант","Феникс","Стандарт","Драйв","Лидер","Контур"];

  // Pipeline weights → probability to reach deal relative to baseline convDeal
  const PIPE_WEIGHT = { sent: 0.35, viewed: 0.55, discuss: 0.7, accepted: 0.85 };

  function hash(s) {
    let h = 2166136261;
    for (let i = 0; i < s.length; i++) { h ^= s.charCodeAt(i); h = Math.imul(h, 16777619); }
    return h >>> 0;
  }
  function RNG(seed) {
    let s = seed >>> 0;
    return {
      next() { s = (Math.imul(1664525, s) + 1013904223) >>> 0; return s; },
      int(a, b) { return a + (this.next() % (b - a + 1)); },
      pick(a) { return a[this.next() % a.length]; },
      f() { return (this.next() % 10000) / 10000; }
    };
  }
  function parseOrg(csv) {
    return csv.trim().split(/\r?\n/).slice(1).map((line) => {
      const p = line.split(";");
      return { division: p[0], region: p[1], team: p[2], kmCount: parseInt(p[4], 10) };
    });
  }
  function makeName(rng) {
    if (rng.f() < 0.42) return `${rng.pick(SURNAMES_F)} ${rng.pick(NAMES_F)[0]}.${rng.pick(PATR)}`;
    return `${rng.pick(SURNAMES_M)} ${rng.pick(NAMES_M)[0]}.${rng.pick(PATR)}`;
  }

  function enrichConversions(m) {
    const sent = Math.max(1, m.sentTotal || 1);
    const dealsU = m.dealsFromUkp != null ? m.dealsFromUkp : m.deals;
    m.convAccept = +(m.accepted / sent).toFixed(3);
    m.convApp = +(m.appsP1 / sent).toFixed(3);
    m.convDeal = +(dealsU / sent).toFixed(3);
    m.qualityScore = m.sentTotal >= 8 ? m.convAccept : null;
    m.spamFlag = m.sentTotal >= 10 && m.convAccept < 0.12 && (m.deltaUkp || 0) >= 3;
    return m;
  }

  function genKm(id, team) {
    const rng = RNG(hash(id + "|" + team.team));
    const potential = rng.int(48, 118);
    const clients = Math.round(potential * (0.55 + rng.f() * 0.25));
    const prospects = potential - clients;
    const withAb = Math.round(potential * (0.48 + rng.f() * 0.35));
    const activatedAb = Math.round(withAb * (0.45 + rng.f() * 0.4));
    const arch = rng.next() % 5;

    // Реалистичные объёмы: КМ за неделю не закрывает половину базы.
    // Stock УКП (TTL 14д) ≈ 8–28% базы с меткой; недельный flow ≈ 1–7 отправок.
    let activeUkp, available, deltaUkp, expiredWeek;
    if (arch === 3) {
      // locked: высокий stock, слабый flow
      activeUkp = Math.round(withAb * (0.2 + rng.f() * 0.1));
      available = Math.max(0, Math.min(withAb - activeUkp, rng.int(0, 5)));
      deltaUkp = rng.int(0, 2);
      expiredWeek = rng.int(0, 2);
    } else if (arch === 2) {
      // lag: мало отработок
      activeUkp = Math.round(withAb * (0.05 + rng.f() * 0.07));
      available = Math.max(8, withAb - activeUkp - rng.int(0, 6));
      available = Math.min(available, withAb - activeUkp);
      deltaUkp = rng.int(0, 2);
      expiredWeek = rng.int(1, 3);
    } else if (arch === 0) {
      // lead: активный, но не «полбазы»
      activeUkp = Math.round(withAb * (0.12 + rng.f() * 0.1));
      available = Math.max(6, withAb - activeUkp - rng.int(0, 5));
      available = Math.min(available, Math.max(0, withAb - activeUkp));
      deltaUkp = Math.min(available, rng.int(4, 7));
      expiredWeek = rng.int(0, 2);
    } else if (arch === 4) {
      // high volume low quality
      activeUkp = Math.round(withAb * (0.1 + rng.f() * 0.1));
      available = Math.max(5, withAb - activeUkp - rng.int(0, 6));
      available = Math.min(available, Math.max(0, withAb - activeUkp));
      deltaUkp = Math.min(available, rng.int(5, 8));
      expiredWeek = rng.int(2, 5);
    } else {
      activeUkp = Math.round(withAb * (0.09 + rng.f() * 0.1));
      available = Math.max(0, withAb - activeUkp - rng.int(0, 6));
      deltaUkp = Math.min(available, rng.int(2, 5));
      expiredWeek = rng.int(0, 2);
    }
    activeUkp = Math.min(activeUkp, withAb);
    available = Math.min(available, Math.max(0, withAb - activeUkp));
    const noAbGap = potential - withAb; // blind zone without Alfa-boss label
    const penetration = potential ? +(withAb / potential).toFixed(3) : 0;

    // Недельный чат: обычно 4–12% клиентов банка (не 40%+)
    const chatOnly = Math.min(clients, Math.max(1, Math.round(clients * (0.04 + rng.f() * 0.08) + (arch === 0 ? rng.int(0, 2) : 0))));
    const ukpOnClients = Math.min(clients, Math.round(activeUkp * (clients / Math.max(potential, 1))));
    const chatUkpOverlap = Math.min(chatOnly, ukpOnClients, Math.round(Math.min(chatOnly, ukpOnClients) * (0.25 + rng.f() * 0.35)));
    // Цифровой контакт среди клиентов = чат ∪ УКП за неделю/TTL
    const weekCoveredClients = Math.min(clients, chatOnly + ukpOnClients - chatUkpOverlap);
    const chat = weekCoveredClients; // для воронки: контакт по клиентам банка
    const clientsInChat = chatOnly;
    const lprInChat = Math.max(clientsInChat, Math.round(clientsInChat * (1.05 + rng.f() * 0.25)));
    const kmInChat = clientsInChat >= 2 || (clientsInChat > 0 && rng.f() > 0.3) ? 1 : 0;
    // quality varies by archetype
    let viewRate = 0.5 + rng.f() * 0.3;
    let acceptRate = 0.2 + rng.f() * 0.3;
    if (arch === 4) { viewRate = 0.25 + rng.f() * 0.2; acceptRate = 0.05 + rng.f() * 0.1; }
    if (arch === 0) { viewRate = 0.55 + rng.f() * 0.25; acceptRate = 0.28 + rng.f() * 0.25; }

    const viewed = Math.round(activeUkp * viewRate);
    const accepted = Math.round(viewed * acceptRate);
    const rejected = Math.round(activeUkp * (0.05 + rng.f() * 0.1));
    const closedDone = rng.int(0, 4);
    const sentTotal = Math.max(activeUkp + expiredWeek + rejected + closedDone, deltaUkp + activeUkp);

    const pipeSent = Math.round(activeUkp * 0.35);
    const pipeViewed = Math.round(activeUkp * 0.35);
    const pipeDiscuss = Math.round(activeUkp * 0.2);
    const pipeAccepted = Math.max(0, activeUkp - pipeSent - pipeViewed - pipeDiscuss);

    let appsP1 = Math.max(0, Math.round(accepted * (0.7 + rng.f() * 0.4)));
    if (arch === 4) appsP1 = Math.max(0, Math.round(accepted * 0.5));
    // P3 (органика Alfa-boss) растёт с проникновением: ЛПР сами оформляют продукты
    const appsP3 = Math.max(0, Math.round(potential * (0.015 + penetration * 0.09) * (0.75 + rng.f() * 0.5)));
    // P2 (КМ без УКП) выше при низком проникновении — продажи уходят в телефон/встречу
    const appsP2 = Math.max(0, Math.round((2 + rng.int(0, 5)) * (1.35 - penetration) + rng.int(0, 2)));
    const apps = appsP1 + appsP2 + appsP3;
    const deals = Math.max(0, Math.round(apps * (0.18 + rng.f() * 0.32)));
    const dealsFromUkp = Math.min(deals, Math.max(0, Math.round(appsP1 * (0.25 + rng.f() * 0.4))));
    const deltaApps = rng.int(0, Math.min(6, apps));
    const deltaDeals = rng.int(0, Math.min(3, deals));
    const capacityUsed = available > 0 ? +(deltaUkp / available).toFixed(2) : null;
    const ukpCoverage = potential ? +(activeUkp / potential).toFixed(3) : 0;
    const abActiveWeek = Math.min(withAb, Math.round(activatedAb * (0.7 + rng.f() * 0.3)));
    const abPenWeek = potential ? +(abActiveWeek / potential).toFixed(3) : 0;
    // Согласия ⊆ клиенты с коммуникациями: акцепты УКП + хештеги Alfa Boss (с пересечением)
    const acceptAmongComm = Math.min(weekCoveredClients, accepted);
    const consentHash = Math.min(weekCoveredClients, Math.round(abActiveWeek * (0.25 + rng.f() * 0.35)));
    const consentOverlap = Math.min(acceptAmongComm, consentHash, Math.round(Math.min(acceptAmongComm, consentHash) * (0.35 + rng.f() * 0.3)));
    const consents = Math.min(weekCoveredClients, acceptAmongComm + consentHash - consentOverlap);
    // Состав заявок
    let appsMaster = Math.round(apps * (0.32 + rng.f() * 0.14));
    let appsLanding = Math.round(apps * (0.18 + rng.f() * 0.1));
    let appsTm = Math.round(apps * (0.14 + rng.f() * 0.1));
    let appsDbo = Math.max(0, apps - appsMaster - appsLanding - appsTm);
    if (appsDbo < 0) { appsMaster = Math.max(0, appsMaster + appsDbo); appsDbo = 0; }
    const dealsDigital = Math.min(deals, Math.max(0, Math.round(deals * (0.5 + rng.f() * 0.3))));
    const dealsOffline = Math.max(0, deals - dealsDigital);
    const commCoverage = clients ? +(weekCoveredClients / clients).toFixed(3) : 0;
    const convCommDigital = weekCoveredClients ? +(dealsDigital / weekCoveredClients).toFixed(3) : 0;
    const convAppsDeals = apps ? +(deals / apps).toFixed(3) : 0;

    let status = "norm";
    if (available <= 5 && deltaUkp <= 3) status = "locked";
    else if (available >= 20 && deltaUkp <= 2) status = "lag";
    else if (deltaUkp >= 8 || (capacityUsed != null && capacityUsed >= 0.55)) status = "lead";

    // В среднем 1.1–2.0 продукта на клиента с коммуникацией (не 6)
    const productsPerClient = activeUkp > 0
      ? +(1.1 + rng.f() * 0.75 + (arch === 0 ? 0.15 : 0) - (arch === 4 ? 0.15 : 0)).toFixed(2)
      : 0;
    const targetSlots = Math.max(0, Math.round(Math.max(activeUkp, 1) * productsPerClient));
    const products = {};
    let productSlotsActive = 0;
    // Фокус: 3–5 продуктов из 19; остальные почти без отработок
    const focusIdx = new Set();
    const focusN = 3 + (rng.next() % 3);
    while (focusIdx.size < focusN) focusIdx.add(rng.next() % PRODUCTS.length);
    PRODUCTS.forEach((p, idx) => {
      const pr = RNG(hash(id + p.code));
      // Склонность по рыночной доле продукта ± разброс по портфелю КМ
      const baseRate = p.inclRate != null ? p.inclRate : 0.12;
      const jitter = 0.72 + pr.f() * 0.56; // ~±28% вокруг рыночной доли
      let pot = Math.round(potential * baseRate * jitter);
      if (baseRate >= 0.8) pot = Math.max(pot, Math.round(potential * 0.82)); // РКО почти всем
      else if (baseRate < 0.03) pot = pr.f() < 0.55 ? 0 : Math.max(0, pot);
      else if (baseRate < 0.06) pot = pr.f() < 0.18 ? 0 : Math.max(1, pot);
      pot = Math.min(potential, Math.max(0, pot));
      const focus = focusIdx.has(idx) && pot > 0;
      let act = 0;
      if (focus && targetSlots > 0) {
        act = Math.min(pot, Math.max(0, Math.round(targetSlots / focusN) + pr.int(-1, 1)));
      } else if (pot > 0 && pr.f() < 0.08) {
        act = 1;
      }
      act = Math.min(pot, Math.max(0, act));
      const avail = Math.max(0, pot - act);
      const dlt = focus ? pr.int(0, Math.min(2, avail)) : (pr.f() < 0.1 && avail > 0 ? 1 : 0);
      const st = Math.max(act + pr.int(0, 3), dlt);
      const acc = Math.round(st * (0.08 + pr.f() * 0.28));
      const ap1 = Math.round(acc * (0.5 + pr.f() * 0.45));
      const dl = pr.int(0, Math.min(1, ap1));
      productSlotsActive += act;
      // доля склонности, с кем продукт обсуждался в комм. (реалистично 5–20%)
      const discussedShare = !pot ? 0
        : focus ? (0.06 + pr.f() * 0.12)
        : (pr.f() < 0.2 ? 0.02 + pr.f() * 0.04 : 0);
      products[p.code] = enrichConversions({
        potential: pot, active: act, available: avail, deltaUkp: dlt,
        sentTotal: st, accepted: acc, appsP1: ap1, apps: ap1 + pr.int(0, 1),
        deals: dl, dealsFromUkp: dl, expired: pr.int(0, 1),
        viewed: Math.round(act * 0.55),
        discussedShare,
        pipe: {
          sent: Math.round(act * 0.35),
          viewed: Math.round(act * 0.35),
          discuss: Math.round(act * 0.15),
          accepted: Math.round(act * 0.15)
        }
      });
    });

    return enrichConversions({
      id, name: makeName(rng),
      division: team.division, region: team.region, team: team.team,
      potential, clients, prospects, withAb, activatedAb, penetration, noAbGap,
      potentialWowPct: +((rng.f() * 4.5 - 1.2).toFixed(1)),
      withAbWowPct: +((rng.f() * 5.5 - 1.0).toFixed(1)),
      activatedAbWowPct: +((rng.f() * 6 - 1.5).toFixed(1)),
      activeUkpWowPct: +((rng.f() * 8 - 3).toFixed(1)),
      availableWowPct: +((rng.f() * 10 - 4).toFixed(1)),
      deltaUkpWowPct: +((rng.f() * 25 - 8).toFixed(1)),
      convAcceptWowPct: +((rng.f() * 12 - 4).toFixed(1)),
      convAppWowPct: +((rng.f() * 12 - 4).toFixed(1)),
      convDealWowPct: +((rng.f() * 14 - 5).toFixed(1)),
      dealsWowPct: +((rng.f() * 20 - 6).toFixed(1)),
      forecastWowPct: +((rng.f() * 15 - 5).toFixed(1)),
      activeUkp, available, chat, weekCoveredClients,
      clientsInChat, lprInChat, kmInChat,
      clientsInChatWowPct: +((rng.f() * 18 - 6).toFixed(1)),
      kmInChatWowPct: +((rng.f() * 20 - 7).toFixed(1)),
      ukpCoverage, abActiveWeek, abPenWeek, productsPerClient,
      viewed, accepted, rejected, expiredWeek, deltaUkp, deltaApps, deltaDeals,
      apps, appsP1, appsP2, appsP3, deals, dealsFromUkp, sentTotal, capacityUsed, status, arch,
      consents, appsMaster, appsLanding, appsTm, appsDbo,
      dealsDigital, dealsOffline, commCoverage, convCommDigital, convAppsDeals,
      pipe: { sent: pipeSent, viewed: pipeViewed, discuss: pipeDiscuss, accepted: pipeAccepted },
      products
    });
  }

  function buildKms(teams) {
    const kms = [];
    let n = 0;
    teams.forEach((t) => {
      for (let i = 0; i < t.kmCount; i++) {
        n += 1;
        kms.push(genKm("KM" + String(n).padStart(4, "0"), t));
      }
    });
    return kms;
  }

  function genUkps(kms, limitPerKm) {
    const statuses = [
      ["sent", 0.22], ["viewed", 0.28], ["discuss", 0.12],
      ["accepted", 0.14], ["rejected", 0.08], ["expired", 0.12], ["done", 0.04]
    ];
    const list = [];
    kms.forEach((km) => {
      const rng = RNG(hash(km.id + ":ukp"));
      const n = limitPerKm || 6;
      for (let i = 0; i < n; i++) {
        let r = rng.f(), acc = 0, st = "sent";
        for (const [name, p] of statuses) { acc += p; if (r <= acc) { st = name; break; } }
        const nprod = rng.f() < 0.72 ? 1 : 2;
        const prods = [];
        for (let k = 0; k < nprod; k++) prods.push(rng.pick(PRODUCTS).code);
        const uniq = [...new Set(prods)];
        const day = rng.int(15, 28);
        const hour = rng.int(9, 18);
        const minute = rng.int(0, 59);
        const sentAt = `2025-09-${String(day).padStart(2, "0")} ${String(hour).padStart(2, "0")}:${String(minute).padStart(2, "0")}`;
        const ttlLeft = ["sent", "viewed", "discuss"].includes(st) ? rng.int(0, 14) : 0;
        let viewedAt = null;
        if (!["sent", "expired"].includes(st)) {
          const vd = Math.min(28, day + rng.int(0, 3));
          viewedAt = `2025-09-${String(vd).padStart(2, "0")} ${String(rng.int(10, 19)).padStart(2, "0")}:${String(rng.int(0, 59)).padStart(2, "0")}`;
        }
        list.push({
          id: `UKP-${km.id.slice(-4)}-${String(i + 1).padStart(3, "0")}`,
          sentAt, kmId: km.id, kmName: km.name,
          client: `${rng.pick(CO_PREF)} «${rng.pick(CO_CORE)}-${rng.int(10, 99)}»`,
          clientType: rng.f() < 0.7 ? "client" : "prospect",
          lpr: rng.pick(["ФД", "ГД", "Казначей", "Собственник"]),
          products: uniq, status: st, viewedAt, ttlLeft,
          hasApp: (st === "accepted" || st === "done") && rng.f() < 0.7,
          hasDeal: st === "done" || (st === "accepted" && rng.f() < 0.25)
        });
      }
    });
    return list.sort((a, b) => b.sentAt.localeCompare(a.sentAt));
  }

  const teams = parseOrg(window.PROTO_ORG_CSV);
  const allKms = buildKms(teams);

  const state = {
    mode: "network", // network | product | division | region
    tab: "overview",
    divisions: [META.defaultDivision],
    regions: [META.defaultRegion],
    teams: [META.defaultTeamPrefix],
    products: [], // empty = all
    statusFilter: "ALL",
    ukpSearch: "",
    sortKm: "deltaUkp",
    appsPathFilter: "all", // all | act | noact
    divRankMetric: "coverage", // coverage | perKm
    divProduct: "", // "" = all products; filters whole divisional overview
    divPeriodFrom: 0, // 0 = current week; 1..5 = cumulative from −N week
    divProdShowAll: false,
    divProdView: "comm", // comm | apps
    mgrSort: "score",
    mgrSortDir: "desc"
  };

  /** Cached rankings for popup: { title, currentKey, rows:[{key,label,pos,value}] } */
  const divRankCache = {};
  /** All products by region for «…» popup: { title, highlightCode, rows } */
  const regionProdCache = {};

  function unique(arr) { return [...new Set(arr)]; }
  function $(s) { return document.querySelector(s); }
  function $all(s) { return [...document.querySelectorAll(s)]; }
  function fmt(n) { return n == null || Number.isNaN(n) ? "—" : Number(n).toLocaleString("ru-RU"); }
  function pct(x) { return x == null || Number.isNaN(x) ? "—" : Math.round(x * 1000) / 10 + "%"; }
  function deltaHtml(n, suffix) {
    if (n == null) return "";
    const sign = n > 0 ? "+" : "";
    return `<span class="delta ${n > 0 ? "up" : n < 0 ? "down" : ""}">${sign}${n}${suffix || ""}</span>`;
  }
  function tipAttr(key) {
    const t = TIPS[key] || key;
    return `class="tip" data-tip="${t.replace(/"/g, "&quot;")}"`;
  }
  function tipLabel(text, key) {
    return `<span class="tip" data-tip="${(TIPS[key] || text).replace(/"/g, "&quot;")}">${text}</span>`;
  }

  function productName(code) {
    const p = PRODUCTS.find((x) => x.code === code);
    return p ? p.name : code;
  }
  function statusLabel(s) {
    return ({ lead: "Опережает", norm: "В норме", lag: "Отстаёт", locked: "База под УКП", spam: "Слабое качество УКП" })[s] || s;
  }
  function ukpStatusLabel(s) {
    return ({ sent: "Отправлено", viewed: "Просмотрено", discuss: "В обсуждении", accepted: "Акцептовано", rejected: "Отклонено", expired: "Деактивировано", done: "Завершено" })[s] || s;
  }
  function median(arr) {
    if (!arr.length) return 0;
    const a = [...arr].sort((x, y) => x - y);
    const m = Math.floor(a.length / 2);
    return a.length % 2 ? a[m] : +((a[m - 1] + a[m]) / 2).toFixed(3);
  }
  function sum(kms, key) { return kms.reduce((s, k) => s + (k[key] || 0), 0); }

  function teamPrefixesFor(teamRows) {
    const prefixes = new Set();
    teamRows.forEach((t) => {
      prefixes.add(t.team);
      const m = t.team.match(/^(Москва\. Упр \d+ Отд \d+)/);
      if (m) prefixes.add(m[1]);
      const m3 = t.team.match(/^(Санкт-Петербург\. Упр \d+ Отд \d+)/);
      if (m3) prefixes.add(m3[1]);
      const m4 = t.team.match(/^(Упр МО\. Отдел \d+)/);
      if (m4) prefixes.add(m4[1]);
    });
    return [...prefixes].sort();
  }

  function isLeadMode() {
    return state.mode === "division" || state.mode === "region";
  }

  /** Отдел/команда для рейтинга: предпочитаем уровень «Отд N», иначе полное имя команды */
  function deptKeyOf(teamName) {
    const m = String(teamName || "").match(
      /^(Москва\. Упр \d+ Отд \d+|Санкт-Петербург\. Упр \d+ Отд \d+|Упр МО\. Отдел \d+)/
    );
    return m ? m[1] : teamName;
  }

  function kmsMatchingDept(kms, deptKey) {
    return kms.filter((k) => k.team === deptKey || k.team.startsWith(deptKey));
  }

  function networkRegionUnits() {
    const out = [];
    unique(allKms.map((k) => k.division)).sort().forEach((d) => {
      const dKms = allKms.filter((k) => k.division === d);
      unique(dKms.map((k) => k.region)).sort().forEach((region) => {
        out.push({
          key: d + "|" + region,
          label: region,
          division: d,
          region,
          list: dKms.filter((k) => k.region === region)
        });
      });
    });
    return out;
  }

  function deptUnitsFrom(kms) {
    const keys = unique(kms.map((k) => deptKeyOf(k.team))).sort();
    return keys.map((key) => ({
      key,
      label: key,
      list: kmsMatchingDept(kms, key)
    }));
  }

  function filteredKms() {
    return allKms.filter((k) => {
      if (state.divisions.length && !state.divisions.includes(k.division)) return false;
      if (state.regions.length && !state.regions.includes(k.region)) return false;
      if (state.teams.length) {
        const ok = state.teams.some((pref) => k.team === pref || k.team.startsWith(pref));
        if (!ok) return false;
      }
      return true;
    }).map((k) => projectProducts(k));
  }

  function projectProducts(k) {
    if (!state.products.length) return Object.assign({}, k, {
      displayStatus: k.spamFlag ? "spam" : k.status,
      penetration: k.potential ? +(k.withAb / k.potential).toFixed(3) : 0
    });
    // aggregate selected products
    let potential = 0, activeUkp = 0, available = 0, deltaUkp = 0, expiredWeek = 0;
    let sentTotal = 0, accepted = 0, appsP1 = 0, apps = 0, deals = 0, dealsFromUkp = 0, viewed = 0;
    const pipe = { sent: 0, viewed: 0, discuss: 0, accepted: 0 };
    state.products.forEach((code) => {
      const p = k.products[code];
      if (!p) return;
      potential += p.potential; activeUkp += p.active; available += p.available;
      deltaUkp += p.deltaUkp; expiredWeek += p.expired;
      sentTotal += p.sentTotal; accepted += p.accepted; appsP1 += p.appsP1;
      apps += p.apps; deals += p.deals; dealsFromUkp += p.dealsFromUkp; viewed += p.viewed;
      pipe.sent += p.pipe.sent; pipe.viewed += p.pipe.viewed;
      pipe.discuss += p.pipe.discuss; pipe.accepted += p.pipe.accepted;
    });
    // Alfa-boss coverage scales with base KM penetration
    const pen = k.potential ? k.withAb / k.potential : 0.6;
    const withAb = Math.min(potential, Math.round(potential * pen));
    const activatedAb = Math.min(withAb, Math.round(withAb * (k.withAb ? k.activatedAb / k.withAb : 0.55)));
    activeUkp = Math.min(activeUkp, withAb);
    available = Math.min(available, Math.max(0, withAb - activeUkp));
    const restApps = Math.max(0, apps - appsP1);
    const appsP3 = Math.round(restApps * Math.min(0.85, 0.12 + pen * 0.75));
    const appsP2 = Math.max(0, restApps - appsP3);
    const capacityUsed = available > 0 ? +(deltaUkp / available).toFixed(2) : null;
    let status = "norm";
    if (available <= 5 && deltaUkp <= 3) status = "locked";
    else if (available >= 12 && deltaUkp <= 1) status = "lag";
    else if (deltaUkp >= 5) status = "lead";
    const clientsN = k.clients || Math.round(potential * 0.7);
    const chatOnly = Math.min(clientsN, Math.max(0, Math.round(clientsN * 0.08)));
    const ukpOnClients = Math.min(clientsN, Math.round(activeUkp * (clientsN / Math.max(potential, 1))));
    const chatUkpOverlap = Math.min(chatOnly, ukpOnClients, Math.round(Math.min(chatOnly, ukpOnClients) * 0.4));
    const weekCoveredClients = Math.min(clientsN, chatOnly + ukpOnClients - chatUkpOverlap);
    const chat = weekCoveredClients;
    const clientsInChat = chatOnly;
    const lprInChat = Math.max(clientsInChat, Math.round(clientsInChat * 1.15));
    const kmInChat = clientsInChat >= 2 ? 1 : (k.kmInChat || 0);
    const ukpCoverage = potential ? +(activeUkp / potential).toFixed(3) : 0;
    const abActiveWeek = Math.min(withAb, Math.round(activatedAb * 0.85));
    const abPenWeek = potential ? +(abActiveWeek / potential).toFixed(3) : 0;
    let productSlotsActive = 0;
    state.products.forEach((code) => {
      const p = k.products[code];
      if (p) productSlotsActive += p.active || 0;
    });
    const productsPerClient = activeUkp > 0
      ? +Math.min(2.2, Math.max(1, 1 + productSlotsActive / Math.max(1, activeUkp) * 0.5)).toFixed(2)
      : 0;
    const scale = (k.apps || 1) ? apps / Math.max(1, k.apps || 1) : 1;
    const appsMaster = Math.round((k.appsMaster || Math.round(apps * 0.35)) * scale);
    const appsLanding = Math.round((k.appsLanding || Math.round(apps * 0.22)) * scale);
    const appsTm = Math.round((k.appsTm || Math.round(apps * 0.18)) * scale);
    const appsDbo = Math.max(0, apps - appsMaster - appsLanding - appsTm);
    const dealsDigital = Math.min(deals, Math.round(deals * (k.deals ? (k.dealsDigital || deals * 0.6) / k.deals : 0.6)));
    const dealsOffline = Math.max(0, deals - dealsDigital);
    const consentScale = (k.clients || 1) ? clientsN / Math.max(1, k.clients || 1) : 1;
    const consents = Math.min(weekCoveredClients, Math.round((k.consents != null ? k.consents : accepted) * consentScale));
    const commCoverage = clientsN ? +(weekCoveredClients / clientsN).toFixed(3) : 0;
    const convCommDigital = weekCoveredClients ? +(dealsDigital / weekCoveredClients).toFixed(3) : 0;
    const convAppsDeals = apps ? +(deals / apps).toFixed(3) : 0;
    const m = enrichConversions({
      ...k, potential, withAb, activatedAb, clients: clientsN,
      penetration: potential ? +(withAb / potential).toFixed(3) : 0,
      noAbGap: Math.max(0, potential - withAb),
      activeUkp, available, deltaUkp, expiredWeek,
      sentTotal, accepted, appsP1, apps, appsP2, appsP3, deals, dealsFromUkp, viewed,
      chat, weekCoveredClients, clientsInChat, lprInChat, kmInChat,
      ukpCoverage, abActiveWeek, abPenWeek, productsPerClient,
      consents, appsMaster, appsLanding, appsTm, appsDbo,
      dealsDigital, dealsOffline, commCoverage, convCommDigital, convAppsDeals,
      capacityUsed, status, pipe,
      deltaApps: Math.min(apps, Math.round(apps * 0.4)),
      deltaDeals: Math.min(deals, Math.round(deals * 0.5))
    });
    m.displayStatus = m.spamFlag ? "spam" : m.status;
    return m;
  }

  function funnelFor(kms) {
    const potential = sum(kms, "potential");
    const withAb = sum(kms, "withAb");
    const activatedAb = sum(kms, "activatedAb");
    const sentTotal = sum(kms, "sentTotal");
    const accepted = sum(kms, "accepted");
    const appsP1 = sum(kms, "appsP1");
    const dealsFromUkp = sum(kms, "dealsFromUkp");
    let potentialPrev = 0;
    kms.forEach((k) => {
      const g = (k.potentialWowPct != null ? k.potentialWowPct : 0) / 100;
      potentialPrev += k.potential / (1 + g);
    });
    const potentialWowPct = potentialPrev > 0
      ? +(((potential - potentialPrev) / potentialPrev) * 100).toFixed(1)
      : 0;
    let withAbPrev = 0;
    kms.forEach((k) => {
      const g = (k.withAbWowPct != null ? k.withAbWowPct : 0) / 100;
      withAbPrev += (k.withAb || 0) / (1 + g);
    });
    const withAbWowPct = withAbPrev > 0
      ? +(((withAb - withAbPrev) / withAbPrev) * 100).toFixed(1)
      : 0;
    function wowAgg(currKey, pctKey) {
      let prev = 0;
      let curr = 0;
      kms.forEach((k) => {
        const c = k[currKey] || 0;
        const g = (k[pctKey] != null ? k[pctKey] : 0) / 100;
        curr += c;
        prev += c / (1 + g);
      });
      return prev > 0 ? +(((curr - prev) / prev) * 100).toFixed(1) : 0;
    }
    function wowRateAgg(rateKey, pctKey) {
      // volume-weighted average rate; return change in percentage points (п.п.)
      let wSum = 0, rSum = 0, rPrevSum = 0, wPrev = 0;
      kms.forEach((k) => {
        const w = Math.max(1, k.sentTotal || 1);
        const r = k[rateKey] || 0;
        const g = (k[pctKey] != null ? k[pctKey] : 0) / 100;
        const rPrev = r / (1 + g);
        wSum += w; rSum += r * w;
        wPrev += w; rPrevSum += rPrev * w;
      });
      const curr = wSum ? rSum / wSum : 0;
      const prev = wPrev ? rPrevSum / wPrev : 0;
      return +(((curr - prev) * 100).toFixed(1));
    }
    return {
      potential,
      potentialWowPct,
      withAb,
      withAbWowPct,
      activatedAb,
      activatedAbWowPct: wowAgg("activatedAb", "activatedAbWowPct"),
      activeUkpWowPct: wowAgg("activeUkp", "activeUkpWowPct"),
      availableWowPct: wowAgg("available", "availableWowPct"),
      deltaUkpWowPct: wowAgg("deltaUkp", "deltaUkpWowPct"),
      convAcceptWowPct: wowRateAgg("convAccept", "convAcceptWowPct"),
      convAppWowPct: wowRateAgg("convApp", "convAppWowPct"),
      convDealWowPct: wowRateAgg("convDeal", "convDealWowPct"),
      dealsWowPct: wowAgg("deals", "dealsWowPct"),
      forecastWowPct: wowAgg("deltaUkp", "forecastWowPct"),
      penetrationWowPp: (() => {
        let wSum = 0, pSum = 0, pPrevSum = 0;
        kms.forEach((k) => {
          const pot = k.potential || 0;
          if (!pot) return;
          const pen = k.withAb / pot;
          const g = (k.withAbWowPct != null ? k.withAbWowPct : 0) / 100;
          // approximate prior penetration from withAb shock
          const withPrev = (k.withAb || 0) / (1 + g);
          const potG = (k.potentialWowPct != null ? k.potentialWowPct : 0) / 100;
          const potPrev = pot / (1 + potG);
          const penPrev = potPrev > 0 ? withPrev / potPrev : 0;
          wSum += pot;
          pSum += pen * pot;
          pPrevSum += penPrev * pot;
        });
        const curr = wSum ? pSum / wSum : 0;
        const prev = wSum ? pPrevSum / wSum : 0;
        return +(((curr - prev) * 100).toFixed(1));
      })(),
      noAbGap: Math.max(0, potential - withAb),
      penetration: potential ? withAb / potential : 0,
      activationRate: withAb ? activatedAb / withAb : 0,
      clients: sum(kms, "clients"),
      prospects: sum(kms, "prospects"),
      chat: sum(kms, "chat"),
      kmInChat: sum(kms, "kmInChat"),
      kmInChatShare: kms.length ? sum(kms, "kmInChat") / kms.length : 0,
      kmInChatWowPct: wowAgg("kmInChat", "kmInChatWowPct"),
      clientsInChat: sum(kms, "clientsInChat"),
      lprInChat: sum(kms, "lprInChat"),
      clientsInChatWowPct: wowAgg("clientsInChat", "clientsInChatWowPct"),
      abActiveWeek: sum(kms, "abActiveWeek"),
      ukpSent: sum(kms, "activeUkp"),
      sentTotal,
      deltaUkp: sum(kms, "deltaUkp"),
      available: sum(kms, "available"),
      viewed: sum(kms, "viewed"),
      accepted,
      consents: (() => {
        const chat = sum(kms, "chat");
        return Math.min(chat, sum(kms, "consents"));
      })(),
      apps: sum(kms, "apps"),
      appsP1, appsP2: sum(kms, "appsP2"), appsP3: sum(kms, "appsP3"),
      appsMaster: sum(kms, "appsMaster"),
      appsLanding: sum(kms, "appsLanding"),
      appsTm: sum(kms, "appsTm"),
      appsDbo: sum(kms, "appsDbo"),
      deals: sum(kms, "deals"),
      dealsFromUkp,
      dealsDigital: sum(kms, "dealsDigital"),
      dealsOffline: sum(kms, "dealsOffline"),
      expired: sum(kms, "expiredWeek"),
      deltaApps: sum(kms, "deltaApps"),
      deltaDeals: sum(kms, "deltaDeals"),
      convAccept: sentTotal ? accepted / sentTotal : 0,
      convApp: sentTotal ? appsP1 / sentTotal : 0,
      convDeal: sentTotal ? dealsFromUkp / sentTotal : 0,
      convAppsDeals: (() => {
        const a = sum(kms, "apps");
        return a ? sum(kms, "deals") / a : 0;
      })(),
      convCommDigital: (() => {
        const c = sum(kms, "chat");
        return c ? sum(kms, "dealsDigital") / c : 0;
      })(),
      productsPerClient: (() => {
        let w = 0, s = 0;
        kms.forEach((k) => {
          const c = k.chat || k.weekCoveredClients || 0;
          if (!c) return;
          w += c;
          s += (k.productsPerClient != null ? k.productsPerClient : 1.3) * c;
        });
        return w ? +(s / w).toFixed(2) : 0;
      })(),
      pipe: {
        sent: kms.reduce((s, k) => s + (k.pipe?.sent || 0), 0),
        viewed: kms.reduce((s, k) => s + (k.pipe?.viewed || 0), 0),
        discuss: kms.reduce((s, k) => s + (k.pipe?.discuss || 0), 0),
        accepted: kms.reduce((s, k) => s + (k.pipe?.accepted || 0), 0)
      }
    };
  }

  function forecastDeals(f) {
    // Expected deals from open pipeline using slice avg convDeal as baseline,
    // scaled by status weight / weight of "accepted-like"
    const base = f.convDeal || 0.05;
    const fromPipe =
      f.pipe.sent * PIPE_WEIGHT.sent * base / 0.85 +
      f.pipe.viewed * PIPE_WEIGHT.viewed * base / 0.85 +
      f.pipe.discuss * PIPE_WEIGHT.discuss * base / 0.85 +
      f.pipe.accepted * PIPE_WEIGHT.accepted * base / 0.85;
    const fromCapacity = f.available * f.convDeal; // if all available get UKP and convert at avg
    return {
      fromPipe: +fromPipe.toFixed(1),
      fromCapacity: +fromCapacity.toFixed(1),
      totalIfPush: +(fromPipe + fromCapacity).toFixed(1),
      baseConvDeal: f.convDeal,
      baseConvAccept: f.convAccept,
      baseConvApp: f.convApp
    };
  }

  // ——— multi-select ———
  function renderMultiSelect(container, options, selected, placeholder) {
    const set = new Set(selected);
    const label = selected.length
      ? (selected.length <= 2 ? selected.join(", ") : `Выбрано: ${selected.length}`)
      : placeholder;
    container.innerHTML = `
      <button type="button" class="ms-btn" aria-expanded="false">${label}</button>
      <div class="ms-drop" hidden>
        <label class="ms-all"><input type="checkbox" data-all ${!selected.length ? "checked" : ""}/> <b>Все</b></label>
        <div class="ms-list">
          ${options.map((o) => `<label><input type="checkbox" value="${o.replace(/"/g, "&quot;")}" ${set.has(o) ? "checked" : ""}/> ${o}</label>`).join("")}
        </div>
      </div>`;
  }

  function readMulti(container) {
    const all = container.querySelector("[data-all]");
    if (all && all.checked) return [];
    return [...container.querySelectorAll(".ms-list input:checked")].map((i) => i.value);
  }

  function syncFilters() {
    const filtersEl = document.querySelector(".filters");
    if (filtersEl) {
      filtersEl.classList.toggle("div-mode", isLeadMode());
      filtersEl.classList.toggle("region-mode", state.mode === "region");
    }

    const divs = unique(teams.map((t) => t.division)).sort();
    const divLabel = document.querySelector('label[for="ms-division"], .filters .ms-field:first-child label');
    const msDiv = $("#ms-division");
    const msRegion = $("#ms-region");
    const regionLabel = document.querySelector(".filters .ms-field:nth-child(2) label");

    if (isLeadMode()) {
      if (!state.divisions.length || !divs.includes(state.divisions[0])) {
        state.divisions = [META.defaultDivision && divs.includes(META.defaultDivision) ? META.defaultDivision : divs[0]];
      } else {
        state.divisions = [state.divisions[0]];
      }
      const cur = state.divisions[0];
      if (divLabel) {
        divLabel.textContent = "Дивизион";
        divLabel.setAttribute(
          "data-tip",
          state.mode === "region"
            ? "В режиме региона выбирается дивизион, затем одно управление/регион."
            : "В режиме дивизиона выбирается ровно один дивизион."
        );
        divLabel.classList.add("tip");
      }
      msDiv.classList.add("ms-single");
      msDiv.innerHTML = `<select id="division-single" aria-label="Дивизион">
        ${divs.map((d) => `<option value="${d.replace(/"/g, "&quot;")}" ${d === cur ? "selected" : ""}>${d}</option>`).join("")}
      </select>`;
    } else {
      if (divLabel) {
        divLabel.textContent = "Дивизион";
        divLabel.setAttribute("data-tip", "Множественный выбор. Пустой список = все дивизионы (total по сети в рамках остальных фильтров).");
        divLabel.classList.add("tip");
      }
      msDiv.classList.remove("ms-single");
      renderMultiSelect(msDiv, divs, state.divisions, "Все дивизионы");
    }

    const regionPool = teams.filter((t) => !state.divisions.length || state.divisions.includes(t.division));
    const regions = unique(regionPool.map((t) => t.region)).sort();
    state.regions = state.regions.filter((r) => regions.includes(r));

    if (state.mode === "region") {
      if (!state.regions.length || !regions.includes(state.regions[0])) {
        state.regions = [
          META.defaultRegion && regions.includes(META.defaultRegion) ? META.defaultRegion : (regions[0] || "")
        ].filter(Boolean);
      } else {
        state.regions = [state.regions[0]];
      }
      const curR = state.regions[0];
      if (regionLabel) {
        regionLabel.textContent = "Регион / управление";
        regionLabel.setAttribute("data-tip", "В режиме региона выбирается ровно одно управление/регион.");
        regionLabel.classList.add("tip");
      }
      msRegion.classList.add("ms-single");
      msRegion.innerHTML = `<select id="region-single" aria-label="Регион / управление">
        ${regions.map((r) => `<option value="${r.replace(/"/g, "&quot;")}" ${r === curR ? "selected" : ""}>${r}</option>`).join("")}
      </select>`;
      state.teams = [];
    } else {
      if (regionLabel) {
        regionLabel.textContent = "Регион / управление";
        regionLabel.setAttribute("data-tip", "Множественный выбор регионов/управлений внутри выбранных дивизионов. Пусто = все.");
        regionLabel.classList.add("tip");
      }
      msRegion.classList.remove("ms-single");
      renderMultiSelect(msRegion, regions, state.regions, "Все регионы");
    }

    const teamPool = teams.filter((t) =>
      (!state.divisions.length || state.divisions.includes(t.division)) &&
      (!state.regions.length || state.regions.includes(t.region))
    );
    const teamOpts = teamPrefixesFor(teamPool);
    if (state.mode === "region") {
      state.teams = [];
      renderMultiSelect($("#ms-team"), teamOpts, [], "Все команды");
    } else {
      state.teams = state.teams.filter((t) => teamOpts.includes(t) || teamOpts.some((o) => o.startsWith(t) || t.startsWith(o)));
      renderMultiSelect($("#ms-team"), teamOpts, state.teams, "Все команды");
    }

    renderMultiSelect(
      $("#ms-product"),
      PRODUCTS.map((p) => p.name),
      state.products.map(productName),
      "Все продукты"
    );
  }

  function bindMulti(container, onChange) {
    container.addEventListener("click", (e) => {
      const btn = e.target.closest(".ms-btn");
      if (btn) {
        const drop = container.querySelector(".ms-drop");
        const open = drop.hasAttribute("hidden");
        $all(".ms-drop").forEach((d) => d.setAttribute("hidden", ""));
        if (open) drop.removeAttribute("hidden");
        btn.setAttribute("aria-expanded", open ? "true" : "false");
        return;
      }
    });
    container.addEventListener("change", (e) => {
      if (e.target.matches("[data-all]")) {
        container.querySelectorAll(".ms-list input").forEach((i) => { i.checked = false; });
        e.target.checked = true;
      } else if (e.target.matches(".ms-list input")) {
        const all = container.querySelector("[data-all]");
        if (all) all.checked = false;
        const any = [...container.querySelectorAll(".ms-list input:checked")].length;
        if (!any && all) all.checked = true;
      }
      onChange();
    });
  }

  document.addEventListener("click", (e) => {
    if (!e.target.closest(".ms")) $all(".ms-drop").forEach((d) => d.setAttribute("hidden", ""));
  });

  function applyFilterReads() {
    if (isLeadMode()) {
      const sel = $("#division-single");
      if (sel && sel.value) state.divisions = [sel.value];
      else if (!state.divisions.length) state.divisions = [META.defaultDivision];
      else state.divisions = [state.divisions[0]];
    } else {
      state.divisions = readMulti($("#ms-division"));
    }
    if (state.mode === "region") {
      const rsel = $("#region-single");
      if (rsel && rsel.value) state.regions = [rsel.value];
      else if (!state.regions.length) state.regions = [META.defaultRegion];
      else state.regions = [state.regions[0]];
      state.teams = [];
    } else {
      state.regions = readMulti($("#ms-region"));
      state.teams = readMulti($("#ms-team"));
    }
    const names = readMulti($("#ms-product"));
    state.products = names.map((n) => PRODUCTS.find((p) => p.name === n)?.code).filter(Boolean);
  }

  function ctxLine() {
    const d = state.divisions.length ? state.divisions.join(", ") : "Все дивизионы";
    const r = state.regions.length ? state.regions.join(", ") : "все регионы";
    const t = state.teams.length ? state.teams.join(", ") : "все команды";
    const p = state.products.length ? state.products.map(productName).join(", ") : "все продукты";
    return `${d} · ${r} · ${t} · ${p}`;
  }

  function kpi(title, value, tipKey, hint, dltOrOpts) {
    let dlt = null;
    let deltaPct = null;
    let deltaPp = null;
    let ratioPct = null;
    if (dltOrOpts != null && typeof dltOrOpts === "object" && !Array.isArray(dltOrOpts)) {
      dlt = dltOrOpts.deltaAbs != null ? dltOrOpts.deltaAbs : null;
      deltaPct = dltOrOpts.deltaPct != null ? dltOrOpts.deltaPct : null;
      deltaPp = dltOrOpts.deltaPp != null ? dltOrOpts.deltaPp : null;
      ratioPct = dltOrOpts.ratioPct != null ? dltOrOpts.ratioPct : null;
    } else {
      dlt = dltOrOpts;
    }
    let rightHtml = "";
    if (ratioPct != null && !Number.isNaN(ratioPct)) {
      rightHtml = `<span class="kpi-wow ${ratioPct >= 100 ? "up" : ratioPct > 0 ? "down" : "flat"}" title="Факт / прогноз">${Math.round(ratioPct)}%</span>`;
    } else if (deltaPp != null && !Number.isNaN(deltaPp)) {
      rightHtml = `<span class="kpi-wow ${deltaPp > 0 ? "up" : deltaPp < 0 ? "down" : "flat"}">${deltaPp > 0 ? "+" : ""}${deltaPp} п.п.</span>`;
    } else if (deltaPct != null && !Number.isNaN(deltaPct)) {
      rightHtml = `<span class="kpi-wow ${deltaPct > 0 ? "up" : deltaPct < 0 ? "down" : "flat"}">${deltaPct > 0 ? "+" : ""}${deltaPct}%</span>`;
    }
    return `<div class="kpi tip" data-tip="${(TIPS[tipKey] || title).replace(/"/g, "&quot;")}">
      <div class="kpi-title">${title}</div>
      <div class="kpi-main">
        <div class="kpi-value">${typeof value === "number" ? fmt(value) : value}${dlt != null ? " " + deltaHtml(dlt, "") : ""}</div>
        ${rightHtml}
      </div>
      <div class="kpi-hint">${hint || ""}</div>
    </div>`;
  }

  function kmTableHtml(kms, limit) {
    const medDelta = median(kms.map((k) => k.deltaUkp));
    const medConv = median(kms.filter((k) => k.sentTotal >= 5).map((k) => k.convAccept));
    const medPen = median(kms.map((k) => k.abPenWeek != null ? k.abPenWeek : (k.penetration || 0)));
    let rows = [...kms];
    if (state.sortKm === "convAccept") rows.sort((a, b) => a.convAccept - b.convAccept);
    else if (state.sortKm === "spam") rows.sort((a, b) => Number(b.spamFlag) - Number(a.spamFlag) || a.convAccept - b.convAccept);
    else rows.sort((a, b) => {
      if (a.displayStatus === "lag" && b.displayStatus !== "lag") return -1;
      if (b.displayStatus === "lag" && a.displayStatus !== "lag") return 1;
      return b.deltaUkp - a.deltaUkp;
    });
    if (limit) rows = rows.slice(0, limit);
    return `<table>
      <thead><tr>
        <th class="tip" data-tip="Клиентский менеджер.">КМ</th>
        <th class="tip" data-tip="Команда / отдел закрепления КМ.">Закрепление</th>
        <th class="num tip" data-tip="${TIPS.potential}">Клиентская база</th>
        <th class="num tip" data-tip="${TIPS.withAb}">С меткой AB</th>
        <th class="num tip" data-tip="${TIPS.abPenWeek}">Проникн. AB</th>
        <th class="num tip" data-tip="${TIPS.ukpCoverage}">Покрытие УКП</th>
        <th class="num tip" data-tip="${TIPS.activeUkp}">Активн. УКП</th>
        <th class="num tip" data-tip="${TIPS.productsPerClient}">Продукты/кл.</th>
        <th class="num tip" data-tip="${TIPS.available}">Доступно</th>
        <th class="num tip" data-tip="${TIPS.deltaUkp}">УКП направлено</th>
        <th class="num tip" data-tip="${TIPS.sentTotal}">Отпр. учёт</th>
        <th class="num tip" data-tip="${TIPS.convAcc}">Конв. акц.</th>
        <th class="num tip" data-tip="${TIPS.convApp}">Конв. заявка</th>
        <th class="num tip" data-tip="${TIPS.convDeal}">Конв. сделка</th>
        <th class="num tip" data-tip="${TIPS.expired}">Истекло</th>
        <th class="num tip" data-tip="${TIPS.deals}">Сделки</th>
        <th class="num tip" data-tip="${TIPS.vsDelta} Медиана среза: ${medDelta}.">vs Δ</th>
        <th class="num tip" data-tip="${TIPS.vsConv} Медиана: ${pct(medConv)}.">vs конв.</th>
        <th class="tip" data-tip="Опережает / в норме / отстаёт / база под УКП / слабое качество УКП.">Статус</th>
      </tr></thead>
      <tbody>${rows.map((k) => {
        const vsD = k.deltaUkp - medDelta;
        const vsC = Math.round((k.convAccept - medConv) * 1000) / 10;
        const st = k.displayStatus || k.status;
        const abPen = k.abPenWeek != null ? k.abPenWeek : (k.potential ? (k.abActiveWeek || 0) / k.potential : 0);
        const cov = k.ukpCoverage != null ? k.ukpCoverage : (k.potential ? k.activeUkp / k.potential : 0);
        return `<tr>
          <td class="km-name">${k.name}</td>
          <td class="small muted">${k.team}</td>
          <td class="num">${k.potential}</td>
          <td class="num">${k.withAb || 0}</td>
          <td class="num ${abPen < 0.5 ? "bad-num" : ""}">${pct(abPen)}</td>
          <td class="num">${pct(cov)}</td>
          <td class="num">${k.activeUkp}</td>
          <td class="num">${k.productsPerClient != null ? k.productsPerClient : "—"}</td>
          <td class="num">${k.available}</td>
          <td class="num">${k.deltaUkp}</td>
          <td class="num">${k.sentTotal}</td>
          <td class="num ${k.spamFlag ? "bad-num" : ""}">${pct(k.convAccept)}</td>
          <td class="num">${pct(k.convApp)}</td>
          <td class="num">${pct(k.convDeal)}</td>
          <td class="num">${k.expiredWeek}</td>
          <td class="num">${k.deals}${k.deltaDeals != null ? " " + deltaHtml(k.deltaDeals) : ""}</td>
          <td class="num">${vsD >= 0 ? "+" : ""}${Math.round(vsD * 10) / 10}</td>
          <td class="num">${vsC >= 0 ? "+" : ""}${vsC} п.п.</td>
          <td><span class="badge ${st}">${statusLabel(st)}</span></td>
        </tr>`;
      }).join("")}</tbody></table>
      <p class="note-line tip" data-tip="${TIPS.abPenWeek}">Медиана проникновения AB (неделя) в срезе: <b>${pct(medPen)}</b>. Ниже 50% подсвечено — слабая оцифровка базы.</p>`;
  }

  function renderHeader(kms, f) {
    $("#ctx-line").textContent = ctxLine();
    $("#ctx-meta").innerHTML =
      `Неделя: <b>${META.weekLabel}</b> · КМ: <b>${kms.length}</b> · Потенциал: <b>${fmt(f.potential)}</b> · ` +
      `С меткой Alfa-boss: <b>${fmt(f.withAb)}</b> · ` +
      `<span class="tip" data-tip="${TIPS.penetration}">Проникновение: <b>${pct(f.penetration)}</b></span> · ` +
      `Доступно к УКП: <b>${fmt(f.available)}</b> · ` +
      `Конв. акц./заявка/сделка: <b>${pct(f.convAccept)}</b> / <b>${pct(f.convApp)}</b> / <b>${pct(f.convDeal)}</b>`;
    $("#role-sub").textContent = state.mode === "product"
      ? "Прототип · продукты (БП)"
      : state.mode === "division"
        ? "Прототип · дивизиональный руководитель"
        : state.mode === "region"
          ? "Прототип · руководитель региона / управления"
          : "Прототип · руководитель клиентских менеджеров";
  }

  function arrowHtml(move) {
    if (move > 0) return `<span class="rank-arrow up" title="Поднялся на ${move}">↑${move}</span>`;
    if (move < 0) return `<span class="rank-arrow down" title="Опустился на ${Math.abs(move)}">↓${Math.abs(move)}</span>`;
    return `<span class="rank-arrow flat" title="Без изменений">→</span>`;
  }

  function coveredClientsOf(k, productCode) {
    const clients = k.clients || 0;
    if (!clients) return 0;
    const pot = k.potential || 1;
    if (!productCode) {
      if (k.weekCoveredClients != null) return Math.min(clients, k.weekCoveredClients);
      return Math.min(clients, Math.round((k.chat || 0) * (clients / pot)));
    }
    const p = k.products && k.products[productCode];
    if (!p) return 0;
    const inclined = Math.min(clients, Math.round((p.potential || 0) * (clients / pot)));
    const share = p.discussedShare != null ? p.discussedShare : 0.08;
    const discussed = Math.min(inclined, Math.max(0, Math.round(inclined * share) + (p.deltaUkp || 0)));
    return discussed;
  }

  function clientsBaseOf(k, productCode) {
    const clients = k.clients || 0;
    if (!productCode) return clients;
    const pot = k.potential || 1;
    const p = k.products && k.products[productCode];
    if (!p) return 0;
    return Math.min(clients, Math.round((p.potential || 0) * (clients / pot)));
  }

  /** periodFrom: 0 = тек. неделя; N = накопительно с −N недели (N недель + текущая) */
  function periodWeeks(periodFrom) {
    const n = Math.max(0, Math.min(5, periodFrom | 0));
    return n + 1;
  }

  function activatedBaseOf(k, productCode) {
    const act = k.activatedAb || 0;
    if (!productCode) return act;
    const clients = k.clients || 0;
    const base = clientsBaseOf(k, productCode);
    if (!clients || !base) return 0;
    return Math.min(base, Math.round(act * (base / clients)));
  }

  function unitCoverageMetrics(kms, productCode, periodFrom) {
    const weeks = periodWeeks(periodFrom);
    const clients = kms.reduce((s, k) => s + clientsBaseOf(k, productCode), 0);
    const activated = kms.reduce((s, k) => s + activatedBaseOf(k, productCode), 0);
    const weekCovered = kms.reduce((s, k) => s + coveredClientsOf(k, productCode), 0);
    const kmN = kms.length || 1;
    const weekRate = clients ? weekCovered / clients : 0;
    // Среди активированных охват выше: большая часть коммуникаций приходится на них
    const actShare = clients ? activated / clients : 0;
    const coverOnAct = Math.min(0.95, 0.72 + actShare * 0.2);
    const weekCoveredAct = Math.min(activated, Math.round(weekCovered * coverOnAct));
    const weekRateAct = activated ? weekCoveredAct / activated : 0;
    const seed = hash("divcov|" + (productCode || "ALL") + "|w" + weeks + "|" + kms.map((k) => k.id).join(",").slice(0, 80));
    const rng = RNG(seed);

    function accumulate(weekRate0) {
      const rates = [];
      for (let i = 0; i < weeks - 1; i++) {
        rates.push(Math.max(0.02, Math.min(0.55, weekRate0 + (rng.f() - 0.5) * 0.05)));
      }
      rates.push(weekRate0);
      let uncovered = 1;
      rates.forEach((r) => { uncovered *= (1 - Math.min(0.95, r) * 0.82); });
      const rate = weeks === 1 ? weekRate0 : Math.min(0.95, 1 - uncovered);
      return { rate, rates };
    }

    const acc = accumulate(weekRate);
    const accAct = accumulate(weekRateAct);
    const rate = acc.rate;
    const rateAct = accAct.rate;
    const covered = Math.min(clients, Math.round(clients * rate));
    const coveredAct = Math.min(activated, Math.round(activated * rateAct));
    const perKm = covered / kmN;

    const rateWowPp = +((rng.f() * 2.4 - 1.0).toFixed(1));
    const rateActWowPp = +((rng.f() * 2.8 - 1.1).toFixed(1));
    const actShareWowPp = +((rng.f() * 2.2 - 0.9).toFixed(1));
    const perKmWowAbs = +((rng.f() * 1.2 - 0.5).toFixed(1));
    const ratePrev = Math.max(0, Math.min(1, rate - rateWowPp / 100));
    const rateActPrev = Math.max(0, Math.min(1, rateAct - rateActWowPp / 100));
    const actSharePrev = Math.max(0, Math.min(1, actShare - actShareWowPp / 100));
    const perKmPrev = Math.max(0, perKm - perKmWowAbs);
    return {
      clients, activated, covered, coveredAct, kmN,
      rate, rateAct, actShare, perKm,
      rateWowPp, rateActWowPp, actShareWowPp, perKmWowAbs,
      ratePrev, rateActPrev, actSharePrev, perKmPrev,
      weeks, weekRates: acc.rates
    };
  }

  function productCommRows(kms, periodFrom) {
    const weeks = periodWeeks(periodFrom);
    const clientsTot = sum(kms, "clients") || 1;
    const potTot = sum(kms, "potential") || 1;
    const clientShare = clientsTot / potTot;
    // Diminishing returns for multi-week unique discuss
    const cumFactor = weeks === 1 ? 1 : 1 + (weeks - 1) * 0.48;
    return PRODUCTS.map((p) => {
      let inclined = 0;
      let discussed = 0;
      let slots = 0;
      kms.forEach((k) => {
        const pr = k.products && k.products[p.code];
        if (!pr) return;
        const incl = Math.min(k.clients || 0, Math.round((pr.potential || 0) * clientShare));
        const share = pr.discussedShare != null ? pr.discussedShare : 0.08;
        const discWeek = Math.min(incl, Math.max(0, Math.round(incl * share) + (pr.deltaUkp || 0)));
        const disc = Math.min(incl, Math.round(discWeek * cumFactor));
        inclined += incl;
        discussed += disc;
        slots += pr.active || 0;
      });
      const share = inclined ? discussed / inclined : 0;
      const seed = hash("divprod|" + p.code + "|w" + weeks + "|" + kms.length + "|" + discussed);
      const rng = RNG(seed);
      const wowPp = +((rng.f() * 2.8 - 1.2).toFixed(1));
      return {
        code: p.code,
        name: p.name,
        inclined,
        discussed,
        slots,
        share,
        wowPp,
        sharePrev: Math.max(0, Math.min(1, share - wowPp / 100))
      };
    }).filter((r) => r.inclined > 0);
  }

  function productAppsRows(kms, periodFrom) {
    const weeks = periodWeeks(periodFrom);
    const clientsTot = sum(kms, "clients") || 1;
    const potTot = sum(kms, "potential") || 1;
    const clientShare = clientsTot / potTot;
    const cumFactor = weeks === 1 ? 1 : 1 + (weeks - 1) * 0.42;
    return PRODUCTS.map((p) => {
      let inclined = 0;
      let discussed = 0;
      let slots = 0;
      kms.forEach((k) => {
        const pr = k.products && k.products[p.code];
        if (!pr) return;
        const incl = Math.min(k.clients || 0, Math.round((pr.potential || 0) * clientShare));
        const appsWeek = Math.min(incl, Math.max(0, (pr.apps || pr.appsP1 || 0) + Math.round((pr.deltaUkp || 0) * 0.4)));
        const disc = Math.min(incl, Math.round(appsWeek * cumFactor));
        inclined += incl;
        discussed += disc;
        slots += pr.active || 0;
      });
      const share = inclined ? discussed / inclined : 0;
      const seed = hash("divprodapps|" + p.code + "|w" + weeks + "|" + kms.length + "|" + discussed);
      const rng = RNG(seed);
      const wowPp = +((rng.f() * 2.8 - 1.2).toFixed(1));
      return {
        code: p.code,
        name: p.name,
        inclined,
        discussed,
        slots,
        share,
        wowPp,
        sharePrev: Math.max(0, Math.min(1, share - wowPp / 100))
      };
    }).filter((r) => r.inclined > 0);
  }

  const HELP_CONTENT = {
    cov: {
      title: "Методика: охват и активация клиентов",
      html: `
        <p>Три KPI-карточки рядом с динамикой охвата. «Охват от активированных» и «Доля активированных» — с красной рамкой Alfa-boss.</p>
        <span class="formula">Охват от клиентов = с (чат ∨ УКП) / клиенты банка</span>
        <span class="formula">Охват от активированных = активированные с (чат ∨ УКП) / активированные</span>
        <span class="formula">Доля активированных = активированные / клиенты банка</span>
        <ul>
          <li><b>Коммуникация</b> — уникальные ЮЛ с чатом КМ↔ЛПР и/или действующим УКП (TTL 14 дней).</li>
          <li><b>Клиенты</b> — все клиенты банка на закреплении (без проспектов).</li>
          <li><b>Активированные</b> — клиенты с меткой, хотя бы раз входившие в режим Alfa-boss.</li>
          <li>У каждой карточки: значение, прирост в п.п. к прошлому периоду, место среди дивизионов/регионов (клик — рейтинг), подсказка числитель/знаменатель.</li>
          <li><b>Накопительно с</b> — уникальный охват за окно с −1…−5 по текущую неделю (для долей охвата).</li>
        </ul>`
    },
    prod: {
      title: "Методика: продуктовое покрытие",
      html: `
        <p>Переключатель: покрытие продукта <b>в коммуникациях</b> или <b>в заявках</b>.</p>
        <span class="formula">Покрытие в комм. = обсуждали продукт / клиенты со склонностью</span>
        <span class="formula">Покрытие в заявках = заявки по продукту / клиенты со склонностью</span>
        <p>Справа три KPI:</p>
        <ul>
          <li><b>Конверсия заявок в сделки</b> = сделки / заявки.</li>
          <li><b>Продуктов на клиента в активностях</b> = среднее число продуктов в активностях на клиента с коммуникацией.</li>
          <li><b>Конверсия коммуникаций → сделки в цифре</b> = цифровые сделки / клиенты с коммуникацией.</li>
        </ul>`
    },
    mgr: {
      title: "Методика: рейтинг клиентских менеджеров",
      html: `
        <p>Рейтинг КМ выбранного региона/управления. Сортировка — клик по заголовку. По умолчанию — сводная оценка.</p>
        <ul>
          <li><b>Охват коммуникациями</b> — клиенты с коммуникацией / клиенты банка.</li>
          <li><b>Конв. комм. → сделки в цифре</b> — цифровые сделки / клиенты с коммуникацией.</li>
          <li><b>Прод. проникновение</b> — среднее число продуктов в коммуникациях на клиента с коммуникацией.</li>
          <li><b>Топ-5 продуктов</b> — пилюли с наибольшим объёмом в коммуникациях КМ.</li>
          <li><b>Сводная оценка (0–100)</b> — среднее перцентильных рангов по трём метрикам (равные веса).</li>
          <li><b>На что обратить внимание</b> — сигналы относительно медианы региона по новым рейтингам (низкий охват, слабая цифровая конверсия, узкое проникновение, негативная динамика).</li>
        </ul>`
    },
    rank: {
      title: "Методика: рейтинг регионов / управлений",
      html: `
        <p>Регионы и управления выбранного дивизиона ранжируются по выбранной метрике за период из шапки вкладки.</p>
        <ul>
          <li><b>Доля охвата</b> — клиенты с коммуникацией / клиенты банка в регионе.</li>
          <li><b>Клиентов с комм. / КМ</b> — число клиентов с коммуникацией / число КМ в регионе.</li>
          <li><b>Фильтр продукта</b> и <b>накопительный период</b> — в шапке вкладки, применяются ко всем блокам.</li>
          <li><b>Прирост</b> — п.п. для доли охвата или абсолют для «на КМ».</li>
          <li><b>Δ места</b> — изменение позиции в рейтинге <b>внутри дивизиона</b> к прошлому периоду.</li>
          <li><b>Квартиль</b> — позиция среди всех управлений/регионов <b>всех дивизионов</b> сети по выбранной метрике (звёзды: ★★★★ = топ-квартиль 1/4, ★ = нижний 4/4):
            <ul>
              <li><b>★★★★</b> — выше 75-го перцентиля (1/4)</li>
              <li><b>★★★</b> — от 50-го до 75-го (2/4)</li>
              <li><b>★★</b> — от 25-го до 50-го (3/4)</li>
              <li><b>★</b> — ниже 25-го перцентиля (4/4)</li>
            </ul>
          </li>
        </ul>`
    }
  };

  function openHelp(key) {
    const isRegion = state.mode === "region";
    let spec = HELP_CONTENT[key];
    if (!spec) return;
    if (key === "cov" && isRegion) {
      spec = {
        title: spec.title,
        html: spec.html.replace(
          "ранг дивизиона среди всех дивизионов сети",
          "ранг региона/управления среди всех регионов сети"
        )
      };
    } else if (key === "prod" && isRegion) {
      spec = {
        title: spec.title,
        html: spec.html.replace(
          "место дивизиона среди сети",
          "место региона/управления среди всех регионов сети"
        )
      };
    } else if (key === "rank" && isRegion) {
      spec = {
        title: "Методика: рейтинг команд / отделов",
        html: `
        <p>Команды и отделы выбранного региона/управления ранжируются по выбранной метрике за период из шапки вкладки.</p>
        <ul>
          <li><b>Доля охвата</b> — клиенты с коммуникацией / клиенты банка в команде/отделе.</li>
          <li><b>Клиентов с комм. / КМ</b> — число клиентов с коммуникацией / число КМ в команде/отделе.</li>
          <li><b>Фильтр продукта</b> и <b>накопительный период</b> — в шапке вкладки, применяются ко всем блокам.</li>
          <li><b>Прирост</b> — п.п. для доли охвата или абсолют для «на КМ».</li>
          <li><b>Δ места</b> — изменение позиции в рейтинге <b>внутри региона</b> к прошлому периоду.</li>
          <li><b>Квартиль</b> — позиция среди всех команд/отделов <b>всех регионов сети</b> по выбранной метрике (★★★★ = 1/4, ★ = 4/4):
            <ul>
              <li><b>★★★★</b> — выше 75-го перцентиля</li>
              <li><b>★★★</b> — от 50-го до 75-го</li>
              <li><b>★★</b> — от 25-го до 50-го</li>
              <li><b>★</b> — ниже 25-го перцентиля</li>
            </ul>
          </li>
        </ul>`
      };
    }
    closeRankPopup();
    const modal = $("#help-modal");
    $("#help-modal-title").textContent = spec.title;
    $("#help-modal-body").innerHTML = spec.html;
    modal.hidden = false;
  }
  function closeHelp() {
    const modal = $("#help-modal");
    if (modal) modal.hidden = true;
  }

  function openRankPopup(cacheKey, highlightKey) {
    const data = divRankCache[cacheKey];
    if (!data) return;
    closeHelp();
    const card = $("#rank-modal .help-modal-card");
    if (card) card.classList.remove("rank-modal-wide");
    const current = highlightKey != null && highlightKey !== "" ? highlightKey : data.currentKey;
    $("#rank-modal-title").textContent = data.title;
    $("#rank-modal-body").innerHTML = `<ol class="rank-list">${data.rows.map((r) => {
      const cur = current != null && r.key === current;
      return `<li class="${cur ? "is-current" : ""}">
        <span class="rk-pos">${r.pos}</span>
        <span class="rk-name">${r.label}</span>
        <span class="rk-val">${r.value}</span>
      </li>`;
    }).join("")}</ol>`;
    $("#rank-modal").hidden = false;
  }
  function closeRankPopup() {
    const modal = $("#rank-modal");
    if (modal) modal.hidden = true;
    const card = $("#rank-modal .help-modal-card");
    if (card) card.classList.remove("rank-modal-wide");
  }

  function cacheRank(key, title, currentKey, ranked, valueFn) {
    divRankCache[key] = {
      title,
      currentKey,
      rows: ranked.map((r) => ({
        key: r.key,
        label: r.label != null ? r.label : r.key,
        pos: r.pos,
        value: valueFn(r)
      }))
    };
  }

  function rankLinkHtml(rank, cacheKey) {
    if (rank == null || rank === "—") return "—";
    return `<button type="button" class="rank-link" data-rank-open="${cacheKey}">${rank}-е место</button>`;
  }

  function rankUnits(items, valueKey, prevKey) {
    const byCurr = [...items].sort((a, b) => (b[valueKey] || 0) - (a[valueKey] || 0));
    const byPrev = [...items].sort((a, b) => (b[prevKey] || 0) - (a[prevKey] || 0));
    const prevPos = {};
    byPrev.forEach((it, i) => { prevPos[it.key] = i + 1; });
    return byCurr.map((it, i) => {
      const pos = i + 1;
      const prev = prevPos[it.key] || pos;
      return { ...it, pos, prevPos: prev, move: prev - pos };
    });
  }

  function divKpiCard(opts) {
    const {
      tip, label, valueHtml, deltaHtmlStr, rank, move, hint, rankKey
    } = opts;
    const rankTip = state.mode === "region"
      ? "Место среди всех регионов/управлений сети. Клик — полный рейтинг."
      : "Место среди всех дивизионов сети. Клик — полный рейтинг.";
    return `<div class="div-kpi-label tip" data-tip="${String(tip).replace(/"/g, "&quot;")}">${label}</div>
      <div class="div-kpi-big">${valueHtml}</div>
      <div class="div-kpi-meta">
        ${deltaHtmlStr || ""}
        <span class="rank-line tip" data-tip="${rankTip}">
          ${rankKey ? rankLinkHtml(rank, rankKey) : (rank != null ? `${rank}-е место` : "—")} ${arrowHtml(move || 0)}
        </span>
      </div>
      <div class="kpi-hint">${hint || ""}</div>`;
  }

  function openRegionProductsPopup(cacheKey) {
    const data = regionProdCache[cacheKey];
    if (!data) return;
    closeHelp();
    const hi = data.highlightCode;
    $("#rank-modal-title").textContent = data.title;
    const card = $("#rank-modal .help-modal-card");
    if (card) card.classList.add("rank-modal-wide");
    $("#rank-modal-body").innerHTML = `<table class="prod-all-table">
      <thead><tr>
        <th class="num">#</th>
        <th>Продукт</th>
        <th class="num">Доля</th>
        <th class="num">В комм. / склонность</th>
        <th class="num">Δ</th>
      </tr></thead>
      <tbody>${data.rows.map((r, i) => {
        const cur = hi && r.code === hi;
        return `<tr class="${cur ? "is-current" : ""}">
          <td class="num">${i + 1}</td>
          <td>${r.name}</td>
          <td class="num">${pct(r.share)}</td>
          <td class="num">${fmt(r.discussed)} / ${fmt(r.inclined)}</td>
          <td class="num">${deltaHtml(r.wowPp, " п.п.")}</td>
        </tr>`;
      }).join("")}</tbody>
    </table>`;
    $("#rank-modal").hidden = false;
  }

  /** Понедельная динамика заявок (цифровые / оффлайн) и конверсии в сделки по дате заявки */
  function productAppsWeekSeries(kms, productCode) {
    let dig0 = 0, off0 = 0, deals0 = 0;
    kms.forEach((k) => {
      if (productCode) {
        const p = k.products && k.products[productCode];
        if (!p) return;
        const dig = p.appsP1 || 0;
        const off = Math.max(0, (p.apps || 0) - dig);
        dig0 += dig;
        off0 += off;
        deals0 += p.deals || 0;
      } else {
        dig0 += (k.appsP1 || 0) + (k.appsP3 || 0);
        off0 += k.appsP2 || 0;
        deals0 += k.deals || 0;
      }
    });
    const seed = hash("proddyn|" + (productCode || "ALL") + "|" + kms.map((k) => k.id).join(",").slice(0, 60));
    const rng = RNG(seed);
    const weeks = [];
    for (let i = 0; i < 5; i++) {
      const fDig = 0.55 + rng.f() * 0.7;
      const fOff = 0.5 + rng.f() * 0.75;
      const dig = Math.max(0, Math.round(dig0 * fDig));
      const off = Math.max(0, Math.round(off0 * fOff));
      const apps = dig + off;
      const baseConv = apps ? deals0 / Math.max(apps, 1) : 0.12;
      const conv = Math.max(0.02, Math.min(0.55, baseConv + (rng.f() - 0.5) * 0.08));
      const deals = Math.min(apps, Math.round(apps * conv));
      weeks.push({ lab: WEEK_LABS[i], dig, off, apps, deals, conv });
    }
    const apps0 = dig0 + off0;
    const conv0 = apps0 ? deals0 / apps0 : 0;
    weeks.push({ lab: WEEK_LABS[5], dig: dig0, off: off0, apps: apps0, deals: deals0, conv: conv0 });
    return weeks;
  }

  function openProductDynamicsPopup(productCode, kms) {
    closeHelp();
    const name = productCode ? productName(productCode) : "Все продукты";
    const weeks = productAppsWeekSeries(kms, productCode || null);
    const maxApps = Math.max(...weeks.map((w) => Math.max(w.dig, w.off)), 1);
    const card = $("#rank-modal .help-modal-card");
    if (card) card.classList.add("rank-modal-wide");
    $("#rank-modal-title").textContent = `Динамика заявок · ${name}`;
    $("#rank-modal-body").innerHTML = `
      <p class="prod-dyn-note">Понедельно за 6 недель по <b>дате поступления заявки</b>. Цифровые — P1 (из УКП) и P3 (органика Alfa-boss); оффлайн — P2 (КМ без УКП). Конверсия = сделки / заявки за неделю.</p>
      <div class="prod-dyn-chart">${weeks.map((w) => `
        <div class="prod-dyn-col tip" data-tip="${w.lab}: цифр. ${w.dig}, оффлайн ${w.off}, сделки ${w.deals}, конв. ${pct(w.conv)}">
          <div class="prod-dyn-bars">
            <div class="prod-dyn-bar dig" style="height:${Math.max(2, Math.round(w.dig / maxApps * 88))}px"></div>
            <div class="prod-dyn-bar off" style="height:${Math.max(2, Math.round(w.off / maxApps * 88))}px"></div>
          </div>
          <div class="prod-dyn-conv">${pct(w.conv)}</div>
          <div class="prod-dyn-lab">${w.lab.replace(" нед.", "")}</div>
        </div>`).join("")}</div>
      <table class="prod-dyn-table">
        <thead><tr>
          <th>Неделя заявки</th>
          <th class="num">Цифровые</th>
          <th class="num">Оффлайн</th>
          <th class="num">Всего заявок</th>
          <th class="num">Сделки</th>
          <th class="num">Конв. → сделка</th>
        </tr></thead>
        <tbody>${weeks.map((w) => `<tr>
          <td>${w.lab}</td>
          <td class="num">${fmt(w.dig)}</td>
          <td class="num">${fmt(w.off)}</td>
          <td class="num">${fmt(w.apps)}</td>
          <td class="num">${fmt(w.deals)}</td>
          <td class="num">${pct(w.conv)}</td>
        </tr>`).join("")}</tbody>
      </table>`;
    $("#rank-modal").hidden = false;
  }

  function percentileRank(values, value) {
    if (!values.length) return 0.5;
    const below = values.filter((v) => v < value).length;
    const equal = values.filter((v) => v === value).length;
    return (below + equal * 0.5) / values.length;
  }

  function kmManagerRow(k) {
    const clients = k.clients || 0;
    const covered = coveredClientsOf(k, null);
    const commCov = clients ? covered / clients : (k.commCoverage || 0);
    const dealsDigital = k.dealsDigital != null ? k.dealsDigital : Math.round((k.deals || 0) * 0.6);
    const convCommDig = covered ? dealsDigital / covered : (k.convCommDigital || 0);
    const prodPen = k.productsPerClient != null ? k.productsPerClient : 1.3;
    const rng = RNG(hash("mgrwow|" + k.id));
    const commWow = +((rng.f() * 4 - 1.8).toFixed(1));
    const convDigWow = +((rng.f() * 6 - 2.5).toFixed(1));
    const prodWow = +((rng.f() * 0.3 - 0.12).toFixed(2));
    return {
      id: k.id,
      name: k.name,
      team: k.team,
      clients,
      covered,
      activated: k.activatedAb || 0,
      commCov,
      convCommDig,
      prodPen,
      dealsDigital,
      commWow,
      convDigWow,
      prodWow,
      deltaUkp: k.deltaUkp || 0
    };
  }

  function buildKmAlerts(row, medians) {
    const { medComm, medConvDig, medProd } = medians;
    const alerts = [];
    if (row.commCov < medComm * 0.7) {
      alerts.push({ cls: "warn", text: `Низкий охват коммуникациями (${pct(row.commCov)})` });
    }
    if (row.covered >= 3 && row.convCommDig < medConvDig * 0.65) {
      alerts.push({ cls: "warn", text: `Слабая конверсия комм. → сделки в цифре (${pct(row.convCommDig)})` });
    }
    if (row.prodPen < medProd * 0.75 || (row.prodPen < 1.15 && row.covered >= 3)) {
      alerts.push({ cls: "warn", text: `Низкое продуктовое проникновение (${row.prodPen.toFixed(2)} прод./кл.)` });
    }
    if (row.commWow <= -2) {
      alerts.push({ cls: "", text: `Снижение охвата коммуникациями (${row.commWow} п.п.)` });
    }
    if (row.convDigWow <= -3) {
      alerts.push({ cls: "", text: `Падение конверсии в цифровые сделки (${row.convDigWow} п.п.)` });
    }
    if (row.prodWow <= -0.15 && row.covered >= 3) {
      alerts.push({ cls: "info", text: `Сужение продуктового проникновения (${row.prodWow > 0 ? "+" : ""}${row.prodWow})` });
    }
    if (row.deltaUkp === 0 && row.clients >= 40) {
      alerts.push({ cls: "info", text: "Нет направленных УКП за неделю при крупной базе" });
    }
    return alerts;
  }

  function renderManagers(kms) {
    ensureLeadSelected();
    const rows = kms.map(kmManagerRow);
    const comms = rows.map((r) => r.commCov);
    const convs = rows.map((r) => r.convCommDig);
    const prods = rows.map((r) => r.prodPen);
    const medians = {
      medComm: median(comms),
      medConvDig: median(convs),
      medProd: median(prods)
    };

    rows.forEach((r) => {
      const pComm = percentileRank(comms, r.commCov);
      const pConv = percentileRank(convs, r.convCommDig);
      const pProd = percentileRank(prods, r.prodPen);
      r.score = Math.round(100 * ((pComm + pConv + pProd) / 3));
      r.alerts = buildKmAlerts(r, medians);
    });

    const sortKey = state.mgrSort || "score";
    const dir = state.mgrSortDir === "asc" ? 1 : -1;
    const sorted = [...rows].sort((a, b) => {
      const va = a[sortKey] != null ? a[sortKey] : 0;
      const vb = b[sortKey] != null ? b[sortKey] : 0;
      if (va === vb) return a.name.localeCompare(b.name, "ru");
      return va > vb ? dir : -dir;
    });

    const note = $("#mgr-note");
    if (note) {
      note.textContent = `КМ в регионе: ${rows.length}. Сводная = среднее рангов по охвату комм., конв. комм.→сделки в цифре и прод. проникновению. Медианы: охват ${pct(medians.medComm)}, конв. ${pct(medians.medConvDig)}, прод. ${medians.medProd.toFixed(2)}.`;
    }

    function th(key, label, cls) {
      const active = sortKey === key;
      const arrow = active ? (state.mgrSortDir === "asc" ? "▲" : "▼") : "⇅";
      return `<th class="${cls || ""} ${active ? "is-sorted" : ""}" data-mgr-sort="${key}">${label}<span class="sort-ind">${arrow}</span></th>`;
    }

    const kmById = {};
    kms.forEach((k) => { kmById[k.id] = k; });
    const periodFrom = state.divPeriodFrom | 0;
    const periodLabel = periodFrom === 0
      ? "тек. неделя"
      : `с −${periodFrom} нед.`;

    $("#mgr-table-wrap").innerHTML = `<table id="mgr-table">
      <thead><tr>
        <th class="num">#</th>
        <th>КМ</th>
        ${th("commCov", "Охват коммуникациями", "num tip")}
        ${th("convCommDig", "Конв. комм.→сделки в цифре", "num tip")}
        ${th("prodPen", "Прод. проникновение", "num tip")}
        ${th("score", "Сводная оценка", "num")}
        <th>Топ-5 продуктов</th>
        <th>На что обратить внимание</th>
      </tr></thead>
      <tbody>${sorted.map((r, i) => {
        const km = kmById[r.id];
        const prodsHtml = km
          ? topProductsForRegion("km-" + r.id, [km], null, periodFrom, periodLabel, r.name)
          : "—";
        return `<tr>
          <td class="num">${i + 1}</td>
          <td><div class="mgr-name">${r.name}</div><div class="mgr-sub">${r.team} · ${fmt(r.clients)} кл. · ${fmt(r.covered)} с комм.</div></td>
          <td class="num tip" data-tip="${fmt(r.covered)} / ${fmt(r.clients)} · Δ ${r.commWow > 0 ? "+" : ""}${r.commWow} п.п.">${pct(r.commCov)}</td>
          <td class="num tip" data-tip="${fmt(r.dealsDigital)} цифровых сделок / ${fmt(r.covered)} с комм. · Δ ${r.convDigWow > 0 ? "+" : ""}${r.convDigWow} п.п.">${pct(r.convCommDig)}</td>
          <td class="num tip" data-tip="Продуктов на клиента в коммуникациях · Δ ${r.prodWow > 0 ? "+" : ""}${r.prodWow}">${r.prodPen.toFixed(2)}</td>
          <td class="num"><span class="mgr-score">${r.score}</span></td>
          <td>${prodsHtml}</td>
          <td><div class="mgr-alerts">${r.alerts.length
            ? r.alerts.map((a) => `<div class="mgr-alert ${a.cls}">${a.text}</div>`).join("")
            : `<div class="mgr-alert ok-empty">Без критичных сигналов</div>`
          }</div></td>
        </tr>`;
      }).join("")}
      </tbody>
    </table>`;
  }

  function topProductsForRegion(regionKey, kms, highlightCode, periodFrom, periodLabel, displayName) {
    const all = productCommRows(kms, periodFrom).sort((a, b) => b.share - a.share || b.discussed - a.discussed);
    regionProdCache[regionKey] = {
      title: `Продукты · ${displayName || regionKey} · ${periodLabel || "тек. неделя"}`,
      highlightCode: highlightCode || null,
      rows: all
    };
    if (!all.length) return "<span class=\"muted small\">—</span>";
    const top = [...all].sort((a, b) => b.discussed - a.discussed).slice(0, 5);
    const pills = top.map((r) =>
      `<span class="prod-pill${highlightCode && r.code === highlightCode ? " hi" : ""} tip" data-tip="${r.name}: ${fmt(r.discussed)} в комм. · охват ${pct(r.share)}">${r.name.replace(/\s*\(.*\)\s*$/, "").split(" ").slice(0, 2).join(" ")}</span>`
    ).join("");
    const more = `<button type="button" class="prod-pill prod-pill-more tip" data-prod-all="${regionKey.replace(/"/g, "&quot;")}" data-tip="Все продукты по доле покрытия" aria-label="Все продукты">⋯</button>`;
    return `<div class="prod-pills">${pills}${more}</div>`;
  }

  function ensureLeadSelected() {
    if (!isLeadMode()) return;
    const divs = unique(teams.map((t) => t.division)).sort();
    if (!state.divisions.length || !divs.includes(state.divisions[0])) {
      state.divisions = [META.defaultDivision && divs.includes(META.defaultDivision) ? META.defaultDivision : divs[0]];
    } else {
      state.divisions = [state.divisions[0]];
    }
    if (state.mode === "region") {
      const regions = unique(
        teams.filter((t) => t.division === state.divisions[0]).map((t) => t.region)
      ).sort();
      if (!state.regions.length || !regions.includes(state.regions[0])) {
        state.regions = [
          META.defaultRegion && regions.includes(META.defaultRegion) ? META.defaultRegion : (regions[0] || "")
        ].filter(Boolean);
      } else {
        state.regions = [state.regions[0]];
      }
    }
    state.teams = [];
  }

  function renderDivOverview(kms) {
    ensureLeadSelected();
    const isRegion = state.mode === "region";
    const peerWord = isRegion ? "регионов" : "дивизионов";
    const peerWordGen = isRegion ? "регионов/управлений" : "дивизионов";
    const productCode = state.divProduct || null;
    const periodFrom = state.divPeriodFrom | 0;
    const nWeeks = periodWeeks(periodFrom);
    const periodLabel = periodFrom === 0
      ? "тек. неделя"
      : `с −${periodFrom} нед. (${nWeeks} нед.)`;

    const tabLab = $("#tab-divov-label");
    if (tabLab) tabLab.textContent = isRegion ? "Обзор региона" : "Обзор дивизиона";
    const helpRankBtn = document.querySelector('[data-help="rank"]');
    if (helpRankBtn) {
      helpRankBtn.setAttribute(
        "aria-label",
        isRegion ? "Методика: рейтинг команд" : "Методика: рейтинг регионов"
      );
    }

    const prodSel = $("#div-product-filter");
    if (prodSel && !prodSel.dataset.filled) {
      prodSel.innerHTML = `<option value="">Все продукты</option>` +
        PRODUCTS.map((p) => `<option value="${p.code}">${p.name}</option>`).join("");
      prodSel.dataset.filled = "1";
    }
    if (prodSel) prodSel.value = state.divProduct || "";
    const periodSel = $("#div-period-from");
    if (periodSel) periodSel.value = String(periodFrom);

    const myDiv = state.divisions[0];
    const myRegion = state.regions[0];
    const myPeerKey = isRegion ? myDiv + "|" + myRegion : myDiv;

    const divKms = allKms.filter((k) => state.divisions.includes(k.division));
    const sliceKms = isRegion
      ? divKms.filter((k) => k.region === myRegion)
      : divKms.filter((k) => !state.regions.length || state.regions.includes(k.region));

    const allDivNames = unique(allKms.map((k) => k.division)).sort();
    const regionUnits = networkRegionUnits();
    const peerUnits = isRegion
      ? regionUnits.map((u) => ({ key: u.key, label: u.label, list: u.list }))
      : allDivNames.map((d) => ({
          key: d,
          label: d,
          list: allKms.filter((k) => k.division === d)
        }));

    // ——— Block 1: coverage ———
    const cov = unitCoverageMetrics(sliceKms, productCode, periodFrom);
    const peerCovItems = peerUnits.map((u) => {
      const m = unitCoverageMetrics(u.list, productCode, periodFrom);
      return {
        key: u.key, label: u.label,
        rate: m.rate, ratePrev: m.ratePrev,
        rateAct: m.rateAct, rateActPrev: m.rateActPrev,
        actShare: m.actShare, actSharePrev: m.actSharePrev,
        perKm: m.perKm, perKmPrev: m.perKmPrev
      };
    });
    const rankedCov = rankUnits(peerCovItems, "rate", "ratePrev");
    const rankedCovAct = rankUnits(peerCovItems, "rateAct", "rateActPrev");
    const rankedActShare = rankUnits(peerCovItems, "actShare", "actSharePrev");
    const myCovRank = rankedCov.find((r) => r.key === myPeerKey) || { pos: "—", move: 0 };
    const myCovActRank = rankedCovAct.find((r) => r.key === myPeerKey) || { pos: "—", move: 0 };
    const myActShareRank = rankedActShare.find((r) => r.key === myPeerKey) || { pos: "—", move: 0 };
    const withPeerLabels = (ranked) => ranked.map((r) => {
      const u = peerUnits.find((x) => x.key === r.key);
      return { ...r, label: (u && u.label) || r.label || r.key };
    });
    cacheRank(
      "div-cov",
      `Рейтинг ${peerWordGen} · охват от клиентов · ${periodLabel}`,
      myPeerKey,
      withPeerLabels(rankedCov),
      (r) => pct(r.rate)
    );
    cacheRank(
      "div-cov-act",
      `Рейтинг ${peerWordGen} · охват от активированных · ${periodLabel}`,
      myPeerKey,
      withPeerLabels(rankedCovAct),
      (r) => pct(r.rateAct)
    );
    cacheRank(
      "div-act-share",
      `Рейтинг ${peerWordGen} · доля активированных · ${periodLabel}`,
      myPeerKey,
      withPeerLabels(rankedActShare),
      (r) => pct(r.actShare)
    );

    const rngCov = RNG(hash("div-trend|" + myPeerKey + "|" + (productCode || "ALL") + "|p" + periodFrom + "|" + sliceKms.length));
    const trendFloor = productCode ? 0.02 : 0.05;
    const weekPointRates = [];
    let wr = Math.max(trendFloor, Math.min(0.28, (cov.weekRates && cov.weekRates[cov.weekRates.length - 1]) || cov.rate));
    for (let i = 0; i < 5; i++) {
      weekPointRates.push(Math.max(trendFloor, Math.min(0.3, wr + (rngCov.f() - 0.5) * 0.04)));
    }
    weekPointRates.push(cov.weekRates ? cov.weekRates[cov.weekRates.length - 1] : wr);
    const displayRates = weekPointRates.map((_, i) => {
      if (periodFrom === 0) return weekPointRates[i];
      const from = Math.max(0, i - periodFrom);
      let unc = 1;
      for (let j = from; j <= i; j++) unc *= (1 - Math.min(0.95, weekPointRates[j]) * 0.82);
      return Math.min(0.92, 1 - unc);
    });
    displayRates[5] = cov.rate;
    const maxR = Math.max(...displayRates, 0.01);
    const covTipBase = productCode
      ? `Охват · ${productName(productCode)}`
      : "Охват клиентов коммуникациями";
    const cumNote = periodFrom > 0 ? " (накопит.)" : "";
    $("#div-cov-trend").innerHTML = displayRates.map((w, i) => {
      const lab = WEEK_LABS[i];
      const pp = Math.round(w * 1000) / 10;
      return `<div class="t-col tip" data-tip="${covTipBase}${cumNote} · ${lab}: ${pp}%">
        <div class="t-bar" style="height:${Math.max(8, Math.round(w / maxR * 72))}px"></div>
        <div class="t-val">${pp}%</div>
        <div class="t-lab">${lab}</div>
      </div>`;
    }).join("");

    const denClients = productCode ? "со склонностью" : "клиентов";
    const tipClients = productCode
      ? "Клиенты с коммуникацией по продукту / клиенты со склонностью к продукту"
      : "Клиенты с (чат ∨ УКП) / все клиенты банка в срезе (без проспектов)";
    const tipAct = productCode
      ? "Активированные с коммуникацией по продукту / активированные со склонностью"
      : "Активированные с (чат ∨ УКП) / все активированные в срезе";
    $("#div-cov-kpi").innerHTML = divKpiCard({
      tip: tipClients,
      label: "Охват от клиентов",
      valueHtml: pct(cov.rate),
      deltaHtmlStr: deltaHtml(cov.rateWowPp, " п.п."),
      rank: myCovRank.pos,
      move: myCovRank.move,
      rankKey: "div-cov",
      hint: `${fmt(cov.covered)} из ${fmt(cov.clients)} ${denClients} · ${periodLabel}`
    });
    $("#div-cov-kpi-act").innerHTML = divKpiCard({
      tip: tipAct,
      label: "Охват от активированных",
      valueHtml: pct(cov.rateAct),
      deltaHtmlStr: deltaHtml(cov.rateActWowPp, " п.п."),
      rank: myCovActRank.pos,
      move: myCovActRank.move,
      rankKey: "div-cov-act",
      hint: `${fmt(cov.coveredAct)} из ${fmt(cov.activated)} активированных · ${periodLabel}`
    });
    const tipShare = productCode
      ? "Активированные со склонностью к продукту / клиенты со склонностью"
      : "Активированные клиенты / все клиенты банка в срезе";
    $("#div-cov-kpi-share").innerHTML = divKpiCard({
      tip: tipShare,
      label: "Доля активированных",
      valueHtml: pct(cov.actShare),
      deltaHtmlStr: deltaHtml(cov.actShareWowPp, " п.п."),
      rank: myActShareRank.pos,
      move: myActShareRank.move,
      rankKey: "div-act-share",
      hint: `${fmt(cov.activated)} из ${fmt(cov.clients)} ${denClients} · ${periodLabel}`
    });

    // ——— Block 2: product comb ———
    const prodView = state.divProdView === "apps" ? "apps" : "comm";
    $all("[data-div-prod-view]").forEach((b) => {
      b.classList.toggle("active", b.dataset.divProdView === prodView);
    });
    const prodTitle = $("#div-prod-title");
    if (prodTitle) {
      prodTitle.textContent = prodView === "apps"
        ? "Продуктовое покрытие в заявках"
        : "Продуктовое покрытие в коммуникациях";
    }
    const rowsFn = prodView === "apps" ? productAppsRows : productCommRows;
    let prodRows = rowsFn(sliceKms, periodFrom).sort((a, b) => b.share - a.share || b.discussed - a.discussed);
    if (productCode) prodRows = prodRows.filter((r) => r.code === productCode);
    const prodByPeer = {};
    peerUnits.forEach((u) => {
      prodByPeer[u.key] = rowsFn(u.list, periodFrom);
    });
    const withRank = prodRows.map((row) => {
      const items = peerUnits.map((u) => {
        const found = (prodByPeer[u.key] || []).find((x) => x.code === row.code);
        return {
          key: u.key,
          label: u.label,
          share: found ? found.share : 0,
          sharePrev: found ? found.sharePrev : 0
        };
      });
      const ranked = rankUnits(items, "share", "sharePrev");
      cacheRank(
        "prod-" + row.code,
        `Рейтинг ${peerWordGen} · ${row.name} · ${periodLabel}`,
        myPeerKey,
        ranked.map((r) => {
          const u = peerUnits.find((x) => x.key === r.key);
          return { ...r, label: (u && u.label) || r.label || r.key };
        }),
        (x) => pct(x.share)
      );
      const mine = ranked.find((x) => x.key === myPeerKey) || { pos: "—", move: 0 };
      return { ...row, peerPos: mine.pos, peerMove: mine.move, rankKey: "prod-" + row.code };
    });
    const showN = productCode || state.divProdShowAll ? withRank.length : Math.min(5, withRank.length);
    const shown = withRank.slice(0, showN);
    const coverNoun = prodView === "apps" ? "в заявках" : "склонности";
    $("#div-prod-comb").innerHTML = shown.map((r) => {
      const w = Math.max(0, Math.min(100, Math.round(r.share * 100)));
      return `<div class="comb-row tip" data-tip="${r.name}: ${pct(r.share)} ${coverNoun} · ${fmt(r.discussed)} / ${fmt(r.inclined)} · ${r.peerPos}-е среди ${peerWord}">
        <div class="comb-name"><button type="button" class="comb-name-btn" data-prod-dyn="${r.code}" title="Динамика заявок и конверсии">${r.name}</button></div>
        <div class="comb-bar-wrap"><div class="comb-bar" style="width:${w}%"></div></div>
        <div class="comb-meta">
          <span class="pct">${pct(r.share)}</span>
          <span class="sub">${deltaHtml(r.wowPp, " п.п.")} · ${rankLinkHtml(r.peerPos, r.rankKey)} ${arrowHtml(r.peerMove)}</span>
        </div>
      </div>`;
    }).join("") || "<p class=\"note-line\">Нет данных по продуктам</p>";
    const moreBtn = $("#div-prod-more");
    if (moreBtn) {
      moreBtn.textContent = state.divProdShowAll ? "Свернуть" : `Ещё (${Math.max(0, withRank.length - 5)})`;
      moreBtn.hidden = !!productCode || withRank.length <= 5;
    }

    function unitAppsDealsConv(list) {
      let apps = 0, deals = 0;
      list.forEach((k) => {
        if (productCode && k.products && k.products[productCode]) {
          const pr = k.products[productCode];
          apps += pr.apps || pr.appsP1 || 0;
          deals += pr.deals || 0;
        } else if (!productCode) {
          apps += k.apps || 0;
          deals += k.deals || 0;
        }
      });
      return { apps, deals, rate: apps ? deals / apps : 0 };
    }
    function avgProductsPerComm(list) {
      let w = 0, s = 0;
      list.forEach((k) => {
        const c = coveredClientsOf(k, productCode);
        if (!c) return;
        const ppc = productCode ? 1 : (k.productsPerClient != null ? k.productsPerClient : 1.3);
        w += c;
        s += ppc * c;
      });
      return w ? +(s / w).toFixed(2) : 0;
    }
    function unitCommDigConv(list) {
      let covered = 0, dig = 0;
      list.forEach((k) => {
        const c = coveredClientsOf(k, productCode);
        covered += c;
        const digK = k.dealsDigital != null ? k.dealsDigital : Math.round((k.deals || 0) * 0.6);
        dig += productCode ? Math.round(digK * Math.min(1, c / Math.max(1, k.chat || k.weekCoveredClients || 1))) : digK;
      });
      return { covered, dig, rate: covered ? dig / covered : 0 };
    }

    const convApps = unitAppsDealsConv(sliceKms);
    const prodPer = avgProductsPerComm(sliceKms);
    const convDig = unitCommDigConv(sliceKms);

    function peerMetricItems(fn, seedKey) {
      return peerUnits.map((u) => {
        const m = fn(u.list);
        const seed = RNG(hash(seedKey + "|" + u.key + "|" + (productCode || "ALL") + "|p" + periodFrom));
        const wow = +((seed.f() * 4 - 1.5).toFixed(1));
        return { key: u.key, label: u.label, rate: m.rate, ratePrev: Math.max(0, m.rate - wow / 100), meta: m };
      });
    }

    const convAppsItems = peerMetricItems(unitAppsDealsConv, "divconvapps");
    const mineConvApps = convAppsItems.find((x) => x.key === myPeerKey);
    if (mineConvApps) {
      mineConvApps.rate = convApps.rate;
      const seed = RNG(hash("divconvapps|" + myPeerKey + "|p" + periodFrom));
      const wow = +((seed.f() * 4 - 1.5).toFixed(1));
      mineConvApps.ratePrev = Math.max(0, convApps.rate - wow / 100);
      mineConvApps.meta = convApps;
    }
    const rankedConvApps = rankUnits(convAppsItems, "rate", "ratePrev");
    const myConvAppsRank = rankedConvApps.find((r) => r.key === myPeerKey) || { pos: "—", move: 0 };
    cacheRank(
      "div-conv-apps",
      `Рейтинг ${peerWordGen} · конверсия заявок → сделки · ${periodLabel}`,
      myPeerKey,
      rankedConvApps.map((r) => {
        const u = peerUnits.find((x) => x.key === r.key);
        return { ...r, label: (u && u.label) || r.label || r.key };
      }),
      (r) => pct(r.rate)
    );

    const rngPpc = RNG(hash("divppc|" + myPeerKey + "|" + (productCode || "ALL") + "|p" + periodFrom));
    const ppcWow = +((rngPpc.f() * 0.25 - 0.1).toFixed(2));
    const ppcPrev = Math.max(productCode ? 0.8 : 1, prodPer - ppcWow);
    const ppcItems = peerUnits.map((u) => {
      const val = avgProductsPerComm(u.list);
      const seed = RNG(hash("divppc2|" + u.key + "|" + (productCode || "ALL") + "|p" + periodFrom));
      const wow = +((seed.f() * 0.25 - 0.1).toFixed(2));
      return { key: u.key, label: u.label, rate: val, ratePrev: Math.max(productCode ? 0.8 : 1, val - wow) };
    });
    const minePpc = ppcItems.find((x) => x.key === myPeerKey);
    if (minePpc) { minePpc.rate = prodPer; minePpc.ratePrev = ppcPrev; }
    const rankedPpc = rankUnits(ppcItems, "rate", "ratePrev");
    const myPpcRank = rankedPpc.find((r) => r.key === myPeerKey) || { pos: "—", move: 0 };
    cacheRank(
      "div-ppc",
      `Рейтинг ${peerWordGen} · продуктов на клиента в активностях · ${periodLabel}`,
      myPeerKey,
      rankedPpc.map((r) => {
        const u = peerUnits.find((x) => x.key === r.key);
        return { ...r, label: (u && u.label) || r.label || r.key };
      }),
      (r) => String(r.rate)
    );

    const convDigItems = peerMetricItems(unitCommDigConv, "divconvdig");
    const mineConvDig = convDigItems.find((x) => x.key === myPeerKey);
    if (mineConvDig) {
      mineConvDig.rate = convDig.rate;
      const seed = RNG(hash("divconvdig|" + myPeerKey + "|p" + periodFrom));
      const wow = +((seed.f() * 4 - 1.5).toFixed(1));
      mineConvDig.ratePrev = Math.max(0, convDig.rate - wow / 100);
      mineConvDig.meta = convDig;
    }
    const rankedConvDig = rankUnits(convDigItems, "rate", "ratePrev");
    const myConvDigRank = rankedConvDig.find((r) => r.key === myPeerKey) || { pos: "—", move: 0 };
    cacheRank(
      "div-conv-dig",
      `Рейтинг ${peerWordGen} · конверсия комм. → сделки в цифре · ${periodLabel}`,
      myPeerKey,
      rankedConvDig.map((r) => {
        const u = peerUnits.find((x) => x.key === r.key);
        return { ...r, label: (u && u.label) || r.label || r.key };
      }),
      (r) => pct(r.rate)
    );

    const convAppsWow = +(((convApps.rate - (mineConvApps ? mineConvApps.ratePrev : convApps.rate)) * 100).toFixed(1));
    const convDigWow = +(((convDig.rate - (mineConvDig ? mineConvDig.ratePrev : convDig.rate)) * 100).toFixed(1));

    const elConv = $("#div-prod-kpi-conv");
    const elPpc = $("#div-prod-kpi-ppc");
    const elCommConv = $("#div-prod-kpi-commconv");
    if (elConv) {
      elConv.innerHTML = divKpiCard({
        tip: TIPS.convAppsDeals,
        label: "Конверсия заявок в сделки",
        valueHtml: pct(convApps.rate),
        deltaHtmlStr: deltaHtml(convAppsWow, " п.п."),
        rank: myConvAppsRank.pos,
        move: myConvAppsRank.move,
        rankKey: "div-conv-apps",
        hint: `${fmt(convApps.deals)} / ${fmt(convApps.apps)} · ${periodLabel}`
      });
    }
    if (elPpc) {
      elPpc.innerHTML = divKpiCard({
        tip: TIPS.prodPerActivity,
        label: "Продуктов на клиента в активностях",
        valueHtml: String(prodPer),
        deltaHtmlStr: deltaHtml(ppcWow, ""),
        rank: myPpcRank.pos,
        move: myPpcRank.move,
        rankKey: "div-ppc",
        hint: `на ${fmt(cov.covered)} клиентов с коммуникацией · ${periodLabel}`
      });
    }
    if (elCommConv) {
      elCommConv.innerHTML = divKpiCard({
        tip: TIPS.convCommDigital,
        label: "Конверсия комм. → сделки в цифре",
        valueHtml: pct(convDig.rate),
        deltaHtmlStr: deltaHtml(convDigWow, " п.п."),
        rank: myConvDigRank.pos,
        move: myConvDigRank.move,
        rankKey: "div-conv-dig",
        hint: `${fmt(convDig.dig)} цифр. / ${fmt(convDig.covered)} с комм. · ${periodLabel}`
      });
    }

    // ——— Block 3: child ranking (regions in division / teams in region) ———
    $all("[data-div-metric]").forEach((b) => {
      b.classList.toggle("active", b.dataset.divMetric === state.divRankMetric);
    });

    const metric = state.divRankMetric;
    const th = $("#div-rank-metric-th");
    if (th) {
      th.textContent = metric === "perKm" ? "Кл. с комм. / КМ" : "Доля охвата";
      th.setAttribute("data-tip", metric === "perKm" ? TIPS.divPerKm : TIPS.divCovRank);
      th.classList.add("tip");
    }

    const rankTitle = $("#div-rank-title");
    if (rankTitle) rankTitle.textContent = isRegion ? "Рейтинг команд / отделов" : "Рейтинг регионов / управлений";
    const unitTh = $("#div-rank-unit-th");
    if (unitTh) unitTh.textContent = isRegion ? "Команда / отдел" : "Регион / управление";
    const moveTh = $("#div-rank-move-th");
    if (moveTh) {
      moveTh.setAttribute(
        "data-tip",
        isRegion
          ? "Изменение места в рейтинге внутри региона к прошлому периоду."
          : "Изменение места в рейтинге внутри дивизиона к прошлому периоду."
      );
    }

    const qMetricLabel = metric === "perKm" ? "кл. с комм. / КМ" : "доле охвата";
    const qUniverse = isRegion ? deptUnitsFrom(allKms) : regionUnits;
    const allQVals = [];
    const valByUnit = {};
    qUniverse.forEach((u) => {
      const m = unitCoverageMetrics(u.list, productCode, periodFrom);
      const v = metric === "perKm" ? m.perKm : m.rate;
      allQVals.push(v);
      valByUnit[u.key] = v;
    });

    function networkQuartile(value) {
      const n = allQVals.length;
      if (n <= 1) return 1;
      const below = allQVals.filter((v) => v < value).length;
      const equal = allQVals.filter((v) => v === value).length;
      const percentile = (below + equal * 0.5) / n;
      if (percentile >= 0.75) return 1;
      if (percentile >= 0.50) return 2;
      if (percentile >= 0.25) return 3;
      return 4;
    }
    function quartileHtml(q) {
      const stars = Math.max(1, Math.min(4, 5 - (q | 0)));
      const filled = "★".repeat(stars);
      const empty = "☆".repeat(4 - stars);
      const scope = isRegion ? "команд/отделов сети" : "управлений сети";
      return `<span class="quartile q-${q}" title="Квартиль ${q}/4 (${stars}★) по ${qMetricLabel} среди ${scope}" aria-label="${stars} из 4 звёзд">${filled}<span class="q-empty">${empty}</span></span>`;
    }

    const childUnits = isRegion
      ? deptUnitsFrom(sliceKms)
      : unique(divKms.map((k) => k.region)).sort().map((region) => ({
          key: region,
          label: region,
          list: divKms.filter((k) => k.region === region),
          qKey: myDiv + "|" + region
        }));

    const childItems = childUnits.map((u) => {
      const m = unitCoverageMetrics(u.list, productCode, periodFrom);
      const qKey = u.qKey || u.key;
      const netVal = valByUnit[qKey];
      const localVal = metric === "perKm" ? m.perKm : m.rate;
      return {
        key: u.key,
        list: u.list,
        rate: m.rate,
        ratePrev: m.ratePrev,
        perKm: m.perKm,
        perKmPrev: m.perKmPrev,
        covered: m.covered,
        clients: m.clients,
        kmN: m.kmN,
        rateWowPp: m.rateWowPp,
        perKmWowAbs: m.perKmWowAbs,
        quartile: networkQuartile(netVal != null ? netVal : localVal)
      };
    });
    const valueKey = metric === "perKm" ? "perKm" : "rate";
    const prevKey = metric === "perKm" ? "perKmPrev" : "ratePrev";
    const rankedChildren = rankUnits(childItems, valueKey, prevKey);

    const scopeName = isRegion ? "региона" : "дивизиона";
    const qScopeName = isRegion ? "команд/отделов сети" : "управлений сети";
    $("#div-rank-note").textContent = metric === "perKm"
      ? `Рейтинг внутри ${scopeName} по клиентам с комм. на 1 КМ. Квартиль — по той же метрике среди всех ${qScopeName} (${allQVals.length}). Период: ${periodLabel}.`
      : `Рейтинг внутри ${scopeName} по доле охвата. Квартиль — среди всех ${qScopeName} (${allQVals.length}). Период: ${periodLabel}.`;

    const qHeader = $("#div-rank-q-th");
    if (qHeader) {
      qHeader.setAttribute(
        "data-tip",
        isRegion
          ? (metric === "perKm"
            ? "Квартиль по кл. с комм. / КМ среди всех команд/отделов сети. ★★★★ = топ (1/4), ★ = низ (4/4)."
            : "Квартиль по доле охвата среди всех команд/отделов сети. ★★★★ = топ (1/4), ★ = низ (4/4).")
          : (metric === "perKm"
            ? "Квартиль по кл. с комм. / КМ среди всех управлений сети. ★★★★ = топ (1/4), ★ = низ (4/4)."
            : "Квартиль по доле охвата среди всех управлений сети. ★★★★ = топ (1/4), ★ = низ (4/4).")
      );
    }

    const emptyMsg = isRegion
      ? "Нет команд/отделов в выбранном регионе"
      : "Нет регионов в выбранном дивизионе";
    $("#div-rank-table tbody").innerHTML = rankedChildren.map((r) => {
      const val = metric === "perKm" ? r.perKm.toFixed(1) : pct(r.rate);
      const growth = metric === "perKm"
        ? deltaHtml(r.perKmWowAbs, "")
        : deltaHtml(r.rateWowPp, " п.п.");
      return `<tr data-region-key="${r.key.replace(/"/g, "&quot;")}">
        <td class="num">${r.pos}</td>
        <td>${r.key}<div class="muted small">${r.kmN} КМ · ${fmt(r.clients)} кл.</div></td>
        <td class="num">${val}</td>
        <td class="num">${growth}</td>
        <td class="num">${arrowHtml(r.move)}</td>
        <td class="num">${quartileHtml(r.quartile)}</td>
        <td>${topProductsForRegion(r.key, r.list, productCode, periodFrom, periodLabel)}</td>
      </tr>`;
    }).join("") || `<tr><td colspan="7">${emptyMsg}</td></tr>`;
  }

  function funnelSimpleRow(label, n, tip, max, prevN, lvl) {
    const conv = prevN ? Math.round((n / prevN) * 100) : 0;
    const w = Math.max(8, Math.round((n / Math.max(max, 1)) * 100));
    const lvlClass = lvl ? ` lvl-${lvl}` : "";
    return `<div class="funnel-row tip${lvlClass}" data-tip="${String(tip).replace(/"/g, "&quot;")}">
      <div class="funnel-label">${label}</div>
      <div class="funnel-bar-wrap"><div class="funnel-bar" style="width:${w}%"></div></div>
      <div class="funnel-nums"><strong>${fmt(n)}</strong>${prevN != null ? ` <span class="conv">${conv}%</span>` : ""}</div>
    </div>`;
  }

  function funnelCompositeRow(label, tip, parts, max) {
    const total = parts.reduce((s, p) => s + (p.n || 0), 0);
    const outerW = Math.max(10, Math.round((total / Math.max(max, 1)) * 100));
    const tipAll = parts.map((p) => `${p.label}: ${fmt(p.n)}`).join(" · ");
    const segs = parts.filter((p) => p.n > 0).map((p, i, arr) => {
      const sw = total ? Math.max(4, Math.round((p.n / total) * 100)) : 0;
      const solo = arr.length === 1 ? " solo" : "";
      return `<div class="funnel-seg tip${solo}" style="flex:0 0 ${sw}%;background:${p.color}" data-tip="${String(p.label).replace(/"/g, "&quot;")}: ${fmt(p.n)}">
        <span class="seg-n">${fmt(p.n)}</span>
      </div>`;
    }).join("");
    return `<div class="funnel-row tip" data-tip="${String(tip + " · " + tipAll).replace(/"/g, "&quot;")}">
      <div class="funnel-label">${label}</div>
      <div class="funnel-bar-wrap composite" style="width:${outerW}%;max-width:100%">${segs || `<div class="funnel-seg solo" style="flex:1;background:#d1d5db"><span class="seg-n">0</span></div>`}</div>
      <div class="funnel-nums"><strong>${fmt(total)}</strong></div>
    </div>`;
  }

  function renderOverview(kms, f) {
    const kpiRow = $("#kpi-row");
    if (kpiRow) { kpiRow.innerHTML = ""; kpiRow.classList.add("hidden"); }

    const clients = f.clients || Math.max(0, f.potential - (f.prospects || 0));
    const withComm = f.chat || 0;
    const consents = Math.min(withComm, f.consents != null ? f.consents : (f.accepted || 0));
    const appsParts = [
      { label: "Заявки в мастер-системе после согласия клиентов", n: f.appsMaster || 0, color: "#ef3124" },
      { label: "Заявки с лендингов", n: f.appsLanding || 0, color: "#f07167" },
      { label: "Лиды от ТМ", n: f.appsTm || 0, color: "#f59e0b" },
      { label: "Заявки ДБО", n: f.appsDbo || 0, color: "#3b82f6" }
    ];
    const dealParts = [
      { label: "Цифровые сделки", n: f.dealsDigital || 0, color: "#ef3124" },
      { label: "Сделки офлайн", n: f.dealsOffline || 0, color: "#6b7280" }
    ];
    const max = f.potential || 1;
    $("#funnel").innerHTML =
      funnelSimpleRow("1. Все клиенты и проспекты", f.potential, TIPS.potential, max, null, 1) +
      funnelSimpleRow("2. Все клиенты", clients, TIPS.allClients, max, f.potential, 2) +
      funnelSimpleRow("3. Клиенты с коммуникациями", withComm, TIPS.withComm, max, clients) +
      funnelSimpleRow("4. Согласия клиентов", consents, TIPS.consents, max, withComm) +
      funnelCompositeRow("5. Заявки (состав)", TIPS.appsComposite, appsParts, max) +
      funnelCompositeRow("6. Сделки (состав)", TIPS.dealsComposite, dealParts, max);

    const rankItems = (list, valFn, subFn) => {
      if (!list.length) return "<li>Нет данных</li>";
      return list.map((k, i) => `<li><span class="rank">${i + 1}</span><span class="nm">${k.name}</span><span class="val">${valFn(k)}</span><span class="sub">${subFn(k)}</span></li>`).join("");
    };
    const topBottom = (list, key, filterFn) => {
      const rows = filterFn ? list.filter(filterFn) : [...list];
      const top = [...rows].sort((a, b) => (b[key] || 0) - (a[key] || 0)).slice(0, 3);
      const bot = [...rows].sort((a, b) => (a[key] || 0) - (b[key] || 0)).slice(0, 3);
      return { top, bot };
    };

    const enriched = kms.map((k) => {
      const clientsN = k.clients || 0;
      const covered = k.weekCoveredClients != null ? k.weekCoveredClients : (k.chat || 0);
      const dig = k.dealsDigital != null ? k.dealsDigital : Math.round((k.deals || 0) * 0.6);
      return {
        ...k,
        _commCov: k.commCoverage != null ? k.commCoverage : (clientsN ? covered / clientsN : 0),
        _convDig: k.convCommDigital != null ? k.convCommDigital : (covered ? dig / covered : 0),
        _prodPen: k.productsPerClient != null ? k.productsPerClient : 0,
        _covered: covered,
        _dig: dig
      };
    });

    const comm = topBottom(enriched, "_commCov", (k) => (k.clients || 0) >= 15);
    const convDig = topBottom(enriched, "_convDig", (k) => (k._covered || 0) >= 3);
    const prodPen = topBottom(enriched, "_prodPen", (k) => (k._covered || 0) >= 3);

    const medComm = median(enriched.map((k) => k._commCov || 0));
    const medConv = median(enriched.filter((k) => k._covered >= 3).map((k) => k._convDig));
    const medProd = median(enriched.filter((k) => k._covered >= 3).map((k) => k._prodPen));

    $("#bench-note").textContent =
      `Медианы среза: охват комм. ${pct(medComm)} · конв. комм.→сделки в цифре ${pct(medConv)} · прод. проникновение ${medProd != null ? Number(medProd).toFixed(2) : "—"}`;

    $("#rank-comm-top").innerHTML = rankItems(comm.top, (k) => pct(k._commCov), (k) => `${fmt(k._covered)} / ${fmt(k.clients)} кл.`);
    $("#rank-comm-bot").innerHTML = rankItems(comm.bot, (k) => pct(k._commCov), (k) => `${fmt(k._covered)} / ${fmt(k.clients)} кл.`);
    $("#rank-convdig-top").innerHTML = rankItems(convDig.top, (k) => pct(k._convDig), (k) => `${fmt(k._dig)} цифр. / ${fmt(k._covered)} комм.`);
    $("#rank-convdig-bot").innerHTML = rankItems(convDig.bot, (k) => pct(k._convDig), (k) => `${fmt(k._dig)} цифр. / ${fmt(k._covered)} комм.`);
    $("#rank-prodpen-top").innerHTML = rankItems(prodPen.top, (k) => k._prodPen, (k) => `на клиента с комм. (${fmt(k._covered)})`);
    $("#rank-prodpen-bot").innerHTML = rankItems(prodPen.bot, (k) => k._prodPen, (k) => `на клиента с комм. (${fmt(k._covered)})`);

    renderUkpTrendChart("#trend", f, "net");
    renderAppsPathCharts({
      filter: "#apps-path-filter",
      legend: "#apps-path-legend",
      chart: "#apps-path-chart",
      note: "#apps-path-note"
    }, f, "net");
  }

  function renderUkpTrendChart(elId, f, seedKey) {
    const el = $(elId);
    if (!el) return;
    const rng = RNG(hash(ctxLine() + "|" + seedKey + "|trend"));
    let ukp = Math.max(5, f.deltaUkp - rng.int(10, 25));
    const weeks = [];
    for (let i = 0; i < 6; i++) { ukp = Math.max(4, ukp + rng.int(-4, 8)); weeks.push(ukp); }
    weeks[5] = f.deltaUkp;
    const maxU = Math.max(...weeks, 1);
    el.innerHTML = weeks.map((w, i) => `<div class="t-col tip" data-tip="Недельный flow отправок УКП · ${WEEK_LABS[i]}: ${w}">
      <div class="t-bar" style="height:${Math.max(6, Math.round(w / maxU * 72))}px"></div>
      <div class="t-val">${w}</div>
      <div class="t-lab">${WEEK_LABS[i]}</div>
    </div>`).join("");
  }

  function renderAppsPathCharts(ids, f, seedKey) {
    const legendEl = $(ids.legend);
    const chartEl = $(ids.chart);
    const noteEl = $(ids.note);
    const filtSel = $(ids.filter);
    if (!legendEl || !chartEl || !noteEl) return;

    const filt = state.appsPathFilter || "all";
    if (filtSel) filtSel.value = filt;
    // Доля клиентов с активными на неделе ЛПР в Alfa-boss
    const weekActRate = f.potential ? (f.abActiveWeek || 0) / f.potential : (f.abPenWeek || 0.4);
    const splitApps = (base) => {
      // P3 (органика AB) — только у активных на неделе ЛПР; без них = 0
      const p3Act = base.p3;
      const p3No = 0;
      // P1 (после УКП) — преимущественно у активных на неделе (работа с УКП в цифре)
      const p1Act = Math.round(base.p1 * Math.min(0.95, 0.55 + weekActRate * 0.4));
      const p1No = Math.max(0, base.p1 - p1Act);
      // P2 (КМ без УКП) — чаще у клиентов без активных на неделе ЛПР
      const p2No = Math.round(base.p2 * Math.min(0.92, 0.45 + (1 - weekActRate) * 0.45));
      const p2Act = Math.max(0, base.p2 - p2No);
      if (filt === "act") return { p1: p1Act, p2: p2Act, p3: p3Act };
      if (filt === "noact") return { p1: p1No, p2: p2No, p3: p3No };
      return { p1: base.p1, p2: base.p2, p3: base.p3 };
    };
    const curBase = splitApps({ p1: f.appsP1 || 0, p2: f.appsP2 || 0, p3: f.appsP3 || 0 });
    const filtLabel = filt === "act" ? "Акт. на нед." : filt === "noact" ? "Без акт. на нед." : "Все";
    const ar = RNG(hash(ctxLine() + "|" + seedKey + "|apps-path|" + filt));
    const pen = f.penetration || 0;
    const pathWeeks = [];
    let p1 = Math.max(0, curBase.p1 - ar.int(2, Math.max(3, Math.round(curBase.p1 * 0.35))));
    let p2 = Math.max(0, curBase.p2 - ar.int(1, Math.max(2, Math.round(curBase.p2 * 0.35) || 1)));
    // Для среза без активных на неделе органика всегда 0
    let p3 = filt === "noact" ? 0 : Math.max(0, curBase.p3 - ar.int(1, Math.max(2, Math.round(curBase.p3 * 0.4) || 1)));
    const orgBoost = filt === "act" ? 1.4 : filt === "noact" ? 0 : 1;
    for (let i = 0; i < 5; i++) {
      pathWeeks.push({ p1, p2, p3, total: p1 + p2 + p3, lab: WEEK_LABS[i] });
      p1 = Math.max(0, p1 + ar.int(-2, 4));
      p2 = Math.max(0, p2 + ar.int(-2, 2) - (filt === "act" ? ar.int(0, 1) : 0));
      if (filt === "noact") p3 = 0;
      else p3 = Math.max(0, Math.round(p3 + ar.int(-1, 2) + pen * ar.int(0, 3) * orgBoost));
    }
    pathWeeks.push({ p1: curBase.p1, p2: curBase.p2, p3: curBase.p3, total: curBase.p1 + curBase.p2 + curBase.p3, lab: WEEK_LABS[5] });
    const maxBar = Math.max(...pathWeeks.flatMap((w) => [w.p1, w.p2, w.p3]), 1);
    const maxTot = Math.max(...pathWeeks.map((w) => w.total), 1);
    const plotH = 120;
    const share = (n, tot) => (tot ? Math.round(n / tot * 100) : 0);
    const cur = pathWeeks[5];
    const prev = pathWeeks[4];
    const s3 = share(cur.p3, cur.total);
    const s3prev = share(prev.p3, prev.total);
    legendEl.innerHTML = `
      <span class="lg lg-p1 tip" data-tip="Заявки после УКП (путь P1). Левая шкала."><i></i>Из УКП <b>${cur.p1}</b> · ${share(cur.p1, cur.total)}%</span>
      <span class="lg lg-p2 tip" data-tip="Заявки, которые завёл КМ без УКП. Левая шкала."><i></i>КМ без УКП <b>${cur.p2}</b> · ${share(cur.p2, cur.total)}%</span>
      <span class="lg lg-p3 tip" data-tip="Органический трафик Alfa-boss — только у клиентов с активными на неделе ЛПР. Левая шкала."><i></i>Органика AB <b>${cur.p3}</b> · ${share(cur.p3, cur.total)}%</span>
      <span class="lg lg-tot tip" data-tip="Итого заявок за неделю. Правая шкала — маркеры с подписью."><i></i>Итого <b>${cur.total}</b></span>`;
    chartEl.innerHTML = pathWeeks.map((w) => {
      const h1 = Math.max(w.p1 ? 2 : 0, Math.round(w.p1 / maxBar * plotH));
      const h2 = Math.max(w.p2 ? 2 : 0, Math.round(w.p2 / maxBar * plotH));
      const h3 = Math.max(w.p3 ? 2 : 0, Math.round(w.p3 / maxBar * plotH));
      const totBottom = Math.round(w.total / maxTot * plotH);
      const tip = `${filtLabel} · ${w.lab}: всего ${w.total} · УКП ${w.p1} (${share(w.p1, w.total)}%) · КМ без УКП ${w.p2} (${share(w.p2, w.total)}%) · органика ${w.p3} (${share(w.p3, w.total)}%)`;
      return `<div class="ap-col tip" data-tip="${tip.replace(/"/g, "&quot;")}">
        <div class="ap-plot">
          <div class="ap-group">
            <div class="ap-bar p1" style="height:${h1}px" title="Из УКП: ${w.p1}"></div>
            <div class="ap-bar p2" style="height:${h2}px" title="КМ без УКП: ${w.p2}"></div>
            <div class="ap-bar p3" style="height:${h3}px" title="Органика AB: ${w.p3}"></div>
          </div>
          <div class="ap-marker" style="bottom:${totBottom}px">
            <span class="ap-marker-val">${w.total}</span>
            <span class="ap-marker-dot"></span>
          </div>
        </div>
        <div class="ap-lab">${w.lab}</div>
      </div>`;
    }).join("");
    const dOrg = s3 - s3prev;
    const filtNote = filt === "act"
      ? "Срез: клиенты с активными на неделе ЛПР в Alfa-boss."
      : filt === "noact"
        ? "Срез: клиенты без активных на неделе ЛПР (органика AB = 0)."
        : "Срез: все клиенты.";
    noteEl.textContent =
      `${filtNote} Активных ЛПР на неделе ${fmt(f.abActiveWeek || 0)} · доля органики (P3) ${s3}%` +
      (filt === "noact" || dOrg === 0 ? (filt === "noact" ? "" : " (без изменений к прошлой неделе)") : ` (${dOrg > 0 ? "+" : ""}${dOrg} п.п. к прошлой неделе)`) +
      `. Столбцы — пути (левая шкала), маркеры — итого (правая шкала).`;
  }

  function sig(t, v, h, tip) {
    const tipAttr = tip ? ` tip" data-tip="${String(tip).replace(/"/g, "&quot;")}` : "";
    return `<div class="signal${tipAttr}"><div class="s-title">${t}</div><div class="s-val">${v}</div><div class="s-hint">${h}</div></div>`;
  }

  function renderUkps(kms) {
    const prodFilter = state.products;
    let ukps = genUkps(kms.slice(0, 80), 5); // cap for performance on total network
    if (kms.length <= 40) ukps = genUkps(kms, 8);
    if (prodFilter.length) ukps = ukps.filter((u) => u.products.some((p) => prodFilter.includes(p)));
    if (state.statusFilter !== "ALL") ukps = ukps.filter((u) => u.status === state.statusFilter);
    if (state.ukpSearch.trim()) {
      const q = state.ukpSearch.trim().toLowerCase();
      ukps = ukps.filter((u) => u.client.toLowerCase().includes(q) || u.kmName.toLowerCase().includes(q) || u.id.toLowerCase().includes(q));
    }
    const active = ukps.filter((u) => ["sent", "viewed", "discuss"].includes(u.status)).length;
    const expired = ukps.filter((u) => u.status === "expired").length;
    const accepted = ukps.filter((u) => u.status === "accepted" || u.status === "done").length;
    const viewed = ukps.filter((u) => ["viewed", "discuss", "accepted", "done"].includes(u.status)).length;
    const withApp = ukps.filter((u) => u.hasApp).length;
    const withDeal = ukps.filter((u) => u.hasDeal).length;
    const n = ukps.length || 1;
    const viewRate = viewed / n;
    const acceptRate = accepted / n;
    const appRate = withApp / n;
    const dealRate = withDeal / n;
    const rng = RNG(hash("ukp-kpi|" + ctxLine() + "|" + state.statusFilter + "|" + state.ukpSearch));
    const wow = () => +((rng.f() * 18 - 6).toFixed(1));
    const wowPp = () => +((rng.f() * 3.2 - 1.2).toFixed(1));
    $("#ukp-kpis").innerHTML = [
      kpi("УКП направлено", ukps.length, "deltaUkp", "в выборке по фильтрам", { deltaPct: wow() }),
      kpi("Под активным УКП", active, "activeUkp", "держат клиента (TTL)", { deltaPct: wow() }),
      kpi("Конв. → просмотр", pct(viewRate), "chat", `${fmt(viewed)} / ${fmt(ukps.length)}`, { deltaPp: wowPp() }),
      kpi("Конв. → акцепт", pct(acceptRate), "convAcc", `${fmt(accepted)} / ${fmt(ukps.length)}`, { deltaPp: wowPp() }),
      kpi("Конв. → заявка", pct(appRate), "convApp", `${fmt(withApp)} / ${fmt(ukps.length)}`, { deltaPp: wowPp() }),
      kpi("Конв. → сделка", pct(dealRate), "convDeal", `${fmt(withDeal)} / ${fmt(ukps.length)}`, { deltaPp: wowPp() }),
      kpi("Деактивировано", expired, "expired", "истекли без действия", { deltaPct: wow() })
    ].join("");
    $("#ukp-table tbody").innerHTML = ukps.slice(0, 250).map((u) => `<tr>
      <td><code>${u.id}</code><div class="muted small">${u.sentAt}</div></td>
      <td>${u.kmName}</td>
      <td>${u.client}<div class="muted small">${u.clientType === "client" ? "Клиент" : "Проспект"} · ${u.lpr}</div></td>
      <td>${u.products.map(productName).join(", ")}</td>
      <td><span class="badge st-${u.status}">${ukpStatusLabel(u.status)}</span></td>
      <td class="small">${u.viewedAt || "—"}</td>
      <td class="num">${["sent","viewed","discuss"].includes(u.status) ? u.ttlLeft + " дн." : "—"}</td>
      <td class="small">${u.hasApp ? "заявка" : "—"} / ${u.hasDeal ? "сделка" : "—"}</td>
    </tr>`).join("") || `<tr><td colspan="8">Нет данных</td></tr>`;
  }

  function renderProducts(kms) {
    const codes = state.products.length ? state.products : PRODUCTS.map((p) => p.code);
    const rows = codes.map((code) => {
      const meta = PRODUCTS.find((p) => p.code === code);
      let pot = 0, act = 0, avail = 0, dlt = 0, exp = 0, sent = 0, acc = 0, ap1 = 0, apps = 0, deals = 0;
      const pipe = { sent: 0, viewed: 0, discuss: 0, accepted: 0 };
      kms.forEach((k) => {
        const x = k.products[code];
        if (!x) return;
        pot += x.potential; act += x.active; avail += x.available; dlt += x.deltaUkp;
        exp += x.expired; sent += x.sentTotal; acc += x.accepted; ap1 += x.appsP1;
        apps += x.apps; deals += x.deals;
        pipe.sent += x.pipe.sent; pipe.viewed += x.pipe.viewed;
        pipe.discuss += x.pipe.discuss; pipe.accepted += x.pipe.accepted;
      });
      const convA = sent ? acc / sent : 0;
      const convApp = sent ? ap1 / sent : 0;
      const convD = sent ? deals / sent : 0;
      const fLocal = { convDeal: convD, pipe };
      const fc = forecastDeals(fLocal);
      return { meta, pot, act, avail, dlt, exp, convA, convApp, convD, apps, deals, fc };
    }).sort((a, b) => b.dlt - a.dlt);

    $("#prod-table tbody").innerHTML = rows.map((r) => `<tr>
      <td><div class="km-name">${r.meta.name}</div><div class="muted small">${r.meta.group}</div></td>
      <td class="num">${r.pot}</td><td class="num">${r.act}</td><td class="num">${r.avail}</td>
      <td class="num">${r.dlt}</td>
      <td class="num">${pct(r.convA)}</td><td class="num">${pct(r.convApp)}</td><td class="num">${pct(r.convD)}</td>
      <td class="num">${r.exp}</td>
      <td class="num">${r.apps} · ${r.deals}</td>
      <td class="num">${r.fc.fromPipe}</td>
    </tr>`).join("");
  }

  function renderForecast(kms, f) {
    const fc = forecastDeals(f);
    const weekForecast = Math.max(0.1, +(f.deltaUkp * f.convDeal).toFixed(1));
    const weekFact = f.deltaDeals;
    const factVsForecastPct = weekForecast > 0 ? +((weekFact / weekForecast) * 100).toFixed(0) : 0;
    $("#forecast-kpis").innerHTML = [
      kpi("Конв. → акцепт", pct(fc.baseConvAccept), "convAcc", `${fmt(f.accepted)} / ${fmt(f.sentTotal)}`, { deltaPp: f.convAcceptWowPct }),
      kpi("Конв. → заявка", pct(fc.baseConvApp), "convApp", `${fmt(f.appsP1)} / ${fmt(f.sentTotal)}`, { deltaPp: f.convAppWowPct }),
      kpi("Конв. → сделка", pct(fc.baseConvDeal), "convDeal", `${fmt(f.dealsFromUkp)} / ${fmt(f.sentTotal)}`, { deltaPp: f.convDealWowPct }),
      kpi("Прогноз сделок", fc.fromPipe, "forecast", "по клиентам с коммуникацией", { deltaPct: f.forecastWowPct }),
      kpi("Ёмкость → сделки", fc.fromCapacity, "available", "если закрыть «доступно»", { deltaPct: f.availableWowPct }),
      kpi("Прогноз vs Факт", `${weekFact} / ${weekForecast}`, "forecastVsFact", "отчетная неделя", { ratioPct: factVsForecastPct }),
      kpi("Итого при дожиме", fc.totalIfPush, "forecast", "пайплайн + ёмкость", { deltaPct: f.forecastWowPct })
    ].join("");

    const rows = [
      ["Отправлено (ждут просмотра)", f.pipe.sent, PIPE_WEIGHT.sent],
      ["Просмотрено", f.pipe.viewed, PIPE_WEIGHT.viewed],
      ["В обсуждении", f.pipe.discuss, PIPE_WEIGHT.discuss],
      ["Акцептовано (без сделки)", f.pipe.accepted, PIPE_WEIGHT.accepted]
    ];
    $("#forecast-pipeline").innerHTML = `<table><thead><tr>
      <th>Статус пайплайна</th><th class="num">ЮЛ</th><th class="num">Вес</th><th class="num">Вклад в прогноз</th>
    </tr></thead><tbody>${rows.map(([l, n, w]) => {
      const contrib = +(n * w * fc.baseConvDeal / 0.85).toFixed(2);
      return `<tr><td>${l}</td><td class="num">${n}</td><td class="num">${Math.round(w * 100)}%</td><td class="num">${contrib}</td></tr>`;
    }).join("")}
    <tr><td><b>Итого</b></td><td></td><td></td><td class="num"><b>${fc.fromPipe}</b></td></tr>
    </tbody></table>`;

    $("#forecast-capacity").innerHTML = `
      <p>Доступно к новой отправке: <b>${fmt(f.available)}</b></p>
      <p>При средней конверсии в сделку <b>${pct(fc.baseConvDeal)}</b> ожидаем ≈ <b>${fc.fromCapacity}</b> сделок, если команда закроет весь пул УКП.</p>
      <p class="muted small">Это верхняя оценка сценария «дожим ёмкости», без учёта TTL и качества сегментации.</p>`;

    $("#forecast-note").textContent =
      `Формула пайплайна: Σ(N_статус × вес_статуса × конв_сделка_среза / 0.85). Веса: отправлено ${PIPE_WEIGHT.sent}, просмотр ${PIPE_WEIGHT.viewed}, обсуждение ${PIPE_WEIGHT.discuss}, акцепт ${PIPE_WEIGHT.accepted}.`;
  }

  function renderProductDesk(kms, f) {
    const fc = forecastDeals(f);
    const weekForecast = Math.max(0.1, +(f.deltaUkp * f.convDeal).toFixed(1));
    const weekFact = f.deltaDeals;
    const factVsForecastPct = weekForecast > 0 ? +((weekFact / weekForecast) * 100).toFixed(0) : 0;
    const pdeskKpis = $("#pdesk-kpis");
    if (pdeskKpis) { pdeskKpis.innerHTML = ""; pdeskKpis.classList.add("hidden"); }

    const stages = [
      { l: "L1 · Клиентская база", n: f.potential, tip: TIPS.potential },
      { l: "L2 · С меткой БОСС", n: f.withAb, tip: TIPS.withAb },
      { l: "УКП направлено (учёт)", n: f.sentTotal, tip: TIPS.sentTotal },
      { l: "Акцепт", n: f.accepted, tip: TIPS.convAcc },
      { l: "Заявка P1", n: f.appsP1, tip: TIPS.convApp },
      { l: "Сделка (из УКП)", n: f.dealsFromUkp, tip: TIPS.convDeal }
    ];
    const max = stages[0].n || 1;
    $("#pdesk-funnel").innerHTML = stages.map((s, i) => {
      const prev = i ? stages[i - 1].n : s.n;
      const conv = prev ? Math.round(s.n / prev * 100) : 0;
      return `<div class="funnel-row tip" data-tip="${s.tip.replace(/"/g, "&quot;")}"><div class="funnel-label">${s.l}</div>
        <div class="funnel-bar-wrap"><div class="funnel-bar" style="width:${Math.max(8, Math.round(s.n / max * 100))}%"></div></div>
        <div class="funnel-nums"><strong>${fmt(s.n)}</strong> ${i ? `<span class="conv">${conv}%</span>` : ""}</div></div>`;
    }).join("");

    const spam = kms.filter((k) => k.spamFlag).length;
    $("#pdesk-signals").innerHTML = [
      sig("Проникновение Alfa-boss", pct(f.penetration), "чем выше — тем полезнее инструмент", TIPS.penetration),
      sig("Слабое качество УКП в сети", `${spam} КМ`, "много отправок, мало акцептов", TIPS.convAcc),
      sig("Доступная ёмкость", fmt(f.available), "ёмкость базы", TIPS.available),
      sig("Истечения", fmt(f.expired), "оффер / ЛПР", TIPS.expired)
    ].join("");
    $("#pdesk-forecast").innerHTML = [
      kpi("Прогноз сделок", fc.fromPipe, "forecast", "по клиентам с коммуникацией", { deltaPct: f.forecastWowPct }),
      kpi("Ёмкость → сделки", fc.fromCapacity, "available", "если закрыть «доступно»", { deltaPct: f.availableWowPct }),
      kpi("Прогноз vs Факт", `${weekFact} / ${weekForecast}`, "forecastVsFact", "отчетная неделя", { ratioPct: factVsForecastPct })
    ].join("");

    renderUkpTrendChart("#pdesk-trend", f, "pdesk");
    renderAppsPathCharts({
      filter: "#pdesk-apps-path-filter",
      legend: "#pdesk-apps-path-legend",
      chart: "#pdesk-apps-path-chart",
      note: "#pdesk-apps-path-note"
    }, f, "pdesk");
  }

  function renderPdiv(kms) {
    const byDiv = {};
    kms.forEach((k) => {
      if (!byDiv[k.division]) byDiv[k.division] = [];
      byDiv[k.division].push(k);
    });
    const rows = Object.keys(byDiv).sort().map((d) => {
      const list = byDiv[d];
      const f = funnelFor(list);
      const fc = forecastDeals(f);
      return { d, n: list.length, f, fc };
    }).sort((a, b) => b.f.deltaUkp - a.f.deltaUkp);

    $("#pdiv-table tbody").innerHTML = rows.map((r) => `<tr>
      <td>${r.d}</td>
      <td class="num">${r.n}</td>
      <td class="num">${fmt(r.f.potential)}</td>
      <td class="num tip" data-tip="${TIPS.penetration}">${pct(r.f.penetration)}</td>
      <td class="num">${r.f.deltaUkp}</td>
      <td class="num">${pct(r.f.convAccept)}</td>
      <td class="num">${pct(r.f.convApp)}</td>
      <td class="num">${pct(r.f.convDeal)}</td>
      <td class="num">${r.f.deals}</td>
      <td class="num">${r.fc.fromPipe}</td>
    </tr>`).join("");
  }

  function render() {
    const netTabs = $("#tabs-network");
    const prodTabs = $("#tabs-product");
    const divTabs = $("#tabs-division");
    const mgrTab = $("#tab-mgr");
    if (state.mode === "network") {
      netTabs.classList.remove("hidden");
      prodTabs.classList.add("hidden");
      divTabs.classList.add("hidden");
      if (["pdesk", "pdiv", "pqual", "divov", "mgr"].includes(state.tab)) state.tab = "overview";
    } else if (state.mode === "product") {
      netTabs.classList.add("hidden");
      prodTabs.classList.remove("hidden");
      divTabs.classList.add("hidden");
      if (["overview", "ukp", "kms", "products", "divov", "mgr"].includes(state.tab)) state.tab = "pdesk";
    } else if (isLeadMode()) {
      netTabs.classList.add("hidden");
      prodTabs.classList.add("hidden");
      divTabs.classList.remove("hidden");
      ensureLeadSelected();
      if (mgrTab) mgrTab.classList.toggle("hidden", state.mode !== "region");
      const leadOk = state.mode === "region" ? ["divov", "mgr"] : ["divov"];
      if (!leadOk.includes(state.tab)) state.tab = "divov";
    }

    syncFilters();
    const kms = filteredKms();
    const f = funnelFor(kms);
    renderHeader(kms, f);

    $all(".mode-btn").forEach((b) => b.classList.toggle("active", b.dataset.mode === state.mode));
    $all(".tab").forEach((t) => t.classList.toggle("active", t.dataset.tab === state.tab));
    $all(".panel").forEach((p) => p.classList.toggle("active", p.id === "panel-" + state.tab));

    // tools only on overview of lead modes
    const tools = $("#tabs-division .tabs-tools");
    if (tools) tools.hidden = !(isLeadMode() && state.tab === "divov");

    if (state.tab === "overview") renderOverview(kms, f);
    else if (state.tab === "ukp") renderUkps(kms);
    else if (state.tab === "kms") {
      $("#kms-note").textContent = `КМ: ${kms.length}. Конверсии от отправленных УКП. Статус «Слабое качество УКП» — много отправок при конв. в акцепт < 12%.`;
      $("#kms-table-wrap").innerHTML = kmTableHtml(kms);
    } else if (state.tab === "products") renderProducts(kms);
    else if (state.tab === "forecast") renderForecast(kms, f);
    else if (state.tab === "pdesk") renderProductDesk(kms, f);
    else if (state.tab === "pdiv") renderPdiv(kms);
    else if (state.tab === "pqual") {
      state.sortKm = "spam";
      $("#pqual-wrap").innerHTML = kmTableHtml(kms.filter((k) => k.sentTotal >= 8).sort((a, b) => a.convAccept - b.convAccept), 50);
    } else if (state.tab === "divov") renderDivOverview(kms);
    else if (state.tab === "mgr") renderManagers(kms);
  }

  function bind() {
    bindMulti($("#ms-division"), () => {
      if (isLeadMode()) return;
      applyFilterReads();
      state.regions = [];
      state.teams = [];
      render();
    });
    $("#ms-division").addEventListener("change", (e) => {
      if (e.target && e.target.id === "division-single") {
        state.divisions = [e.target.value];
        state.regions = [];
        state.teams = [];
        render();
      }
    });
    bindMulti($("#ms-region"), () => {
      if (state.mode === "region") return;
      applyFilterReads();
      state.teams = [];
      render();
    });
    $("#ms-region").addEventListener("change", (e) => {
      if (e.target && e.target.id === "region-single") {
        state.regions = [e.target.value];
        state.teams = [];
        render();
      }
    });
    bindMulti($("#ms-team"), () => {
      if (state.mode === "region") return;
      applyFilterReads();
      render();
    });
    bindMulti($("#ms-product"), () => { applyFilterReads(); render(); });

    $("#btn-all-div").addEventListener("click", () => {
      if (isLeadMode()) return;
      state.divisions = [];
      state.regions = [];
      state.teams = [];
      render();
    });
    $("#btn-reset").addEventListener("click", () => {
      state.divisions = [META.defaultDivision];
      state.regions = [META.defaultRegion];
      state.teams = [META.defaultTeamPrefix];
      state.products = [];
      state.mode = "network";
      state.tab = "overview";
      render();
    });

    $all(".mode-btn").forEach((b) => b.addEventListener("click", () => {
      state.mode = b.dataset.mode;
      if (state.mode === "product" && !state.products.length) state.products = ["ACQ_POS"];
      if (state.mode === "division") {
        state.products = [];
        state.teams = [];
        state.regions = [];
        if (!state.divisions.length) state.divisions = [META.defaultDivision];
        if (state.divisions.length > 1) state.divisions = [state.divisions[0]];
        state.tab = "divov";
      }
      if (state.mode === "region") {
        state.products = [];
        state.teams = [];
        if (!state.divisions.length) state.divisions = [META.defaultDivision];
        if (state.divisions.length > 1) state.divisions = [state.divisions[0]];
        if (!state.regions.length) state.regions = [META.defaultRegion];
        if (state.regions.length > 1) state.regions = [state.regions[0]];
        state.tab = "divov";
      }
      render();
    }));

    $all(".tab").forEach((btn) => btn.addEventListener("click", () => {
      state.tab = btn.dataset.tab;
      render();
    }));

    $("#ukp-status").addEventListener("change", (e) => { state.statusFilter = e.target.value; render(); });
    $("#ukp-search").addEventListener("input", (e) => { state.ukpSearch = e.target.value; render(); });
    $("#apps-path-filter").addEventListener("change", (e) => { state.appsPathFilter = e.target.value; render(); });
    $("#pdesk-apps-path-filter").addEventListener("change", (e) => { state.appsPathFilter = e.target.value; render(); });

    const divProdFilter = $("#div-product-filter");
    if (divProdFilter) {
      divProdFilter.addEventListener("change", (e) => {
        state.divProduct = e.target.value || "";
        render();
      });
    }
    const divPeriod = $("#div-period-from");
    if (divPeriod) {
      divPeriod.addEventListener("change", (e) => {
        state.divPeriodFrom = Math.max(0, Math.min(5, parseInt(e.target.value, 10) || 0));
        render();
      });
    }
    $all("[data-div-metric]").forEach((btn) => {
      btn.addEventListener("click", () => {
        state.divRankMetric = btn.dataset.divMetric;
        render();
      });
    });
    $all("[data-div-prod-view]").forEach((btn) => {
      btn.addEventListener("click", () => {
        state.divProdView = btn.dataset.divProdView === "apps" ? "apps" : "comm";
        render();
      });
    });
    const divMore = $("#div-prod-more");
    if (divMore) {
      divMore.addEventListener("click", () => {
        state.divProdShowAll = !state.divProdShowAll;
        render();
      });
    }

    document.body.addEventListener("click", (e) => {
      const helpBtn = e.target.closest("[data-help]");
      if (helpBtn && helpBtn.classList.contains("help-btn")) {
        e.preventDefault();
        openHelp(helpBtn.dataset.help);
        return;
      }
      if (e.target.closest("[data-help-close]")) {
        closeHelp();
        return;
      }
      if (e.target.closest("[data-rank-close]")) {
        closeRankPopup();
        return;
      }
      const rankOpen = e.target.closest("[data-rank-open]");
      if (rankOpen) {
        e.preventDefault();
        openRankPopup(rankOpen.dataset.rankOpen, rankOpen.dataset.rankHighlight || null);
        return;
      }
      const prodAll = e.target.closest("[data-prod-all]");
      if (prodAll) {
        e.preventDefault();
        openRegionProductsPopup(prodAll.dataset.prodAll);
        return;
      }
      const prodDyn = e.target.closest("[data-prod-dyn]");
      if (prodDyn) {
        e.preventDefault();
        const code = prodDyn.dataset.prodDyn;
        const slice = filteredKms();
        openProductDynamicsPopup(code, slice);
        return;
      }
      const mgrSort = e.target.closest("[data-mgr-sort]");
      if (mgrSort) {
        e.preventDefault();
        const key = mgrSort.dataset.mgrSort;
        if (state.mgrSort === key) state.mgrSortDir = state.mgrSortDir === "desc" ? "asc" : "desc";
        else {
          state.mgrSort = key;
          state.mgrSortDir = key === "name" ? "asc" : "desc";
        }
        render();
        return;
      }
      const sortBtn = e.target.closest("[data-sort]");
      if (sortBtn) { state.sortKm = sortBtn.dataset.sort; render(); }
    });
    document.addEventListener("keydown", (e) => {
      if (e.key === "Escape") {
        closeHelp();
        closeRankPopup();
      }
    });

    // tooltips
    const bubble = $("#tip-bubble");
    document.body.addEventListener("mouseover", (e) => {
      const t = e.target.closest("[data-tip]");
      if (!t) return;
      bubble.textContent = t.getAttribute("data-tip");
      bubble.hidden = false;
      const r = t.getBoundingClientRect();
      let left = r.left + window.scrollX;
      let top = r.bottom + window.scrollY + 8;
      bubble.style.left = left + "px";
      bubble.style.top = top + "px";
      const br = bubble.getBoundingClientRect();
      if (br.right > window.innerWidth - 8) bubble.style.left = (window.innerWidth - br.width - 8 + window.scrollX) + "px";
    });
    document.body.addEventListener("mouseout", (e) => {
      const t = e.target.closest("[data-tip]");
      if (t) bubble.hidden = true;
    });
  }

  document.addEventListener("DOMContentLoaded", () => {
    $("#net-stats").textContent = `Сеть: ${teams.length} команд · ${allKms.length} КМ · мультивыбор фильтров · пустой дивизион = total`;
    bind();
    render();
  });
})();
