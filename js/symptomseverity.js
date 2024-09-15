addLayer("s", {
    name: "symptoms",
    symbol: "S",
    position: 1,
    startData() { return {
        points: decimalZero,
        best: decimalZero,
        total: decimalZero,
        auto: false,
        severity: decimalZero,
        recoveries: decimalZero,
        time: decimalZero,
        ct: 0,
        unlocked: false
    }},
    color: "#5ad93f",
    requires: Decimal.pow(10,10310),
    resource: "symptoms",
    resourceSingular: "symptom",
    baseResource: "infectivity",
    baseAmount() { 
        return player.i.points
    },
    type: "static",
    exponent: new Decimal(1.99),
    base: Decimal.pow(10,570),
    branches: ["i","r","u"],
    hotkeys: [
        {
            key:"s", description: "S:Reset for symptoms", onPress() {
                if (canReset(this.layer))
                    doReset(this.layer)
            }
        },
    ],
    doReset(resettingLayer) {
        let keep = [];
        if (resettingLayer=="d") {
            keep.push("challenges")
            if (hasMilestone("d",0)) keep.push("milestones")
            if (hasMilestone("d",6)) keep.push("upgrades")
        }
        if (hasMilestone("a",1)) keep.push("milestones")
        if (hasMilestone("f", 3) || hasMilestone("a",1)) keep.push("upgrades")
        if (hasMilestone("f", 4) || hasMilestone("a",1)) keep.push("challenges")
        if (layers[resettingLayer].row > this.row || resettingLayer=="d") layerDataReset(this.layer, keep)
    },
    resetsNothing() { return hasMilestone("d", 9) },
    autoPrestige() { return (hasMilestone("d", 7) && player.d.autos) },
    effbase() {
        let eff = new Decimal(123)
        eff = eff.mul(tmp.s.buyables[21].effect)
        if (hasDUpg(11)) eff = eff.mul(getDUpgEff(11))
        if (hasSUpg(35)) eff = eff.mul(getSUpgEff(35))
        return eff
    },
    effect(){
        let eff = tmp.s.effbase
        eff = eff.pow(player.s.points).sub(1)
        if (inChallenge("ct",32)) {
            eff = player.s.points.mul(tmp.Ur.replicantEff)
            if (hasUpgrade("Ui",32)) eff = eff.mul(tmp.Ui.upgrades[32].effect)
            if (hasUpgrade("Ui",33)) eff = eff.mul(tmp.Ui.upgrades[33].effect)
            if (hasMilestone("Ui",12)) eff = eff.mul(tmp.Ui.milestones[12].effect)
        }        
        else {
        if (hasSUpg(14)) eff = eff.mul(getSUpgEff(14))
        if (hasSUpg(32)) eff = eff.mul(getSUpgEff(32))
        eff = eff.mul(tmp.s.buyables[11].effect)
        eff = eff.mul(tmp.d.effect)
        eff = eff.mul(tmp.f.effect)
        if (hasChallenge("s", 11)) eff = eff.mul(challengeEffect("s", 11))
        eff = eff.pow(tmp.s.buyables[33].effect)
        if (player.s.severity.gte(new Decimal(1.797e308))) eff = eff.div(tmp.s.recoveryEff)
        if (hasDUpg(42)) {
            if (hasDUpg(31)) eff = eff.pow(getDUpgEff(31))
            if (hasDUpg(32)) eff = eff.pow(getDUpgEff(32))
            if (hasChallenge("s", 22)) eff = eff.pow(challengeEffect("s", 22))
            if (hasSUpg(53)) eff = Decimal.pow(10,eff.log10().pow(getSUpgEff(53)))
            if (hasSUpg(54)) eff = Decimal.pow(10,eff.log10().pow(getSUpgEff(54)))
            if (hasDUpg(44)) eff = Decimal.pow(10,eff.log10().pow(getDUpgEff(44)))
            if (hasFUpg(21)) eff = Decimal.pow(10,eff.log10().pow(getFUpgEff(21)))
        }
        if (eff.gte(Decimal.pow(10,2e6))) eff = eff.log10().mul(5000).pow(2e5)
        if (player.s.points.eq(0)) eff = decimalZero
        if (hasFUpg(11)) eff = eff.mul(getFUpgEff(11))
        if (hasFUpg(13)) eff = eff.mul(getFUpgEff(13))
        if (hasFUpg(15)) eff = eff.mul(tmp.f.effect)
        eff = eff.mul(tmp.d.buyables[11].effect).mul(tmp.ct.effect)
        }
        return eff
    },
    recoveryGain() {
        let s = player.s.severity
        let recov = (s.add(10).max(10)).log10().div(308.254).pow(40)
        let r = player.s.recoveries.add(1).max(1)
        if (s.gte(Decimal.pow(10,1000))) recov = recov.pow(s.log10().sub(999).pow(0.3)).pow(r.log10().pow(0.1))
        if (s.gte(Decimal.pow(10,150000))) recov = Decimal.pow(10,recov.log10().pow(s.log10().div(3e6).add(0.95)))
        if (hasDUpg(42)) recov = decimalZero
        return recov
    },
    recoveryEff() {
        let s = player.s.severity
        let recov = player.s.recoveries.add(1).max(1)
        recov = Decimal.log10(recov).add(1).max(1).pow(40)
        if (s.gte(Decimal.pow(10,1000))) recov = recov.pow(s.log10().sub(999).pow(0.15)).pow(recov.log10().pow(0.2))
        if (s.gte(Decimal.pow(10,2000))) recov = recov.pow(s.log10().sub(1999).pow(0.12))
        if (s.gte(Decimal.pow(10,5000))) recov = Decimal.pow(10,recov.log10().pow(s.log10().sub(4999).pow(0.02)))
        if (s.gte(Decimal.pow(10,150000))) recov = Decimal.pow(10,recov.log10().pow(s.log10().div(1.5e6).add(0.9)))
        if (hasDUpg(31)) recov = recov.pow(getDUpgEff(31))
        if (hasDUpg(32)) recov = recov.pow(getDUpgEff(32))
        if (hasChallenge("s", 22)) recov = recov.pow(challengeEffect("s", 22))
        if (hasSUpg(53)) recov = Decimal.pow(10,recov.log10().pow(getSUpgEff(53)))
        if (hasSUpg(54)) recov = Decimal.pow(10,recov.log10().pow(getSUpgEff(54)))
        if (hasDUpg(42)) recov = decimalOne
        return recov
    },
    effectDescription() {
        let desc = "which "+pluralize(player.s.points,'produces ','produce ',true) + layerText("h2", "s", format(tmp.s.effect)) + " severity "
        if (tmp.s.effect.gte(Decimal.pow(10,2e6))) desc += " (softcapped) "
        if (player.s.severity.gte(new Decimal(1.797e308)) && !hasDUpg(42)) desc = desc + "and " + format(tmp.s.recoveryGain) +pluralize(tmp.s.recoveryGain,'recovery','recoveries')
        desc = desc + " per second."
        return desc
    },
    severityEff() {
        let seff = player.s.severity.add(1).max(1)
        seff = seff.pow(6)
        if (hasSUpg(21)) seff = seff.pow(getSUpgEff(21))
        if (hasSUpg(51)) seff = seff.pow(getSUpgEff(51))
        if (seff.gte("eee3")) seff = seff.log10().pow("e997")
        if (inChallenge("s", 11)) seff = decimalOne
        return seff
    },
    bulk() {
        let buymult = decimalOne
        if (hasMilestone("d", 4)) buymult = buymult.mul(10)
        if (hasMilestone("a", 0)) buymult = buymult.mul(2)
        if (hasAchievement("a", 41)) buymult = buymult.mul(2)
        if (hasDUpg(23)) buymult = buymult.mul(2)
        if (hasDUpg(32)) buymult = buymult.mul(5)
        if (hasDUpg(33)) buymult = buymult.mul(2)
        if (hasSUpg(55)) buymult = buymult.mul(25)
        if (hasMilestone("f", 8)) buymult = buymult.mul(100)
        if (hasFUpg(73)) buymult = buymult.mul(1000)
        if (hasFUpg(123)) buymult = buymult.pow(2)
        if (hasFUpg(143)) buymult = buymult.pow(10)
        if (hasUpgrade("e",15)) buymult = buymult.tetrate(1.79e308)
        return buymult
    },
    speed() {
        let speed = 1
        if (hasMilestone("d", 9)) speed *= 2
        if (hasMilestone("a", 0)) speed *= 2
        if (hasAchievement("a", 41)) speed *= 2
        if (hasDUpg(33)) speed *= 2
        if (hasFUpg(73)) speed *= 2
        return speed
    },
    update(diff) {
        if (player.s.unlocked) player.s.severity = player.s.severity.add(tmp.s.effect.times(diff));
        if (tmp.s.effect.gte(Decimal.pow(10,1000)) && player.s.severity.lt(Decimal.pow(10,1000))) player.s.severity = Decimal.pow(10,1000)
        if (tmp.s.effect.gte(Decimal.pow(10,5000)) && player.s.severity.lt(Decimal.pow(10,5000))) player.s.severity = Decimal.pow(10,5000)
        if (player.s.severity.gte(1.797e308)) player.s.recoveries = player.s.recoveries.add(tmp.s.recoveryGain.times(diff));
        if (player.s.recoveries.log10().gte(tmp.s.recoveryGain.log10().add(2))) player.s.recoveries = tmp.s.recoveryGain.mul(100)
        let t = diff*tmp.s.speed
            player.s.time = Decimal.add(player.s.time, t)
            if (player.s.time.gte(1) && tmp.s.speed<20) {
                let times = Decimal.floor(player.s.time).mul(-1)
                player.s.time = Decimal.add(player.s.time, times)
                times = times.mul(-1)
                if ((hasUpgrade("s", 31) || hasAchievement("a", 41)) && tmp.s.speed<20) {
                    layers.s.buyables[11].buyMax(times.mul(tmp.s.bulk))
                    layers.s.buyables[12].buyMax(times.mul(tmp.s.bulk))
                    layers.s.buyables[13].buyMax(times.mul(tmp.s.bulk))
                    layers.s.buyables[21].buyMax(times.mul(tmp.s.bulk))
                    layers.s.buyables[22].buyMax(times.mul(tmp.s.bulk))
                    layers.s.buyables[23].buyMax(times.mul(tmp.s.bulk))
                    layers.s.buyables[31].buyMax(times.mul(tmp.s.bulk))
                    layers.s.buyables[32].buyMax(times.mul(tmp.s.bulk))
                    layers.s.buyables[33].buyMax(times.mul(tmp.s.bulk))
                }
            };
        if (player.s.ct <0.1 && (inChallenge("s", 11) || inChallenge("s", 12) || inChallenge("s", 21) || inChallenge("s", 22)))player.s.ct += diff
        if (player.s.ct >= 0.1) {
            player.v.upgrades = [11,12,13,21,22,23,31,32,33]
        }
        if ((hasUpgrade("s", 31) || hasAchievement("a", 41)) && tmp.s.speed>20) {
            let s = player.s.severity.max(1)
            player.s.buyables[11] = player.s.buyables[11].add(Decimal.log10(s.div(1e15)).div(Decimal.log10(2.5)).pow(10/13).ceil().sub(player.s.buyables[11]).min(tmp.s.bulk)).max(player.s.buyables[11])
            player.s.buyables[12] = player.s.buyables[12].add(Decimal.log10(s.div(1e19)).pow(Decimal.pow(1.29,-1)).ceil().sub(player.s.buyables[12]).min(tmp.s.bulk)).max(player.s.buyables[12])
            player.s.buyables[13] = player.s.buyables[13].add(Decimal.log10(s.div(2e164)).div(Decimal.log10(tmp.s.buyables[13].scalebase)).pow(Decimal.pow(1.5,-1)).ceil().sub(player.s.buyables[13]).min(tmp.s.bulk)).max(player.s.buyables[13])
            player.s.buyables[21] = player.s.buyables[21].add(Decimal.log10(s.div(1e20)).div(Decimal.log10(65)).pow(Decimal.pow(1.35,-1)).ceil().sub(player.s.buyables[21]).min(tmp.s.bulk)).max(player.s.buyables[21])
            player.s.buyables[22] = player.s.buyables[22].add(Decimal.log10(s.div(1e37)).div(Decimal.log10(tmp.s.buyables[22].scalebase)).pow(Decimal.pow(1.5,-1)).ceil().sub(player.s.buyables[22]).min(tmp.s.bulk)).max(player.s.buyables[22])
            player.s.buyables[23] = player.s.buyables[23].add(Decimal.log10(s.div(1e270)).div(Decimal.log10(tmp.s.buyables[23].scalebase)).pow(Decimal.pow(1.65,-1)).ceil().sub(player.s.buyables[23]).min(tmp.s.bulk)).max(player.s.buyables[23])
            player.s.buyables[31] = player.s.buyables[31].add(Decimal.log10(s.div(Decimal.pow(10,34e5))).div(Decimal.log10(tmp.s.buyables[31].scalebase)).pow(0.5).ceil().sub(player.s.buyables[31]).min(tmp.s.bulk)).max(player.s.buyables[31])
            player.s.buyables[32] = player.s.buyables[32].add(Decimal.log10(s.div(Decimal.pow(10,3573000))).div(Decimal.log10(tmp.s.buyables[32].scalebase)).pow(0.5).ceil().sub(player.s.buyables[32]).min(tmp.s.bulk)).max(player.s.buyables[32])
            player.s.buyables[33] = player.s.buyables[33].add(Decimal.log10(s.div(Decimal.pow(10,388e4))).div(Decimal.log10(tmp.s.buyables[33].scalebase)).pow(Decimal.pow(2.2,-1)).ceil().sub(player.s.buyables[33]).min(tmp.s.bulk)).max(player.s.buyables[33])
        }
    },
    tabFormat: {
        "Main": {
        content:[
            function() {if (player.tab == "s") return "main-display"},
            "prestige-button",
            "blank",
            ["raw-html", function() {if (player.tab == "s") return "You have " + layerText("h2", "s", format(player.s.severity)) +  ' severity, which boosts cases, VP, and infectivity by ' + layerText("h2", "s", format(tmp.s.severityEff))}],
            ["display-text",
            function() {
                if (player.s.severity.gte(1.797e308) && !hasDUpg(42)) return 'You have ' + formatWhole(player.s.recoveries) + ' '+pluralize(player.s.recoveries,'recovery','recoveries',true)+', which '+pluralize(player.s.recoveries,'divides','divide',true)+' severity gain by ' + format(tmp.s.recoveryEff)
            },
            ],
            "upgrades"
            ]
        },
        "Milestones": {
            content:[
                function() {if (player.tab == "s") return "main-display"},
            "prestige-button",
            "blank",
            ["raw-html", function() {if (player.tab == "s") return "You have " + layerText("h2", "s", format(player.s.severity)) +  ' severity, which boosts cases, VP, and infectivity by ' + layerText("h2", "s", format(tmp.s.severityEff))}],
            ["display-text",
            function() {
                if (player.s.severity.gte(1.797e308) && !hasDUpg(42)) return 'You have ' + formatWhole(player.s.recoveries) + ' '+pluralize(player.s.recoveries,'recovery','recoveries',true)+', which '+pluralize(player.s.recoveries,'divides','divide',true)+' severity gain by ' + format(tmp.s.recoveryEff)
            },
            ],
                "milestones"
            ],
        },
        "Buyables": {
            content:[
                function() {if (player.tab == "s") return "main-display"},
            "prestige-button",
            "blank",
            ["raw-html", function() {if (player.tab == "s") return "You have " + layerText("h2", "s", format(player.s.severity)) +  ' severity, which boosts cases, VP, and infectivity by ' + layerText("h2", "s", format(tmp.s.severityEff))}],
            ["display-text",
            function() {
                if (player.s.severity.gte(1.797e308) && !hasDUpg(42)) return 'You have ' + formatWhole(player.s.recoveries) + ' '+pluralize(player.s.recoveries,'recovery','recoveries',true)+', which '+pluralize(player.s.recoveries,'divides','divide',true)+' severity gain by ' + format(tmp.s.recoveryEff)
            },
            ],
                "buyables"
            ],
            unlocked() {return hasMilestone("s",2)}
        },
        "Challenges": {
            content:[
                function() {if (player.tab == "s") return "main-display"},
            "prestige-button",
            "blank",
            ["raw-html", function() {if (player.tab == "s") return "You have " + layerText("h2", "s", format(player.s.severity)) +  ' severity, which boosts cases, VP, and infectivity by ' + layerText("h2", "s", format(tmp.s.severityEff))}],
            ["display-text",
            function() {
                if (player.s.severity.gte(1.797e308) && !hasDUpg(42)) return 'You have ' + formatWhole(player.s.recoveries) + ' '+pluralize(player.s.recoveries,'recovery','recoveries',true)+', which '+pluralize(player.s.recoveries,'divides','divide',true)+' severity gain by ' + format(tmp.s.recoveryEff)
            },
            ],
                "challenges"
            ],
            unlocked() {return hasMilestone("d",8)}
        },
    },
    gainMult() {
        smult = decimalOne
        let s = player.s.points
        let ssc = new Decimal(8)
        let ssc2 = new Decimal(20)
        if (hasDUpg(41)) ssc2 = ssc2.add(getDUpgEff(41))
        if (s.gte(ssc)) smult = smult.mul(Decimal.pow(1e100, s.sub(ssc).pow(3.7)))
        if (s.gte(ssc2)) smult = smult.mul(Decimal.pow(Decimal.pow(10,10000),Decimal.pow(1.9,s.sub(ssc2))))
        return smult
    },
    gainExp() {
        return decimalOne
    },
    row: 2,
    layerShown() {
        let shown = challengeCompletions("u" ,22) == 3
        if(player.s.unlocked) shown = true
        return shown && player.uv.tree == "normal"
    },
    canBuyMax() {return hasMilestone("f",12)},
    milestones: {
        0: {
            requirementDescription: "2 symptoms",
            effectDescription: "Keep Infectivity/Replicator milestones on reset.",
            done() { return player.s.points.gte(2) }
        },
        1: {
            requirementDescription: "3 symptoms",
            effectDescription: "Keep Infectivity/Replicator upgrades on reset.",
            done() { return player.s.points.gte(3) }
        },
        2: {
            requirementDescription: "4 symptoms",
            effectDescription: "Unlock buyables.",
            done() { return player.s.points.gte(4) }
        },
        3: {
            requirementDescription: "10 symptoms",
            effectDescription: "Unlock 2 more buyables.",
            done() { return player.s.points.gte(10) }
        },
    },
    buyables: {
		rows: 3,
        cols: 3,
        11: {
			title: "Severity Gain",
			cost(x=player.s.buyables[11]) { // cost for buying xth buyable, can be an object if there are multiple currencies
                let cost = Decimal.pow(2.5, x.pow(1.3)).mul(1e15)
                return cost.floor()
            },
            base() { 
                let base = decimalTwo
                if (hasSUpg(33)) base = base.add(getSUpgEff(33))
                base = base.mul(tmp.s.buyables[31].effect)
                return base
            },
            extra() {
                let extra = decimalZero
                if (!inChallenge("s", 22)) {
                if (hasSUpg(22)) extra = extra.add(tmp.s.buyables[12].total)
                if (hasSUpg(23)) extra = extra.add(tmp.s.buyables[21].total)
                extra = extra.add(tmp.d.buyables[11].total)
                extra = extra.add(tmp.s.buyables[33].total)
                }
                return extra
            },
            total() {
                let total = getBuyableAmount("s", 11).add(tmp.s.buyables[11].extra)
                return total
            },
			effect() { // Effects of owning x of the items, x is a decimal
                let x = tmp.s.buyables[11].total
                let base = tmp.s.buyables[11].base
                if (inChallenge("s", 12)) x = decimalZero
                return Decimal.pow(base, x);
            },
			display() { // Everything else displayed in the buyable button after the title
                let extra = ""
                if (hasSUpg(22)) extra = "+" + formatWhole(tmp.s.buyables[11].extra)
                if (player.tab != "s") return 
                return "Multiply severity gain by "+format(this.base())+".\n\
                Cost: " + format(tmp.s.buyables[11].cost)+" severity\n\
                Effect: " + format(tmp.s.buyables[11].effect)+"x\n\
                Amount: " + formatWhole(getBuyableAmount("s", 11)) + extra
            },
            unlocked() { return hasMilestone("s", 2) }, 
            canAfford() {
                    return player.s.severity.gte(tmp.s.buyables[11].cost)},
            buy() { 
                cost = tmp.s.buyables[11].cost
                if (tmp.s.buyables[11].canAfford) {
                    if (!hasMilestone("d", 4)) player.s.severity = player.s.severity.sub(cost).max(0)	
                    player.s.buyables[11] = player.s.buyables[11].add(1).max(1)
                }
            },
            buyMax(max) {
                let s = player.s.severity
                let target = Decimal.log10(s.div(1e15)).div(Decimal.log10(2.5)).pow(10/13)
                target = target.ceil()
                let cost = Decimal.pow(2.5, target.sub(1).pow(1.3)).mul(1e15)
                let diff = target.sub(player.s.buyables[11])
                if (tmp.s.buyables[11].canAfford) {
                    if (!hasMilestone("d", 4)) player.s.severity = player.s.severity.sub(cost).max(0)
                    if (diff.gt(max)) diff = max
                    player.s.buyables[11] = player.s.buyables[11].add(diff)
                }
            },
        },
        12: {
			title: "Infectivity Gain",
			cost(x=player.s.buyables[12]) { // cost for buying xth buyable, can be an object if there are multiple currencies
                let cost = Decimal.pow(10, x.pow(1.29)).mul(1e19)
                return cost.floor()
            },
            base() { 
                let base = new Decimal(1e100)
                if (hasDUpg(13)) base = base.mul(getDUpgEff(13))
                return base
            },
            extra() {
                let extra = decimalZero
                extra = extra.add(tmp.s.buyables[33].total)
                if (hasSUpg(25) && !inChallenge("s", 21)) extra = extra.add(tmp.s.buyables[22].total)
                if (hasSUpg(34) && !inChallenge("s", 21)) extra = extra.add(tmp.s.buyables[13].total)
                extra = extra.add(tmp.d.buyables[12].total)
                return extra
            },
            total() {
                let total = getBuyableAmount("s", 12).add(tmp.s.buyables[12].extra)
                return total
            },
			effect() { // Effects of owning x of the items, x is a decimal
                let x = tmp.s.buyables[12].total
                let base = tmp.s.buyables[12].base
                if (inChallenge("s", 12)) x = decimalZero
                return Decimal.pow(base, x);
            },
			display() { // Everything else displayed in the buyable button after the title
                let extra = ""
                if (player.tab != "s") return 
                if (hasSUpg(25)) extra = "+" + formatWhole(tmp.s.buyables[12].extra)
                return "Multiply Infectivity gain by "+format(tmp.s.buyables[12].base)+".\n\
                Cost: " + format(tmp.s.buyables[12].cost)+" severity\n\
                Effect: " + format(tmp.s.buyables[12].effect)+"x\n\
                Amount: " + formatWhole(getBuyableAmount("s", 12)) + extra
            },
            unlocked() { return player[this.layer].buyables[11].gte(1) }, 
            canAfford() {
                    return player.s.severity.gte(tmp.s.buyables[12].cost)},
            buy() { 
                cost = tmp.s.buyables[12].cost
                if (tmp.s.buyables[12].canAfford) {
                    if (!hasMilestone("d", 4)) player.s.severity = player.s.severity.sub(cost).max(0)	
                    player.s.buyables[12] = player.s.buyables[12].add(1).max(1)
                }
            },
            buyMax(max) {
                let s = player.s.severity
                let target = Decimal.log10(s.div(1e19)).pow(Decimal.pow(1.29,-1))
                target = target.ceil()
                let cost = Decimal.pow(10, target.sub(1).pow(1.29)).mul(1e19)
                let diff = target.sub(player.s.buyables[12])
                if (tmp.s.buyables[12].canAfford) {
                    if (!hasMilestone("d", 4)) player.s.severity = player.s.severity.sub(cost).max(0)
                    if (diff.gt(max)) diff = max
                    player.s.buyables[12] = player.s.buyables[12].add(diff)
                }
            },
		},
		21: {
			title: "Symptom Base",
			cost(x=player[this.layer].buyables[this.id]) { // cost for buying xth buyable, can be an object if there are multiple currencies
                let cost = Decimal.pow(65, x.pow(1.35)).mul(new Decimal(1e20))
                return cost.floor()
            },
            base() { 
                let base = new Decimal(1.5)
                if (hasSUpg(45)) base = base.add(getSUpgEff(45))
                base = base.add(tmp.s.buyables[32].effect)
                return base
            },
            extra() {
                let extra = decimalZero
                extra = extra.add(tmp.s.buyables[33].total)
                if (hasSUpg(31) && !inChallenge("s", 21)) extra = extra.add(tmp.s.buyables[22].total)
                return extra
            },
            total() {
                let total = getBuyableAmount("s", 21).add(tmp[this.layer].buyables[this.id].extra)
                return total
            },
			effect() { // Effects of owning x of the items, x is a decimal
                let x = tmp.s.buyables[21].total
                let base = tmp.s.buyables[21].base
                if (inChallenge("s", 12)) x = decimalZero
                return Decimal.pow(base, x);
            },
			display() { // Everything else displayed in the buyable button after the title
                let extra = ""
                if (player.tab != "s") return 
                if (hasSUpg(31)) extra = "+" + formatWhole(tmp.s.buyables[21].extra)
                return "Multiply the symptom base by "+ format(this.base()) + ".\n\
                Cost: " + format(tmp[this.layer].buyables[this.id].cost)+" severity\n\
                Effect: " + format(tmp[this.layer].buyables[this.id].effect)+"x\n\
                Amount: " + formatWhole(getBuyableAmount("s", 21)) + extra
            },
            unlocked() { return player[this.layer].buyables[12].gte(1) }, 
            canAfford() {
                    return player.s.severity.gte(tmp[this.layer].buyables[this.id].cost)},
            buy() { 
                cost = tmp[this.layer].buyables[this.id].cost
                if (tmp[this.layer].buyables[this.id].canAfford) {
                    if (!hasMilestone("d", 4)) player.s.severity = player.s.severity.sub(cost).max(0)	
                    player[this.layer].buyables[this.id] = player[this.layer].buyables[this.id].add(1).max(1)
                }
            },
            buyMax(max) {
                let s = player.s.severity
                let target = Decimal.log10(s.div(1e20)).div(Decimal.log10(65)).pow(Decimal.pow(1.35,-1))
                target = target.ceil()
                let cost = Decimal.pow(65, target.sub(1).pow(1.35)).mul(1e20)
                let diff = target.sub(player.s.buyables[21])
                if (tmp[this.layer].buyables[this.id].canAfford) {
                    if (!hasMilestone("d", 4)) player.s.severity = player.s.severity.sub(cost).max(0)
                    if (diff.gt(max)) diff = max
                    player.s.buyables[21] = player.s.buyables[21].add(diff)
                }
            },
        },
        22: {
            title: "Uncoater Base",
            scalebase(){
                let base = new Decimal(5e3)
                if (hasSUpg(42)) base = base.div(getSUpgEff(42))
                return base
            },
			cost(x=player[this.layer].buyables[this.id]) { // cost for buying xth buyable, can be an object if there are multiple currencies
                let cost = Decimal.pow(this.scalebase(), x.pow(1.5)).mul(new Decimal(1e37))
                return cost.floor()
            },
            base() { 
                let b = player.points.add(10).max(10)
                b = Decimal.log10(b)
                return new Decimal(b)
            },
            extra() {
                let extra = decimalZero
                extra = extra.add(tmp.s.buyables[33].total)
                if (hasSUpg(44) && !inChallenge("s", 21)) extra = extra.add(tmp.s.buyables[23].total)
                return extra
            },
            total() {
                let total = getBuyableAmount("s", 22).add(tmp[this.layer].buyables[this.id].extra)
                return total
            },
			effect() { // Effects of owning x of the items, x is a decimal
                let x = tmp.s.buyables[22].total
                let base = tmp.s.buyables[22].base
                if (inChallenge("s", 12)) x = decimalZero
                return Decimal.pow(base, x);
            },
			display() { // Everything else displayed in the buyable button after the title
                let extra = ""
                if (player.tab != "s") return 
                if (hasSUpg(44)) extra = "+" + formatWhole(tmp.s.buyables[22].extra)
                return "Multiply the uncoater base by " + format(this.base())+" (based on cases)\n\
                Cost: " + format(tmp[this.layer].buyables[this.id].cost)+" severity\n\
                Effect: " + format(tmp[this.layer].buyables[this.id].effect)+"x\n\
                Amount: " + formatWhole(getBuyableAmount("s", 22)) + extra
            },
            unlocked() { return player[this.layer].buyables[21].gte(1) }, 
            canAfford() {
                    return player.s.severity.gte(tmp[this.layer].buyables[this.id].cost)},
            buy() { 
                cost = tmp[this.layer].buyables[this.id].cost
                if (tmp[this.layer].buyables[this.id].canAfford) {
                    if (!hasMilestone("d", 4)) player.s.severity = player.s.severity.sub(cost).max(0)	
                    player[this.layer].buyables[this.id] = player[this.layer].buyables[this.id].add(1).max(1)
                }
            },
            buyMax(max) {
                let s = player.s.severity
                let target = Decimal.log10(s.div(1e37)).div(Decimal.log10(this.scalebase())).pow(Decimal.pow(1.5,-1))
                target = target.ceil()
                let cost = Decimal.pow(this.scalebase(), target.sub(1).pow(1.5)).mul(1e37)
                let diff = target.sub(player.s.buyables[22])
                if (tmp[this.layer].buyables[this.id].canAfford) {
                    if (!hasMilestone("d", 4)) player.s.severity = player.s.severity.sub(cost).max(0)
                    if (diff.gt(max)) diff = max
                    player.s.buyables[22] = player.s.buyables[22].add(diff)
                }
            },
        },
        13: {
            title: "'Coated' Boost",
            scalebase(){
                let base = new Decimal(1e5)
                if (hasSUpg(41)) base = base.div(getSUpgEff(41))
                return base
            },
			cost(x=player[this.layer].buyables[this.id]) { // cost for buying xth buyable, can be an object if there are multiple currencies
                let cost = Decimal.pow(this.scalebase(), x.pow(1.5)).mul(new Decimal(2e164))
                return cost.floor()
            },
            base() { 
                let b = player.i.points.add(1).max(1)
                b = Decimal.log10(b).add(10).max(10)
                b = Decimal.log10(b).pow(0.8)
                return new Decimal(b)
            },
            extra() {
                let extra = decimalZero
                extra = extra.add(tmp.d.buyables[13].total)
                extra = extra.add(tmp.s.buyables[33].total)
                if (hasSUpg(44) && !inChallenge("s", 21)) extra = extra.add(tmp.s.buyables[23].total)
                return extra
            },
            total() {
                let total = getBuyableAmount("s", 13).add(tmp[this.layer].buyables[this.id].extra)
                return total
            },
			effect() { // Effects of owning x of the items, x is a decimal
                let x = tmp.s.buyables[13].total
                let base = tmp.s.buyables[13].base
                if (inChallenge("s", 12)) x = decimalZero
                return Decimal.mul(base, x).add(1).max(1);
            },
			display() { // Everything else displayed in the buyable button after the title
                let extra = ""
                if (player.tab != "s") return 
                if (hasSUpg(44)) extra = "+" + formatWhole(tmp.s.buyables[13].extra)
                return "Raise 'Coated' reward to ^(1+" + format(this.base())+"x) (based on infectivity)\n\
                Cost: " + format(tmp[this.layer].buyables[this.id].cost)+" severity\n\
                Effect: ^" + format(tmp[this.layer].buyables[this.id].effect)+"\n\
                Amount: " + formatWhole(getBuyableAmount("s", 13)) + extra
            },
            unlocked() { return hasMilestone("s", 3) }, 
            canAfford() {
                    return player.s.severity.gte(tmp[this.layer].buyables[this.id].cost)},
            buy() { 
                cost = tmp[this.layer].buyables[this.id].cost
                if (tmp[this.layer].buyables[this.id].canAfford) {
                    if (!hasMilestone("d", 4)) player.s.severity = player.s.severity.sub(cost).max(0)	
                    player[this.layer].buyables[this.id] = player[this.layer].buyables[this.id].add(1).max(1)
                }
            },
            buyMax(max) {
                let s = player.s.severity
                let target = Decimal.log10(s.div("2e164")).div(Decimal.log10(tmp.s.buyables[13].scalebase)).pow(Decimal.pow(1.5,-1))
                target = target.ceil()
                let cost = Decimal.pow(tmp.s.buyables[13].scalebase, target.sub(1).pow(1.5)).mul("2e164")
                let diff = target.sub(player.s.buyables[13])
                if (tmp[this.layer].buyables[this.id].canAfford) {
                    if (!hasMilestone("d", 4)) player.s.severity = player.s.severity.sub(cost).max(0)
                    if (diff.gt(max)) diff = max
                    player.s.buyables[13] = player.s.buyables[13].add(diff)
                }
            },
        },
        23: {
            title: "'Infection' Base",
            scalebase(){
                let base = new Decimal(1e10)
                if (hasSUpg(43)) base = base.div(getSUpgEff(43))
                return base
            },
			cost(x=player[this.layer].buyables[this.id]) { // cost for buying xth buyable, can be an object if there are multiple currencies
                let cost = Decimal.pow(this.scalebase(), x.pow(1.65)).mul(new Decimal(1e270))
                return cost.floor()
            },
            base() { 
                let b = player.v.points.add(10).max(10)
                b = Decimal.log10(b).pow(4)
                return new Decimal(b)
            },
            extra() {
                let extra = decimalZero
                extra = extra.add(tmp.s.buyables[33].total)
                return extra
            },
            total() {
                let total = getBuyableAmount("s", 23).add(tmp[this.layer].buyables[this.id].extra)
                return total
            },
			effect() { // Effects of owning x of the items, x is a decimal
                let x = tmp.s.buyables[23].total
                let base = tmp.s.buyables[23].base
                if (inChallenge("s", 12)) x = decimalZero
                return Decimal.pow(base, x);
            },
			display() { // Everything else displayed in the buyable button after the title
                let extra = ""
                if (player.tab != "s") return 
                if (player["s"].buyables[33].gte(1)) extra = "+" + formatWhole(tmp.s.buyables[23].extra)
                return "Multiply 'Infection' base by " + format(this.base())+". (based on VP)\n\
                Cost: " + format(tmp[this.layer].buyables[this.id].cost)+" severity\n\
                Effect: " + format(tmp[this.layer].buyables[this.id].effect)+"x\n\
                Amount: " + formatWhole(getBuyableAmount("s", 23)) + extra
            },
            unlocked() { return player[this.layer].buyables[13].gte(1) }, 
            canAfford() {
                return player.s.severity.gte(tmp[this.layer].buyables[this.id].cost)},
            buy() { 
                cost = tmp[this.layer].buyables[this.id].cost
                if (tmp[this.layer].buyables[this.id].canAfford) {
                    if (!hasMilestone("d", 4)) player.s.severity = player.s.severity.sub(cost).max(0)	
                    player[this.layer].buyables[this.id] = player[this.layer].buyables[this.id].add(1).max(1)
                }
            },
            buyMax(max) {
                let s = player.s.severity
                let target = Decimal.log10(s.div("e270")).div(Decimal.log10(this.scalebase())).pow(Decimal.pow(1.65,-1))
                target = target.ceil()
                let cost = Decimal.pow(this.scalebase(), target.sub(1).pow(1.65)).mul("e270")
                let diff = target.sub(player.s.buyables[23])
                if (tmp[this.layer].buyables[this.id].canAfford) {
                    if (!hasMilestone("d", 4)) player.s.severity = player.s.severity.sub(cost).max(0)
                    if (diff.gt(max)) diff = max
                    player.s.buyables[23] = player.s.buyables[23].add(diff)
                }
            },
        },
        31: {
            title: "Severity Boost",
            scalebase(){
                let base = new Decimal(1e100)
                return base
            },
			cost(x=player[this.layer].buyables[this.id]) { // cost for buying xth buyable, can be an object if there are multiple currencies
                let cost = Decimal.pow(this.scalebase(), x.pow(2)).mul(new Decimal(Decimal.pow(10,34e5)))
                return cost.floor()
            },
            base() { 
                let b = player.d.points.add(1).max(1)
                b = Decimal.pow(10,b.log10().pow(0.5)).pow(0.02)
                return b
            },
            extra() {
                let extra = decimalZero
                extra = extra.add(tmp.s.buyables[33].total)
                return extra
            },
            total() {
                let total = getBuyableAmount("s", 31).add(tmp[this.layer].buyables[this.id].extra)
                return total
            },
			effect() { // Effects of owning x of the items, x is a decimal
                let x = tmp.s.buyables[31].total
                let base = tmp.s.buyables[31].base
                if (inChallenge("s", 12)) x = decimalZero
                return Decimal.pow(base, x);
            },
			display() { // Everything else displayed in the buyable button after the title
                let extra = ""
                if (player.tab != "s") return 
                if (player["s"].buyables[33].gte(1)) extra = "+" + formatWhole(tmp.s.buyables[31].extra)
                return "Multiply 'Severity Gain' base by " + format(this.base())+"x (based on deaths)\n\
                Cost: " + format(tmp[this.layer].buyables[this.id].cost)+" severity\n\
                Effect: " + format(tmp[this.layer].buyables[this.id].effect)+"x\n\
                Amount: " + formatWhole(getBuyableAmount("s", 31)) + extra
            },
            unlocked() { return hasFUpg(21) }, 
            canAfford() {
                    return player.s.severity.gte(tmp[this.layer].buyables[this.id].cost)},
            buy() { 
                cost = tmp[this.layer].buyables[this.id].cost
                if (tmp[this.layer].buyables[this.id].canAfford) {
                    if (!hasMilestone("d", 4)) player.s.severity = player.s.severity.sub(cost).max(0)	
                    player[this.layer].buyables[this.id] = player[this.layer].buyables[this.id].add(1).max(1)
                }
            },
            buyMax(max) {
                let s = player.s.severity
                let target = Decimal.log10(s.div("e34e5")).div(Decimal.log10(this.scalebase())).pow(Decimal.pow(2,-1))
                target = target.ceil()
                let cost = Decimal.pow(this.scalebase(), target.sub(1).pow(2)).mul("e34e5")
                let diff = target.sub(player.s.buyables[31])
                if (tmp[this.layer].buyables[this.id].canAfford) {
                    if (!hasMilestone("d", 4)) player.s.severity = player.s.severity.sub(cost).max(0)
                    if (diff.gt(max)) diff = max
                    player.s.buyables[31] = player.s.buyables[31].add(diff)
                }
            },
        },
        32: {
            title: "Symptom Boost",
            scalebase(){
                let base = new Decimal(1e300)
                return base
            },
			cost(x=player[this.layer].buyables[this.id]) { // cost for buying xth buyable, can be an object if there are multiple currencies
                let cost = Decimal.pow(this.scalebase(), x.pow(2)).mul(Decimal.pow(10,3573000))
                return cost.floor()
            },
            base() { 
                let b = player.f.points.add(10).max(10)
                let s = player.s.severity.add(10).max(10)
                b = Decimal.pow(10,b.log10().pow(1.25)).pow(0.03).pow(s.log10().pow(0.17)).div(20)
                if (b.gte(1e300)) b = b.div(1e300).pow(0.1).mul(1e300)
                if (b.gte("ee4")) b = Decimal.pow(10,b.div("ee4").log10().pow(0.8)).mul("ee4")
                return b
            },
            extra() {
                let extra = decimalZero
                extra = extra.add(tmp.s.buyables[33].total)
                return extra
            },
            total() {
                let total = getBuyableAmount("s", 32).add(tmp[this.layer].buyables[this.id].extra)
                return total
            },
			effect() { // Effects of owning x of the items, x is a decimal
                let x = tmp.s.buyables[32].total
                let base = tmp.s.buyables[32].base
                if (inChallenge("s", 12)) x = decimalZero
                return Decimal.mul(base, x);
            },
			display() { // Everything else displayed in the buyable button after the title
                let extra = ""
                if (player.tab != "s") return 
                if (player["s"].buyables[33].gte(1)) extra = "+" + formatWhole(tmp.s.buyables[32].extra)
                return "Increase 'Symptom Base' base by " + format(this.base())+" (based on fatality and severity)\n\
                Cost: " + format(tmp[this.layer].buyables[this.id].cost)+" severity\n\
                Effect: +" + format(tmp[this.layer].buyables[this.id].effect)+"\n\
                Amount: " + formatWhole(getBuyableAmount("s", 32)) + extra
            },
            unlocked() { return player["s"].buyables[31].gte(1) }, 
            canAfford() {
                    return player.s.severity.gte(tmp[this.layer].buyables[this.id].cost)},
            buy() { 
                cost = tmp[this.layer].buyables[this.id].cost
                if (tmp[this.layer].buyables[this.id].canAfford) {
                    if (!hasMilestone("d", 4)) player.s.severity = player.s.severity.sub(cost).max(0)	
                    player[this.layer].buyables[this.id] = player[this.layer].buyables[this.id].add(1).max(1)
                }
            },
            buyMax(max) {
                let s = player.s.severity
                let target = Decimal.log10(s.div(Decimal.pow(10,3573000))).div(Decimal.log10(this.scalebase())).pow(Decimal.pow(2,-1))
                target = target.ceil()
                let cost = Decimal.pow(this.scalebase(), target.sub(1).pow(2)).mul(Decimal.pow(10,3573000))
                let diff = target.sub(player.s.buyables[32])
                if (tmp[this.layer].buyables[this.id].canAfford) {
                    if (!hasMilestone("d", 4)) player.s.severity = player.s.severity.sub(cost).max(0)
                    if (diff.gt(max)) diff = max
                    player.s.buyables[32] = player.s.buyables[32].add(diff)
                }
            },
        },
        33: {
            title: "Severity Exponent",
            scalebase(){
                let base = Decimal.pow(10,500)
                return base
            },
			cost(x=player[this.layer].buyables[this.id]) { // cost for buying xth buyable, can be an object if there are multiple currencies
                let cost = Decimal.pow(this.scalebase(), x.pow(2.2)).mul(Decimal.pow(10,388e4))
                return cost.floor()
            },
            base() { 
                let b = player.points.add(10).max(10)
                let s = player.i.points.add(10).max(10)
                b = Decimal.pow(10,b.log10().pow(0.12)).pow(0.03).pow(s.log10().pow(0.005)).div(100)
                return b
            },
            extra() {
                let extra = decimalZero
                return extra
            },
            total() {
                let total = getBuyableAmount("s", 33).add(tmp[this.layer].buyables[this.id].extra)
                return total
            },
			effect() { // Effects of owning x of the items, x is a decimal
                let x = tmp.s.buyables[33].total
                let base = tmp.s.buyables[33].base
                if (inChallenge("s", 12)) x = decimalZero
                return Decimal.mul(base, x).add(1).max(1);
            },
			display() { // Everything else displayed in the buyable button after the title
                let extra = ""
                if (player.tab != "s") return 
                return "Increase severity gain exponent by " + format(this.base())+" (based on cases and infectivity) and gives free levels to all previous buyables\n\
                Cost: " + format(tmp[this.layer].buyables[this.id].cost)+" severity\n\
                Effect: ^" + format(tmp[this.layer].buyables[this.id].effect)+"\n\
                Amount: " + formatWhole(getBuyableAmount("s", 33)) + extra
            },
            unlocked() { return player["s"].buyables[32].gte(1) }, 
            canAfford() {
                    return player.s.severity.gte(tmp[this.layer].buyables[this.id].cost)},
            buy() { 
                cost = tmp[this.layer].buyables[this.id].cost
                if (tmp[this.layer].buyables[this.id].canAfford) {
                    if (!hasMilestone("d", 4)) player.s.severity = player.s.severity.sub(cost).max(0)	
                    player[this.layer].buyables[this.id] = player[this.layer].buyables[this.id].add(1).max(1)
                }
            },
            buyMax(max) {
                let s = player.s.severity
                let target = Decimal.log10(s.div("e388e4")).div(Decimal.log10(this.scalebase())).pow(Decimal.pow(2.2,-1))
                target = target.ceil()
                let cost = Decimal.pow(this.scalebase(), target.sub(1).pow(2.2)).mul("e388e4")
                let diff = target.sub(player.s.buyables[33])
                if (tmp[this.layer].buyables[this.id].canAfford) {
                    if (!hasMilestone("d", 4)) player.s.severity = player.s.severity.sub(cost).max(0)
                    if (diff.gt(max)) diff = max
                    player.s.buyables[33] = player.s.buyables[33].add(diff)
                }
            },
        },
    },
    upgrades: {
        rows: 5,
        cols: 5,
        11: {
            title: "Cough",
            description: "Severity boosts uncoaters 1st effect base.",
            cost: new Decimal(5e3),
            currencyDisplayName: "severity",
            currencyInternalName: "severity",
            currencyLayer: "s",
            effect(){
            let s11 = player.s.severity.add(10).max(10)
            s11 = Decimal.log10(s11)
            s11 = s11.pow(2).add(10).max(10)
            if (inChallenge("s", 11) || inChallenge("s", 21)) s11 = decimalOne
            return s11
            },
            effectDisplay(){
            return format(getSUpgEff(11))+"x"
            },
        },
        12: {
            title: "Fever",
            description: "Uncoaters 2nd effect is boosted by bought symptom upgrades.",
            cost: decimalTwo,
            effect(){
            let s12 = player.s.upgrades.length
            if (hasDUpg(34)) s12 += player.d.upgrades.length*2
            s12 = Decimal.div(s12, 2.85).pow(0.3)
            s12 = s12.mul(1.5).add(0.7)
            if (inChallenge("s", 21)) s12 = decimalOne
            return s12
            },
            effectDisplay(){
            return format(getSUpgEff(12))+"x"
            },
            unlocked(){
            return hasSUpg(11)
            }
        },
        13: {
            title: "Tiredness",
            description: "Symptoms boost uncoaters 1st effect base.",
            cost: new Decimal(3e7),
            currencyDisplayName: "severity",
            currencyInternalName: "severity",
            currencyLayer: "s",
            effect(){
            let s13 = player.s.points.add(1).max(1)
            s13 = s13.pow(3.75)
            if (inChallenge("s", 11) || inChallenge("s", 21)) s13 = decimalOne
            return s13
            },
            effectDisplay(){
            return format(getSUpgEff(13))+"x"
            },
            unlocked(){
                return hasSUpg(12)
            }
        },
        14: {
            title: "Pain",
            description: "Infectivity boost severity gain.",
            cost: new Decimal(77777777),
            currencyDisplayName: "severity",
            currencyInternalName: "severity",
            currencyLayer: "s",
            effect(){
            let s14 = player.i.points.add(1).max(1)
            s14 = s14.pow(new Decimal(3e-4))
            if (s14.gte(Decimal.pow(10,5000))) s14 = s14.div(Decimal.pow(10,5000)).pow(0.1).mul(Decimal.pow(10,5000))
            if (inChallenge("s", 21)) s14 = decimalOne
            return s14
            },
            effectDisplay(){
                let dis = format(getSUpgEff(14))+"x"
                if (tmp.s.upgrades[14].effect.gte(Decimal.pow(10,5000))) dis += " (softcapped)"
                return dis
            },
            unlocked(){
                return hasSUpg(13)
            }
        },
        15: {
            title: "Sore Throat",
            description: "Severity boosts replicators 1st effect base.",
            cost: new Decimal(1.5e12),
            currencyDisplayName: "severity",
            currencyInternalName: "severity",
            currencyLayer: "s",
            effect(){
            let s15 = player.s.severity.add(1).max(1)
            s15 = s15.pow(0.3)
            if (s15.gte(Decimal.pow(10,1e45))) s15 = Decimal.pow(10,s15.div(Decimal.pow(10,1e45)).log10().pow(0.8)).mul(Decimal.pow(10,1e45))
            if (inChallenge("s", 11) || inChallenge("s", 21)) s15 = decimalOne
            return s15
            },
            effectDisplay(){
            return format(getSUpgEff(15))+"x"
            },
            unlocked(){
                return hasSUpg(14)
            }
        },
        21: {
            title: "Chills",
            description: "'Fever' boosts severity effect.",
            cost: new Decimal(1e15),
            currencyDisplayName: "severity",
            currencyInternalName: "severity",
            currencyLayer: "s",
            effect(){
            let s21 = getSUpgEff(12)
            s21 = s21.pow(2).add(1.8)
            if (inChallenge("s", 21)) s21 = decimalOne
            return s21
            },
            effectDisplay(){
            return "^"+format(getSUpgEff(21))
            },
            unlocked(){
                return hasSUpg(15)
            }
        },
        22: {
            title: "Headache",
            description: "'Infectivity Gain' gives free levels to 'Severity Gain'.",
            cost: new Decimal(2.22e22),
            currencyDisplayName: "severity",
            currencyInternalName: "severity",
            currencyLayer: "s",
            unlocked(){
                return hasSUpg(21)
            }
        },
        23: {
            title: "Diarrhea",
            description: "'Symptom Base' gives free levels to 'Severity Gain'.",
            cost: new Decimal(5e38),
            currencyDisplayName: "severity",
            currencyInternalName: "severity",
            currencyLayer: "s",
            unlocked(){
                return hasSUpg(22)
            }
        },
        24: {
            title: "Conjunctivitis",
            description: "Symptoms boost 'Infection' base.",
            cost: new Decimal(7),
            effect(){
            let s24 = player.s.points
            s24 = Decimal.pow(1e4,s24)
            if (inChallenge("s", 11) || inChallenge("s", 21)) s24 = decimalOne
            return s24
            },
            effectDisplay(){
            return format(getSUpgEff(24))+"x"
            },
            unlocked(){
                return hasSUpg(23)
            }
        },
        25: {
            title: "Taste Loss",
            description: "'Uncoater Base' gives free levels to 'Infectivity Gain'.",
            cost: new Decimal(5e58),
            currencyDisplayName: "severity",
            currencyInternalName: "severity",
            currencyLayer: "s",
            unlocked(){
                return hasSUpg(24)
            }
        },
        31: {
            title: "Smell Loss",
            description: "'Uncoater Base' gives free levels to 'Symptom Base' and autobuy buyables once per second.",
            cost: new Decimal(1e63),
            currencyDisplayName: "severity",
            currencyInternalName: "severity",
            currencyLayer: "s",
            unlocked(){
                return hasSUpg(25)
            }
        },
        32: {
            title: "Skin Rash",
            description: "Replicators boost severity gain.",
            cost: new Decimal(5e164),
            currencyDisplayName: "severity",
            currencyInternalName: "severity",
            currencyLayer: "s",
            effect(){
                let s32 = player.r.points
                s32 = Decimal.pow(1.02, s32)
                if (inChallenge("s", 21)) s32 = decimalOne
                return s32
            },
            effectDisplay(){
                return format(getSUpgEff(32))+"x"
            },
            unlocked(){
                return hasSUpg(31)
            }
        },
        33: {
            title: "Discoloration",
            description: "'Severity Gain' base is increased by 0.0002 per level.",
            cost: new Decimal(15e271),
            currencyDisplayName: "severity",
            currencyInternalName: "severity",
            currencyLayer: "s",
            effect(){
                let s32 = tmp.s.buyables[11].total.div(5e3)
                if (hasChallenge("s", 21)) s32 = s32.mul(challengeEffect("s", 21))
                if (inChallenge("s", 21)) s32 = decimalOne
                return s32
            },
            effectDisplay(){
                return "+"+format(getSUpgEff(33))
            },
            unlocked(){
                return hasSUpg(32)
            }
        },
        34: {
            title: "Shortness of Breath",
            description: "'Coated Boost' gives free 'Infectivity gain'.",
            cost: Decimal.pow(10,54490),
            currencyDisplayName: "severity",
            currencyInternalName: "severity",
            currencyLayer: "s",
            unlocked(){
                return hasDUpg(34)
            }
        },
        35: {
            title: "Chest Pain",
            description: "Cases boost symptom base.",
            cost: Decimal.pow(10,60100),
            currencyDisplayName: "severity",
            currencyInternalName: "severity",
            currencyLayer: "s",
            effect(){
                let s32 = player.points.add(10).max(10)
                s32 = s32.log10().pow(5)
                if (inChallenge("s", 21)) s32 = decimalOne
                return s32
            },
            effectDisplay(){
                return format(getSUpgEff(35))+"x"
            },
            unlocked(){
                return hasSUpg(34)
            }
        },
        41: {
            title: "Speech Loss",
            description: "Deaths reduce 'Coated Boost' scaling base.",
            cost: Decimal.pow(10,7e4),
            currencyDisplayName: "severity",
            currencyInternalName: "severity",
            currencyLayer: "s",
            effect(){
                let s32 = player.d.points.add(10).max(10)
                s32 = s32.log10().pow(1.2)
                if (inChallenge("s", 21)) s32 = decimalOne
                return s32.min(7e4)
            },
            effectDisplay(){
                return format(getSUpgEff(41))+"x"
            },
            unlocked(){
                return hasSUpg(35)
            }
        },
        42: {
            title: "Movement Loss",
            description: "Severity reduces 'Uncoater Base' scaling base.",
            cost: Decimal.pow(10,87700),
            currencyDisplayName: "severity",
            currencyInternalName: "severity",
            currencyLayer: "s",
            effect(){
                let s32 = player.s.severity.add(10).max(10)
                s32 = s32.log10().pow(0.27)
                if (inChallenge("s", 21)) s32 = decimalOne
                return s32.min(1e3)
            },
            effectDisplay(){
                return format(getSUpgEff(42))+"x"
            },
            unlocked(){
                return hasSUpg(41)
            }
        },
        43: {
            title: "Pneumonia",
            description: "Cases reduce 'Infection Base' scaling base.",
            cost: Decimal.pow(10,133420),
            currencyDisplayName: "severity",
            currencyInternalName: "severity",
            currencyLayer: "s",
            effect(){
                let s32 = player.points.add(10).max(10)
                s32 = s32.log10().add(10).max(10)
                s32 = s32.log10().pow(5).mul(3333)
                if (inChallenge("s", 21)) s32 = decimalOne
                return s32.min(3e9)
            },
            effectDisplay(){
                return format(getSUpgEff(43))+"x"
            },
            unlocked(){
                return hasSUpg(42)
            }
        },
        44: {
            title: "Fatigue",
            description: "'Infection Base' gives free 'Coated Boost' and 'Uncoater Base'.",
            cost: Decimal.pow(10,146060),
            currencyDisplayName: "severity",
            currencyInternalName: "severity",
            currencyLayer: "s",
            unlocked(){
                return hasSUpg(43)
            }
        },
        45: {
            title: "Congestion",
            description: "Each 'Infection Base' adds 0.0001 to 'Symptom Base' base.",
            cost: Decimal.pow(10,191185),
            currencyDisplayName: "severity",
            currencyInternalName: "severity",
            currencyLayer: "s",
            effect(){
                let s32 = tmp.s.buyables[23].total.div(1e4)
                return s32
            },
            effectDisplay(){
                return "+"+format(getSUpgEff(45))
            },
            unlocked(){
                return hasSUpg(44)
            }
        },
        51: {
            title: "Muscle Aches",
            description: "Cases boost severity effect.",
            cost: Decimal.pow(10,215350),
            currencyDisplayName: "severity",
            currencyInternalName: "severity",
            currencyLayer: "s",
            effect(){
                let s32 = player.points.add(10).max(10)
                s32 = s32.log10().add(1).max(1).log10()
                return s32
            },
            effectDisplay(){
                return "^"+format(getSUpgEff(51))
            },
            unlocked(){
                return hasSUpg(45)
            }
        },
        52: {
            title: "Nausea",
            description: "Infectivity boosts 'Deadly'.",
            cost: Decimal.pow(10,225315),
            currencyDisplayName: "severity",
            currencyInternalName: "severity",
            currencyLayer: "s",
            effect(){
                let s32 = player.i.points.add(10).max(10)
                s32 = s32.log10().pow(0.23)
                return s32
            },
            effectDisplay(){
                return "^"+format(getSUpgEff(52))
            },
            unlocked(){
                return hasSUpg(51)
            }
        },
        53: {
            title: "Asthma",
            description() {
                let des =  "Uncoaters reduce recovery effect exponent."
                if (hasDUpg(42)) des =  "Uncoaters boost severity gain exponent."
                return des
            },
            cost: Decimal.pow(10,301777),
            currencyDisplayName: "severity",
            currencyInternalName: "severity",
            currencyLayer: "s",
            effect(){
                let s32 = player.u.points.add(10).max(10)
                s32 = s32.log10().pow(-0.1)
                if (hasDUpg(42)) s32 = s32.pow(-1)
                return s32
            },
            effectDisplay(){
                return "^"+format(getSUpgEff(53))
            },
            unlocked(){
                return hasSUpg(52)
            }
        },
        54: {
            title: "Cancer",
            description() {
                let des =  "Replicators reduce recovery effect exponent."
                if (hasDUpg(42)) des =  "Replicators boost severity gain exponent."
                return des
            },
            cost: Decimal.pow(10,435630),
            currencyDisplayName: "severity",
            currencyInternalName: "severity",
            currencyLayer: "s",
            effect(){
                let s32 = player.r.points.add(10).max(10)
                s32 = s32.log10().pow(-0.05)
                if (hasDUpg(42)) s32 = s32.pow(-1)
                return s32
            },
            effectDisplay(){
                return "^"+format(getSUpgEff(54))
            },
            unlocked(){
                return hasSUpg(53)
            }
        },
        55: {
            title: "Heart Failure",
            description: "Severity boosts 'Transmission', 'Smell Loss' buys 25x more, and unlock a row of death upgrades.",
            cost: Decimal.pow(10,545766),
            currencyDisplayName: "severity",
            currencyInternalName: "severity",
            currencyLayer: "s",
            effect(){
                let s32 = player.s.severity.add(10).max(10)
                s32 = s32.log10().pow(0.12)
                return s32
            },
            effectDisplay(){
                return "^"+format(getSUpgEff(55))
            },
            unlocked(){
                return hasSUpg(54)
            }
        },
    },
    challenges: { // Order: 1x1,2x1,1x2,3x1,2x2,1x3,4x1,1x4,2x3,3x2,4x2,3x3,2x4,1x5,4x3,3x4,4x4,2x5,3x5,4x5
        rows: 2,
        cols: 2,
        11: {
            name: "Asymptomatic",
            currencyDisplayName: "cases",
            challengeDescription: function() {
                let c11 = "Symptoms and severity are useless. Cases gain is ^0.1."
                if (inChallenge("s", 11)) c11 = c11 + " (In Challenge)"
                if (challengeCompletions("s", 11) == 5) c11 = c11 + " (Completed)"
                c11 = c11 + "<br>Completed:" + challengeCompletions("s",11) + "/" + this.completionLimit
                return c11
            },
            goal(){
                if (challengeCompletions("s", 11) == 0) return Decimal.pow(10,78000);
                if (challengeCompletions("s", 11) == 1) return Decimal.pow(10,107500);
                if (challengeCompletions("s", 11) == 2) return Decimal.pow(10,285000);
                if (challengeCompletions("s", 11) == 3) return Decimal.pow(10,3e6);
                if (challengeCompletions("s", 11) == 4) return Decimal.pow(10,893e4);
            },
            onStart(testInput=false) { 
                if (testInput) {
                    doReset("i")
                    player.v.upgrades = []
                    player.s.ct = 0
                    player.i.points = decimalZero
                    player.r.points = decimalZero
                    player.v.points = decimalZero
                    player.points = decimalZero
                }
            },
            completionLimit: 5,
            rewardDescription: "Cases boost severity gain.",
            rewardEffect() {
                 let c11 = player.points.add(1).max(1)
                 let c11r = new Decimal(0.38)
                 let c11c = challengeCompletions("s", 11)
                 c11r = Decimal.add(c11r, Decimal.div(c11c, 50))
                 let c11r2 = new Decimal(0.3)
                 if (c11c >= 4) c11r2 = Decimal.sub(0.6, Decimal.div(c11c, 11))
                 if (c11c == 5) c11r = c11r.add(0.007)
                 c11 = Decimal.pow(10, Decimal.log10(c11).pow(c11r)).pow(c11r2)
                 return c11
            },
            rewardDisplay() {return format(this.rewardEffect())+"x"},
            unlocked(){
                return hasMilestone("d", 8)
            }
        },
        12: {
            name: "Unbuyable",
            currencyDisplayName: "cases",
            challengeDescription: function() {
                let c12 = "Symptom buyables are useless. Cases gain is ^0.01."
                if (inChallenge("s", 12)) c12 = c12 + " (In Challenge)"
                if (challengeCompletions("s", 12) == 5) c12 = c12 + " (Completed)"
                c12 = c12 + "<br>Completed:" + challengeCompletions("s",12) + "/" + this.completionLimit
                return c12
            },
            goal(){
                if (challengeCompletions("s", 12) == 0) return Decimal.pow(10,5640);
                if (challengeCompletions("s", 12) == 1) return Decimal.pow(10,13600);
                if (challengeCompletions("s", 12) == 2) return Decimal.pow(10,86400);
                if (challengeCompletions("s", 12) == 3) return Decimal.pow(10,154000);
                if (challengeCompletions("s", 12) == 4) return Decimal.pow(10,327000);
            },
            onStart(testInput=false) { 
                if (testInput) {
                    doReset("i")
                    player.v.upgrades = []
                    player.s.ct = 0
                    player.i.points = decimalZero
                    player.r.points = decimalZero
                    player.v.points = decimalZero
                    player.points = decimalZero
                }
            },
            completionLimit: 5,
            rewardDescription: "Infectivity boosts death gain.",
            rewardEffect() {
                 let c12 = player.points.add(1).max(1)
                 let c12r = new Decimal(0.33)
                 let c12c = challengeCompletions("s", 12)
                 c12r = Decimal.add(c12r, Decimal.div(c12c, 5))
                 c12 = Decimal.log10(c12).pow(c12r).div(100).max(1)
                 return c12
            },
            rewardDisplay() {return format(this.rewardEffect())+"x"},
            unlocked(){
                return hasChallenge("s", 11)
            }
        },
        21: {
            name: "Row 3 Downgrade",
            currencyDisplayName: "cases",
            challengeDescription: function() {
                let c12 = "Row 3 Upgrades are useless. Cases gain is ^0.03."
                if (inChallenge("s", 21)) c12 = c12 + " (In Challenge)"
                if (challengeCompletions("s", 21) == 5) c12 = c12 + " (Completed)"
                c12 = c12 + "<br>Completed:" + challengeCompletions("s",21) + "/" + this.completionLimit
                return c12
            },
            goal(){
                if (challengeCompletions("s", 21) == 0) return Decimal.pow(10,4660);
                if (challengeCompletions("s", 21) == 1) return Decimal.pow(10,34100);
                if (challengeCompletions("s", 21) == 2) return Decimal.pow(10,44640);
                if (challengeCompletions("s", 21) == 3) return Decimal.pow(10,64500);
                if (challengeCompletions("s", 21) == 4) return Decimal.pow(10,89100);
            },
            onStart(testInput=false) { 
                if (testInput) {
                    doReset("i")
                    player.v.upgrades = []
                    player.s.ct = 0
                    player.i.points = decimalZero
                    player.r.points = decimalZero
                    player.v.points = decimalZero
                    player.points = decimalZero
                }
            },
            completionLimit: 5,
            rewardDescription: "Deaths boost 'Discoloration'.",
            rewardEffect() {
                 let c12 = player.d.points.add(10).max(10)
                 let c12r = new Decimal(0.07)
                 let c12c = challengeCompletions("s", 21)
                 c12r = Decimal.add(c12r, Decimal.div(c12c, 15))
                 c12 = Decimal.log10(c12).pow(c12r)
                 return c12
            },
            rewardDisplay() {return format(this.rewardEffect())+"x"},
            unlocked(){
                return hasChallenge("s", 12)
            }
        },
        22: {
            name: "Symptomless Symptoms",
            currencyDisplayName: "cases",
            challengeDescription: function() {
                let c12 = "'Asymptomatic' and 'Unbuyable' at once."
                if (inChallenge("s", 22)) c12 = c12 + " (In Challenge)"
                if (challengeCompletions("s", 22) == 5) c12 = c12 + " (Completed)"
                c12 = c12 + "<br>Completed:" + challengeCompletions("s",22) + "/" + this.completionLimit
                return c12
            },
            goal(){
                if (challengeCompletions("s", 22) == 0) return Decimal.pow(10,1020);
                if (challengeCompletions("s", 22) == 1) return Decimal.pow(10,2170);
                if (challengeCompletions("s", 22) == 2) return Decimal.pow(10,4720);
                if (challengeCompletions("s", 22) == 3) return Decimal.pow(10,5850);
                if (challengeCompletions("s", 22) == 4) return Decimal.pow(10,12715);
            },
            onStart(testInput=false) { 
                if (testInput) {
                    doReset("i")
                    player.v.upgrades = []
                    player.s.ct = 0
                    player.i.points = decimalZero
                    player.r.points = decimalZero
                    player.v.points = decimalZero
                    player.points = decimalZero
                }
            },
            countsAs: [11,12],
            completionLimit: 5,
            rewardDescription() {
                let des =  "Severity reduces the recovery effect."
                if (hasDUpg(42)) des =  "Severity boosts severity gain."
                return des
            },
            rewardEffect() {
                 let c12 = player.s.severity.add(10).max(10)
                 let c12r = new Decimal(0.02)
                 let c12c = challengeCompletions("s", 22)
                 c12r = Decimal.add(c12r, Decimal.div(c12c, 200))
                 c12 = Decimal.log10(c12).pow(-c12r)
                 if (hasDUpg(42)) c12 = c12.pow(-1)
                 return c12
            },
            rewardDisplay() {return "^"+format(this.rewardEffect())},
            unlocked(){
                return hasChallenge("s", 21)
            }
        },
    },
})
