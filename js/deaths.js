addLayer("d", {
    name: "deaths",
    symbol: "D",
    position: 2,
    startData() { return {
        points: decimalZero,
        best: decimalZero,
        total: decimalZero,
        auto: false,
        autob: false,
        autos: false,
        unlocked: false,
        time: decimalZero
    }},
    color: "#ff1234",
    requires: new Decimal(1.797e308),
    resource: "deaths",
    resourceSingular: "death",
    baseResource: "severity",
    baseAmount() { return player.s.severity },
    type: "normal",
    exponent: new Decimal(0.0035),
    branches: ["i","r","s"],
    row: 2,
    hotkeys: [
        {
            key:"d", description: "D:Reset for deaths", onPress() {
                if (canReset(this.layer) && !hasMilestone("d",10))
                    doReset(this.layer)
            }
        },
    ],
    bulk() {
        let bulk = new Decimal(100)
        if (hasAchievement("a", 53)) bulk = bulk.mul(5)
        if (hasMilestone("f", 8)) bulk = bulk.mul(100)
        if (hasFUpg(73)) bulk = bulk.mul(1000)
        if (hasFUpg(123)) bulk = bulk.pow(2)
        if (hasFUpg(143)) bulk = bulk.pow(10)
        if (hasUpgrade("e",15)) bulk = bulk.tetrate(1.79e308)
        return bulk
    },
    speed() {
        let speed = 1
        if (hasAchievement("a", 53)) speed *=2
        if (hasFUpg(73)) speed *=2
        if (hasMilestone("a", 0)) speed *=2
        if (hasMilestone("a", 1)) speed *=2
        if (hasMilestone("e", 0)) speed *=2
        return speed
    },
    update(diff) {
        if (hasMilestone("d", 10) && !inChallenge("f",31) && !inChallenge("Up",21)) generatePoints("d", diff/100);
        let t = diff*tmp.d.speed
        player.d.time = Decimal.add(player.d.time, t)
            if (player.d.time.gte(1)) {
                let times = Decimal.floor(player.d.time).mul(-1)
                player.d.time = Decimal.add(player.d.time, times)
                times = times.mul(-1)
                if (hasUpgrade("f", 25) && tmp.d.speed<20) {
                    layers.d.buyables[11].buyMax(times.mul(tmp.d.bulk))
                    layers.d.buyables[12].buyMax(times.mul(tmp.d.bulk))
                    layers.d.buyables[13].buyMax(times.mul(tmp.d.bulk))
                }
            };
        if (hasUpgrade("f", 25) && tmp.d.speed>20) {
            let s = player.d.points.max(1)
            let target = Decimal.log10(s.div(Decimal.pow(10,17000)).max(10).log10().div(1000)).div(Decimal.log10(tmp.d.buyables[13].scalebase))
            let d = tmp.d.buyables[13].distant
                if (target.gte(d)) target = target.div(d).pow(0.4).mul(d)
                target = target.ceil()
            player.d.buyables[11] = player.d.buyables[11].add(Decimal.log10(s.div(Decimal.pow(10,16000))).div(Decimal.log10(tmp.d.buyables[11].scalebase)).pow(2/3).ceil().sub(player.d.buyables[11]).min(tmp.d.bulk)).max(player.d.buyables[11])
            player.d.buyables[12] = player.d.buyables[12].add(Decimal.log10(s.div(Decimal.pow(10,17000))).div(Decimal.log10(tmp.d.buyables[12].scalebase)).pow(2/3).ceil().sub(player.d.buyables[12]).min(tmp.d.bulk)).max(player.d.buyables[12])
            player.d.buyables[13] = player.d.buyables[13].add(target.sub(player.d.buyables[13]).min(tmp.d.bulk)).max(player.d.buyables[13])
        }
    },
    layerShown() {
        let shown = hasSUpg(33)
        if(player.d.unlocked) shown = true
        return shown && player.uv.tree == "normal"
    },
    effect() {
        let eff = player.d.best.add(1).max(1)
        eff = eff.pow(5)
        if (eff.gte(Decimal.pow(10,Decimal.pow(10,1000)))) eff = eff.log10().pow(Decimal.pow(10,997))
        return eff
    },
    effectDescription() {
        return "which "+pluralize(player.d.points,'boosts','boost',true)+" cases, VP, infectivity, and severity gain by "+layerText("h2", "d", format(tmp.d.effect)) + " (based on best)."
    },
    gainMult() {
        let mult = decimalOne
        if (inChallenge("ct",32)) {
            mult = mult.mul(10).mul(tmp.Ur.buyables[13].effect).mul(tmp.Up.effect[0])
            if (hasMilestone("Ur",4)) mult = mult.mul(100)
            if (hasMilestone("Ur",6)) mult = mult.mul(tmp.Ur.milestones[6].effect)
        }
        else {if (hasDUpg(12)) mult = mult.mul(getDUpgEff(12))
        if (hasDUpg(22)) mult = mult.mul(getDUpgEff(22))
        if (hasDUpg(24)) mult = mult.mul(getDUpgEff(24))
        if (hasFUpg(23)) mult = mult.mul(getFUpgEff(23))
        if (hasFUpg(45)) mult = mult.mul(getFUpgEff(45))
        if (hasAchievement("a", 43)) mult = mult.mul(2)
        if (hasAchievement("a", 44)) mult = mult.mul(2)
        mult = mult.mul(tmp.f.effect2)
        if (hasAchievement("a", 52)) mult = mult.mul(tmp.a.effect)
        mult = mult.mul(tmp.d.buyables[12].effect)
        if (hasChallenge("s", 12)) mult = mult.mul(challengeEffect("s", 12))
        mult.mul(tmp.ct.effect)
        }
        return mult
    },
    doReset(resettingLayer){
        let keep = [];
        if (hasMilestone("d", 0)) player.u.auto = true
        if (hasMilestone("f", 1) || hasMilestone("a",1)) keep.push("milestones")
        if (hasMilestone("f", 3) || hasMilestone("a",1)) keep.push("upgrades")
        if (layers[resettingLayer].row > this.row) layerDataReset(this.layer, keep)
        if (hasMilestone("f", 0) || hasMilestone("a",1)) {
            player.d.auto = true
            player.d.autos = true
            if (!hasMilestone("f",1) && !hasMilestone("a",1)) player.d.milestones = [0,1,2,3,4]
        }
    },
    tabFormat: {
        "Milestones": {
            content: [
                function() {if (player.tab == "d") return "main-display"},
            function() {if (!hasMilestone("d", 10)) return "prestige-button"},
            ["raw-html", function() {if (hasMilestone("d",10) && player.tab == "d") return "You are gaining " + layerText("h2", "d", format(getResetGain("d").div(100))) + " "+pluralize(getResetGain("d").div(100),'death','deaths')+" per second"}],
            function() {if (player.tab == "d") return "resource-display"},
            "blank",
            ["display-text",
            "Deaths reset all previous progress.",
            ],
            "milestones"
            ]
        },
        "Upgrades": {
            content: [
                function() {if (player.tab == "d") return "main-display"},
                function() {if (!hasMilestone("d", 10)) return "prestige-button"},
                ["raw-html", function() {if (hasMilestone("d",10) && player.tab == "d") return "You are gaining " + layerText("h2", "d", format(getResetGain("d").div(100))) + " "+pluralize(getResetGain("d").div(100),'death','deaths')+" per second"}],
                function() {if (player.tab == "d") return "resource-display"},
                "blank",
                ["display-text",
                "Deaths reset all previous progress.",
                ],
                "upgrades",
            ],
            unlocked() { return hasMilestone("d", 2) }
        },
        "Buyables": {
            content: [
                function() {if (player.tab == "d") return "main-display"},
                function() {if (!hasMilestone("d", 10)) return "prestige-button"},
                ["raw-html", function() {if (hasMilestone("d",10) && player.tab == "d") return "You are gaining " + layerText("h2", "d", format(getResetGain("d").div(100))) + " deaths per second"}],
                function() {if (player.tab == "d") return "resource-display"},
                "blank",
                ["display-text",
                "Buyables give free levels to the previous layer buyable.",
                ],
                "buyables",
            ],
            unlocked() { return hasMilestone("f", 5) }
        }
    },
    milestones: {
        0: {
            requirementDescription: "1 total death",
            effectDescription: "Keep uncoater/symptom milestones on reset.",
            done() { return player.d.total.gte(1) }
        },
        1: {
            requirementDescription: "2 total deaths",
            effectDescription: "You can buy max uncoaters.",
            done() { return player.d.total.gte(2) }
        },
        2: {
            requirementDescription: "3 total deaths",
            effectDescription: "Autobuy uncoaters and unlock upgrades.",
            toggles:[["d", "auto"]],
            done() { return player.d.total.gte(3) }
        },
        3: {
            requirementDescription: "4 total deaths",
            effectDescription: "Keep uncoater challenge completions.",
            done() { return player.d.total.gte(4) }
        },
        4: {
            requirementDescription: "6 total deaths",
            effectDescription: "'Smell Loss' buys 10x more and buyables cost nothing.",
            done() { return player.d.total.gte(6) }
        },
        5: {
            requirementDescription: "24 total deaths",
            effectDescription: "Uncoaters reset nothing.",
            done() { return player.d.total.gte(24) }
        },
        6: {
            requirementDescription: "48 total deaths",
            effectDescription: "Keep previous upgrades on reset.",
            done() { return player.d.total.gte(48) }
        },
        7: {
            requirementDescription: "96 total deaths",
            effectDescription: "Autobuy symptoms.",
            toggles:[["d", "autos"]],
            done() { return player.d.total.gte(96) }
        },
        8: {
            requirementDescription: "1,048,576 total deaths",
            effectDescription: "Unlock symptom challenges.",
            done() { return player.d.total.gte(1048576) }
        },
        9: {
            requirementDescription() {
                return format(Decimal.pow(2, 32)) + " total deaths"
            },
            effectDescription: "Symptoms reset nothing and 'Smell Loss' buys 2x often.",
            done() { return player.d.total.gte(Decimal.pow(2, 32)) }
        },
        10: {
            requirementDescription() {
                return format(Decimal.pow(2, 1024)) + " total deaths"
            },
            effectDescription: "Gain 1% of death gain per second and disable prestige.",
            unlocked() {
                return hasDUpg(34) || player.f.unlocked
            },
            done() { return player.d.total.gte(Decimal.pow(2,1024))}
        },
    },
    buyables: {
		rows: 3,
        cols: 3,
        11: {
            title: "Severity Gain",
            scalebase() {
                return decimalThree
            },
			cost(x=player[this.layer].buyables[this.id]) { // cost for buying xth buyable, can be an object if there are multiple currencies
                let cost = Decimal.pow(this.scalebase(), x.pow(1.5)).mul(Decimal.pow(10,16000))
                return cost.floor()
            },
            base() { 
                let base = player.d.points.add(10).max(10)
                base = base.log10().pow(100)
                return base
            },
            extra() {
                let extra = decimalZero
                return extra
            },
            total() {
                let total = getBuyableAmount("d", 11).add(tmp[this.layer].buyables[this.id].extra)
                return total
            },
			effect() { // Effects of owning x of the items, x is a decimal
                let x = tmp[this.layer].buyables[this.id].total
                let base = tmp[this.layer].buyables[this.id].base
                return Decimal.pow(base, x);
            },
            display() { // Everything else displayed in the buyable button after the title
                if (player.tab != "d") return 
                let extra = ""
                return "Multiply severity gain by "+format(this.base())+" after softcap (based on deaths).\n\
                Cost: " + format(tmp[this.layer].buyables[this.id].cost)+" deaths\n\
                Effect: " + format(tmp[this.layer].buyables[this.id].effect)+"x\n\
                Amount: " + formatWhole(getBuyableAmount("d", 11)) + extra
            },
            unlocked() { return hasMilestone("f", 5) }, 
            canAfford() {
                    return player.d.points.gte(tmp[this.layer].buyables[this.id].cost)},
            buy() { 
                cost = tmp[this.layer].buyables[this.id].cost
                if (tmp[this.layer].buyables[this.id].canAfford) {
                    if (!hasMilestone("f",6)) player.d.points = player.d.points.sub(cost).max(0)
                    player[this.layer].buyables[this.id] = player[this.layer].buyables[this.id].add(1).max(1)
                }
            },
            buyMax(max) {
                let s = player.d.points
                let target = Decimal.log10(s.div(Decimal.pow(10,16000))).div(Decimal.log10(this.scalebase())).pow(2/3)
                target = target.ceil()
                let cost = Decimal.pow(this.scalebase(), target.sub(1).pow(1.5)).mul(Decimal.pow(10,16000))
                let diff = target.sub(player.d.buyables[11])
                if (tmp[this.layer].buyables[this.id].canAfford) {
                    if (!hasMilestone("f",6)) player.d.points = player.d.points.sub(cost).max(0)
                    if (diff.gt(max)) diff = max
                    player.d.buyables[11] = player.d.buyables[11].add(diff)
                }
            },
        },
        12: {
            title: "Death Gain",
            scalebase() {
                return decimalTen
            },
			cost(x=player[this.layer].buyables[this.id]) { // cost for buying xth buyable, can be an object if there are multiple currencies
                let cost = Decimal.pow(this.scalebase(), x.pow(1.5)).mul(Decimal.pow(10,17000))
                return cost.floor()
            },
            base() { 
                let base = player.f.points.add(10).max(10)
                base = base.log10().pow(3)
                return base
            },
            extra() {
                let extra = decimalZero
                return extra
            },
            total() {
                let total = getBuyableAmount("d", 12).add(tmp[this.layer].buyables[this.id].extra)
                return total
            },
			effect() { // Effects of owning x of the items, x is a decimal
                let x = tmp[this.layer].buyables[this.id].total
                let base = tmp[this.layer].buyables[this.id].base
                return Decimal.pow(base, x);
            },
            display() { // Everything else displayed in the buyable button after the title
                if (player.tab != "d") return 
                let extra = ""
                return "Multiply death gain by "+format(this.base())+" (based on fatality).\n\
                Cost: " + format(tmp[this.layer].buyables[this.id].cost)+" deaths\n\
                Effect: " + format(tmp[this.layer].buyables[this.id].effect)+"x\n\
                Amount: " + formatWhole(getBuyableAmount("d", 12)) + extra
            },
            unlocked() { return player.d.buyables[11].gte(1) }, 
            canAfford() {
                    return player.d.points.gte(tmp[this.layer].buyables[this.id].cost)},
            buy() { 
                cost = tmp[this.layer].buyables[this.id].cost
                if (tmp[this.layer].buyables[this.id].canAfford) {
                    if (!hasMilestone("f",6)) player.d.points = player.d.points.sub(cost).max(0)
                    player[this.layer].buyables[this.id] = player[this.layer].buyables[this.id].add(1).max(1)
                }
            },
            buyMax(max) {
                let s = player.d.points
                let target = Decimal.log10(s.div(Decimal.pow(10,17000))).div(Decimal.log10(this.scalebase())).pow(2/3)
                target = target.ceil()
                let cost = Decimal.pow(this.scalebase(), target.sub(1).pow(1.5)).mul(Decimal.pow(10,17000))
                let diff = target.sub(player.d.buyables[12])
                if (tmp[this.layer].buyables[this.id].canAfford) {
                    if (!hasMilestone("f",6)) player.d.points = player.d.points.sub(cost).max(0)
                    if (diff.gt(max)) diff = max
                    player.d.buyables[12] = player.d.buyables[12].add(diff)
                }
            },
        },
        13: {
            title() {
                let dis = ""
                if (player.d.buyables[13].gte(tmp.d.buyables[13].distant)) dis = "Distant "
                dis += "Cases Boost"
                return dis
            },
            distant() {
                let d = new Decimal(1e20)
                if (hasUpgrade("e",191)) d = d.mul(upgradeEffect("e",191))
                if (hasUpgrade("e",203)) d = d.mul(upgradeEffect("e",203))
                if (hasUpgrade("e",213)) d = d.mul(upgradeEffect("e",213))
                if (hasUpgrade("e",234)) d = d.mul(upgradeEffect("e",234))
                if (hasUpgrade("e",241)) d = d.mul(tmp.e.upgrades[241].effect)
                return d
            },
            scalebase() {
                let base = new Decimal(1.007)
                if (hasFUpg(142)) base = base.div(getFUpgEff(142))
                return base
            },
            cost(x=player[this.layer].buyables[this.id]) { // cost for buying xth buyable, can be an object if there are multiple currencies
                let d = tmp.d.buyables[13].distant
                if (x.gte(d)) x = x.div(d).pow(2.5).mul(d)
                let cost = Decimal.pow(10, Decimal.pow(this.scalebase(),x).mul(1000)).mul(Decimal.pow(10,17000))
                return cost.floor()
            },
            scStart() {
                let sc = new Decimal(2500)
                if (hasFUpg(174)) sc = sc.add(getFUpgEff(174))
                if (hasFUpg(175)) sc = sc.add(getFUpgEff(175))
                sc = sc.add(tmp.e.peffect2)
                return sc
            },
            base() { 
                let base = player.points.add(10).max(10)
                base = base.log10().add(10).max(10)
                base = base.log10().add(10).max(10)
                base = base.log10().pow(0.004)
                if (hasFUpg(141)) base = base.add(getFUpgEff(141))
                if (hasFUpg(152)) base = base.add(getFUpgEff(152))
                if (hasUpgrade("e",15)) base = base.add(upgradeEffect("e",15))
                if (hasUpgrade("e",93)) base = base.add(upgradeEffect("e",93))
                if (hasChallenge("e",11)) base = base.add(challengeEffect("e",11))
                base = base.mul(tmp.e.buyables[63].effect)
                return base
            },
            extra() {
                let extra = decimalZero
                if (hasFUpg(71)) extra = extra.add(getFUpgEff(71))
                if (hasFUpg(123)) extra = extra.add(getFUpgEff(123))
                return extra
            },
            total() {
                let total = getBuyableAmount("d", 13).add(tmp[this.layer].buyables[this.id].extra)
                return total
            },
			effect() { // Effects of owning x of the items, x is a decimal
                let x = tmp[this.layer].buyables[this.id].total
                let base = tmp[this.layer].buyables[this.id].base
                let eff = Decimal.pow(base, x)
                if (x.gte(tmp.d.buyables[13].scStart)) eff = Decimal.pow(base, x.mul(tmp.d.buyables[13].scStart).pow(0.5))
                if (eff.gte(Decimal.pow(10,Decimal.pow(10,1e21)))) eff = eff.log10().log10().div(10).pow(5e19).pow10()
                if (inChallenge("e",11) || player.e.inC) eff = decimalOne
                return eff;
            },
            display() { // Everything else displayed in the buyable button after the title
                if (player.tab != "d") return 
                let extra = ""
                let eff = format(tmp[this.layer].buyables[this.id].effect)
                if (this.total().gte(tmp.d.buyables[13].scStart)) eff += " (softcapped)"
                if (hasFUpg(71)) extra = "+" + formatWhole(tmp[this.layer].buyables[this.id].extra)
                return "Raise cases gain to "+format(this.base())+" (based on cases).\n\
                Cost: " + format(tmp[this.layer].buyables[this.id].cost)+" deaths\n\
                Effect: ^" + eff +"\n\
                Amount: " + formatWhole(getBuyableAmount("d", 13)) + extra
            },
            unlocked() { return player.d.buyables[12].gte(1) }, 
            canAfford() {
                    return player.d.points.gte(tmp[this.layer].buyables[this.id].cost)},
            buy() { 
                cost = tmp[this.layer].buyables[this.id].cost
                if (tmp[this.layer].buyables[this.id].canAfford) {
                    if (!hasMilestone("f",6)) player.d.points = player.d.points.sub(cost).max(0)
                    player[this.layer].buyables[this.id] = player[this.layer].buyables[this.id].add(1).max(1)
                }
            },
            buyMax(max) {
                let s = player.d.points // log1.003(log10(cost/e17k)/1k)=x
                let d = tmp.d.buyables[13].distant
                let target = Decimal.log10(s.div(Decimal.pow(10,17000)).log10().div(1000)).div(Decimal.log10(this.scalebase()))
                if (target.gte(d)) target = target.div(d).pow(0.4).mul(d)
                target = target.ceil()
                let cost = Decimal.pow(10, Decimal.pow(this.scalebase(),target.sub(1)).mul(1000)).mul(Decimal.pow(10,17000))
                let diff = target.sub(player.d.buyables[13])
                if (tmp[this.layer].buyables[this.id].canAfford) {
                    if (!hasMilestone("f",6)) player.d.points = player.d.points.sub(cost).max(0)
                    if (diff.gt(max)) diff = max
                    player.d.buyables[13] = player.d.buyables[13].add(diff)
                }
            },
        },
    },
    canReset() { return !hasMilestone("d", 10) && player.s.severity.gte(1.797e308)},
    upgrades: {
        rows: 4,
        cols: 4,
        11: {
            title: "Deadly",
            description: "Deaths boosts symptom base.",
            cost: decimalTwo,
            effect(){
            let d11 = player.d.points.add(10).max(10)
            d11 = Decimal.log10(d11).pow(4.5).add(1).max(1)
            if (hasSUpg(52)) d11 = d11.pow(getSUpgEff(52))
            if (inChallenge("s", 21)) d11 = decimalOne
            return d11
            },
            effectDisplay(){
            return format(getDUpgEff(11))+"x"
            },
            unlocked() {
                return hasMilestone("d", 2)
            }
        },
        12: {
            title: "Fatal",
            description: "Cases boost death gain.",
            cost: decimalFive,
            effect(){
            let d12 = player.points.add(1).max(1)
            d12 = Decimal.log10(d12).pow(0.1).add(1).max(1)
            if (hasDUpg(33)) d12 = d12.pow(getDUpgEff(33))
            if (hasFUpg(31)) d12 = d12.pow(getFUpgEff(31))
            if (d12.gte("ee3e20")) d12 = d12.div("ee3e20").log10().log10().pow(0.95).pow10().pow10().mul("ee3e20")
            if (d12.gte("eee32")) d12 = d12.div("eee32").log10().log10().pow(0.9).pow10().pow10().mul("eee32")
            if (inChallenge("s", 21)) d12 = decimalOne
            return d12
            },
            effectDisplay(){
            return format(getDUpgEff(12))+"x"
            },
            unlocked() {
                return hasDUpg(11)
            }
        },
        13: {
            title: "Lethal",
            description: "Deaths boost 'Infectivity Gain' base.",
            cost: new Decimal(20),
            effect(){
            let d12 = player.d.points.add(1).max(1)
            d12 = d12.pow(20)
            if (d12.gte("eee20")) d12 = d12.div("eee20").log10().log10().pow(0.95).pow10().pow10().mul("eee20")
            if (inChallenge("s", 21)) d12 = decimalOne
            return d12
            },
            effectDisplay(){
            return format(getDUpgEff(13))+"x"
            },
            unlocked() {
                return hasDUpg(12)
            }
        },
        14: {
            title: "Blood Transmission",
            description: "Deaths boost 'Transmission'.",
            cost: new Decimal(30),
            effect(){
            let d14 = player.d.points.add(10).max(10)
            d14 = Decimal.log10(d14).add(10).max(10)
            d14 = Decimal.log10(d14).pow(4)
            if (d14.gte(10)) d14 = d14.div(10).pow(0.3).mul(10)
            if (inChallenge("s", 21)) d14 = decimalOne
            return d14
            },
            effectDisplay(){
                let dis = "^"+format(getDUpgEff(14))
                if (tmp.d.upgrades[14].effect.gte(10)) dis += " (softcapped)"
                return dis
            },
            unlocked() {
                return hasDUpg(13)
            }
        },
        21: {
            title: "Dangerous",
            description: "Deaths boost uncoater base.",
            cost: new Decimal(75),
            effect(){
            let d12 = player.d.points.add(1).max(1)
            d12 = d12.pow(30)
            if (hasUpgrade("Ur",23)) d12 = d12.pow(tmp.Ur.upgrades[23].effect)
            if (inChallenge("s", 21)) d12 = decimalOne
            return d12
            },
            effectDisplay(){
            return format(getDUpgEff(21))+"x"
            },
            unlocked() {
                return hasDUpg(14)
            }
        },
        22: {
            title: "Mortal",
            description: "Double death gain per death upgrade bought.",
            cost: new Decimal(150),
            effect(){
            let d22 = player.d.upgrades.length
            d22 = Decimal.pow(2, d22)
            if (inChallenge("s", 21)) d22 = decimalOne
            return d22
            },
            effectDisplay(){
            return format(getDUpgEff(22))+"x"
            },
            unlocked() {
                return hasDUpg(21)
            }
        },
        23: {
            title: "Kill",
            description: "'Smell Loss' buys 2x more.",
            cost: new Decimal(3e5),
            unlocked() {
                return hasDUpg(22)
            }
        },
        24: {
            title: "Dying",
            description: "Severity boosts death gain.",
            cost: new Decimal(1e8),
            effect(){
            let d24 = player.s.severity.add(10).max(10)
            d24 = Decimal.log10(d24).pow(0.5)
            if (inChallenge("s", 21)) d24 = decimalOne
            return d24
            },
            effectDisplay(){
            return format(getDUpgEff(24))+"x"
            },
            unlocked() {
                return hasDUpg(23)
            }
        },
        31: {
            title: "Pass Away",
            description() {
                let des =  "Deaths reduce recovery effect."
                if (hasDUpg(42)) des =  "Deaths boost severity gain."
                return des
            },
            cost: new Decimal(5e13),
            effect(){
            let d24 = player.d.points.add(10).max(10)
            d24 = Decimal.log10(d24).pow(-0.12)
            if (hasDUpg(42)) d24 = d24.pow(-1)
            if (inChallenge("s", 21)) d24 = decimalOne
            return d24
            },
            effectDisplay(){
            return "^"+format(getDUpgEff(31))
            },
            unlocked() {
                return hasDUpg(24)
            }
        },
        32: {
            title: "Perish",
            description() {
                let des =  "Cases reduce recovery effect "
                if (hasDUpg(42)) des =  "Cases boost severity gain"
                return des + " and 'Smell Loss' buys 5x more."
            },
            cost: new Decimal(2e27),
            effect(){
            let d24 = player.points.add(10).max(10)
            d24 = Decimal.log10(d24).pow(-0.018)
            if (hasDUpg(42)) d24 = d24.pow(-1)
            if (inChallenge("s", 21)) d24 = decimalOne
            return d24
            },
            effectDisplay(){
            return "^"+format(getDUpgEff(32))
            },
            unlocked() {
                return hasDUpg(31)
            }
        },
        33: {
            title: "Expire",
            description: "VP boost 'Fatal' and 'Smell Loss' buys 2x more and 2x often.",
            cost: new Decimal(3e46),
            effect(){
            let d24 = player.v.points.add(10).max(10)
            d24 = Decimal.log10(d24).pow(0.1)
            if (inChallenge("s", 21)) d24 = decimalOne
            return d24
            },
            effectDisplay(){
            return "^"+format(getDUpgEff(33))
            },
            unlocked() {
                return hasDUpg(32)
            }
        },
        34: {
            title: "Decease",
            description: "Bought death upgrades boost 'Fever' and unlock more symptom upgrades.",
            cost: new Decimal(4e165),
            unlocked() {
                return hasDUpg(33)
            }
        },
        41: {
            title: "Demise",
            description: "Deaths make symptom scaling start later.",
            cost: Decimal.pow(10,2089).mul(1.5),
            effect(){
            let d24 = player.d.points.add(10).max(10)
            d24 = Decimal.log10(d24).pow(0.3).sub(1)
            if (d24.gte(5000)) d24 = d24.div(5000).pow(0.5).mul(5000)
            if (inChallenge("ct",32)) {
                if (d24.gte("ee121")) d24 = d24.log10().log10().div(121).pow(0.5).mul(121).pow10().pow10()
                if (d24.gte("ee225")) d24 = d24.log10().log10().div(225).pow(0.3).mul(225).pow10().pow10()
                if (d24.gte("eee3")) d24 = d24.log10().log10().div(1e3).pow(0.75).mul(1e3).pow10().pow10()
                if (d24.gte("eee37")) d24 = d24.log10().log10().mul(1e3).log10().mul(2.5).pow(18.5).pow10().pow10()
                if (d24.gte("eee61")) d24 = d24.log10().log10().div(1e61).pow(0.5).mul(1e61).pow10().pow10()
            }
            if (inChallenge("s", 21)) d24 = decimalOne
            return d24.pow(tmp.Us.symptomEff)
            },
            effectDisplay(){
            return "+"+format(getDUpgEff(41))
            },
            unlocked() {
                return hasSUpg(55)
            }
        },
        42: {
            title: "Murder",
            description: "Stop gaining recoveries and upgrades that reduce recovery effect boost severity gain.",
            cost: Decimal.pow(10,2208).mul(5),
            unlocked() {
                return hasDUpg(41)
            }
        },
        43: {
            title: "Slain",
            description: "Deaths boost cases gain.",
            cost: Decimal.pow(10,9101).mul(1.5),
            effect(){
            let d24 = player.d.points.add(10).max(10).log10().pow(0.025)
            if (d24.gte(Decimal.pow(10,1e57))) d24 = d24.div(Decimal.pow(10,1e57)).log10().pow(0.85).pow10().mul(Decimal.pow(10,1e57))
            if (d24.gte(Decimal.pow(10,Decimal.pow(10,1e21)))) d24 = d24.log10().log10().div(10).pow(5e19).pow10()
            if (inChallenge("s", 21)) d24 = decimalOne
            return d24
            },
            effectDisplay(){
                let dis = "^"+format(getDUpgEff(43))
                if (getDUpgEff(43).gte(Decimal.pow(10,1e57))) dis += " (softcapped)"
                return dis
            },
            unlocked() {
                return hasDUpg(42)
            }
        },
        44: {
            title: "Slaughter",
            description: "Deaths boost severity gain exponent.",
            cost: Decimal.pow(10,9291).mul(8),
            effect(){
                let d24 = player.d.points.add(10).max(10)
                d24 = Decimal.log10(d24).pow(0.015)
                if (inChallenge("s", 21)) d24 = decimalOne
                return d24
                },
                effectDisplay(){
                return "^"+format(getDUpgEff(44))
                },
            unlocked() {
                return hasDUpg(43)
            }
        },
    },
})
