addLayer("u", {
    name: "uncoaters",
    symbol: "U",
    position: 0,
    startData() { return {
        points: decimalZero,
        best: decimalZero,
        total: decimalZero,
        auto: false,
    unlocked: false
    }},
    color: "#3fa3d3",
    requires: new Decimal(5e116),
    resource: "uncoaters",
    resourceSingular: "uncoater",
    baseResource: "infectivity",
    baseAmount() { 
        return player.i.points
    },
    type: "static",
    exponent() {
        let exp = new Decimal(3.2)
        return exp
    },
    base() {
        let base = new Decimal(1e10)
        return base
    },
    branches: ["i","r"],
    hotkeys: [
        {
            key:"u", description: "U:Reset for uncoaters", onPress() {
                if (canReset(this.layer))
                    doReset(this.layer)
            }
        },
    ],
    tabFormat: {
        "Main": {
        content:[
            function() {if (player.tab == "u") return "main-display"},
            "prestige-button",
            function() {if (player.tab == "u") return "resource-display"},
            "blank",
            "upgrades"
            ]
        },
        "Milestones": {
            content:[
                function() {if (player.tab == "u") return "main-display"},
            "prestige-button",
            function() {if (player.tab == "u") return "resource-display"},
            "blank",
            "milestones"
            ],
        },
        "Challenges": {
            content:[
                function() {if (player.tab == "u") return "main-display"},
            "prestige-button",
            function() {if (player.tab == "u") return "resource-display"},
            "blank",
                "challenges"
            ],
            unlocked() {return hasMilestone("u",6)}
        },
    },
    effbase() {
        let eff = new Decimal(30)
        if(hasUUpg(13)) eff = eff.mul(upgradeEffect("u",13).u)
        if(hasSUpg(11)) eff = eff.mul(getSUpgEff(11))
        if(hasSUpg(13)) eff = eff.mul(getSUpgEff(13))
        if(hasDUpg(21)) eff = eff.mul(getDUpgEff(21))
        if (getBuyableAmount("s", 22).gte(1)) eff = eff.mul(tmp.s.buyables[22].effect.add(1).max(1))
        return eff
    },
    effect(){
        let eff =tmp.u.effbase
        eff = eff.pow(player.u.points)
        if(hasFUpg(54)) eff = eff.pow(getFUpgEff(54))
        if (eff.gte(Decimal.pow(10,Decimal.pow(10,15e3)))) eff = eff.log10().mul(Decimal.pow(10,5e3)).pow(Decimal.pow(10,14995).mul(5))
        if (inChallenge("u", 11)) eff = decimalOne
        return eff
    },
    effect2(){
        let eff2 = player.u.points.add(10).max(10)
        eff2 = Decimal.log10(eff2).pow(3)
        if(hasSUpg(12)) eff2 = eff2.mul(getSUpgEff(12))
        if(hasUUpg(23)) eff2 = eff2.pow(getUUpgEff(23))
        if (eff2.gte(Decimal.pow(10,1e4))) eff2 = Decimal.pow(10,eff2.div(Decimal.pow(10,1e4)).log10().pow(0.5)).mul(Decimal.pow(10,1e4))
        if (eff2.gte(Decimal.pow(10,Decimal.pow(10,1e15)))) eff2 = Decimal.pow(10,eff2.div(Decimal.pow(10,Decimal.pow(10,1e15))).log10().pow(0.3)).mul(Decimal.pow(10,Decimal.pow(10,1e15)))
        if (eff2.gte(Decimal.pow(10,Decimal.pow(10,1e52)))) eff2 = eff2.div(Decimal.pow(10,Decimal.pow(10,1e52))).log10().log10().pow(0.85).pow10().pow10().mul(Decimal.pow(10,Decimal.pow(10,1e52)))
        if (inChallenge("u", 11)) eff2 = decimalOne
        return eff2
    },
    effectDescription() {
        return "which "+pluralize(player.u.points,'boosts','boost',true)+" cases and infectivity by "+layerText("h2", "u", format(tmp.u.effect))+", and "+pluralize(player.u.points,'boosts','boost',true)+" 'Uncoating' by "+layerText("h2", "u", format(tmp.u.effect2))
    },
    gainMult() {
        umult = decimalOne
        if (hasChallenge("u", 11)) umult = umult.div(challengeEffect("u", 11))
        return umult
    },
    gainExp() {
        return decimalOne
    },
    directMult () {
        let gain = tmp.Uu.effect
        return gain
    },
    row: 2,
    layerShown() {
        let shown = hasIUpg(33)
        if(player.u.unlocked) shown = true
        return shown && player.uv.tree == "normal"
    },
    doReset(resettingLayer) {
        let keep = [];
        if (resettingLayer=="d") {
            if (hasMilestone("d",0)) keep.push("milestones")
            if (hasMilestone("d",6)) keep.push("upgrades")
            if (hasMilestone("d",3)) keep.push("challenges")
        }
        if (hasMilestone("a", 0)) {
            keep.push("upgrades")
            keep.push("milestones")
        }
        if (hasMilestone("f", 0) || hasMilestone("a", 1)) keep.push("challenges")
        if (layers[resettingLayer].row > this.row || resettingLayer=="d") layerDataReset(this.layer, keep)
    },
    autoPrestige() { return (hasMilestone("d", 2) && player.d.auto) },
    canBuyMax() { return hasMilestone("d", 1)},
    resetsNothing() { return hasMilestone("d", 5) },
    milestones: {
        0: {
            requirementDescription: "2 uncoaters",
            effectDescription: "Keep Infectivity/Replicator milestones on reset.",
            done() { return player.u.points.gte(2) }
        },
        2: {
            requirementDescription: "3 uncoaters",
            effectDescription: "Gain 100% of infectivity gain per second.",
            done() { return player.u.points.gte(3) }
        },
        3: {
            requirementDescription: "6 uncoaters",
            effectDescription: "Keep Infectivity/Replicator upgrades on reset.",
            done() { return player.u.points.gte(6) }
        },
        4: {
            requirementDescription: "8 uncoaters",
            effectDescription: "Autobuy replicators.",
            toggles: [["u", "auto"]],
            done() { return player.u.points.gte(8) }
        },
        5: {
            requirementDescription: "10 uncoaters",
            effectDescription: "Replicators reset nothing.",
            done() { return player.u.points.gte(10) }
        },
        6: {
            requirementDescription: "15 uncoaters",
            effectDescription: "Unlock uncoater challenges.",
            done() { return player.u.points.gte(15) }
        },
    },
    upgrades: {
        rows: 2,
        cols: 4,
        11: {
            title: "Uncoated Infection",
            description: "Best uncoaters boosts 'Infection' base.",
            cost: decimalTwo,
            effect(){
            let u11 = player.u.best.add(1).max(1)
            u11 = u11.pow(4.5)
            if (inChallenge("u", 11) || inChallenge("s", 21)) u11 = decimalOne
            return u11
            },
            effectDisplay(){
            return format(getUUpgEff(11))+"x"
            },
        },
        12: {
            title: "Water Transmission",
            description: "'Transmission' softcap starts later based on uncoaters and replicators.",
            cost: decimalThree,
            effect(){
            let u12 = tmp.u.effect.pow(7.5)
            let rep = player.r.points
            u12 = u12.pow(rep.div(10).add(1).max(1))
            if (inChallenge("u", 11) || inChallenge("u", 21) || inChallenge("s", 21)) u12 = decimalOne
            if (u12.gte(Decimal.pow(10,1500))) u12 = u12.div(Decimal.pow(10,1500)).pow(0.3).mul(Decimal.pow(10,1500))
            if (u12.gte(Decimal.pow(10,15000))) u12 = Decimal.pow(10,u12.div(Decimal.pow(10,1500)).log10().pow(2/3)).mul(Decimal.pow(10,15000))
            if (u12.gte(Decimal.pow(10,1e17))) u12 = Decimal.pow(10,u12.div(Decimal.pow(10,1e17)).log10().pow(0.93)).mul(Decimal.pow(10,1e17))
            if (u12.gte(Decimal.pow(10,1e70))) u12 = Decimal.pow(10,u12.div(Decimal.pow(10,1e70)).log10().pow(0.9)).mul(Decimal.pow(10,1e70))
            if (u12.gte(Decimal.pow(10,Decimal.pow(10,1e3)))) u12 = u12.log10().pow(Decimal.pow(10,997))
            return u12
            },
            effectDisplay(){
                let u12dis = format(getUUpgEff(12))+"x"
                if (tmp.u.upgrades[12].effect.gte(Decimal.pow(10,1500))) u12dis = u12dis + " (softcapped)"
                return u12dis
            },
            unlocked(){
                return hasUUpg(11)
            }
        },
        13: {
            title: "Synergy",
            description: "Uncoaters and replicators boost each other .",
            cost: decimalFour,
            effect(){
                let u13 = player.u.points.add(1).max(1)
                let u13b = player.r.points.add(1).max(1)
                u13 = u13.pow(2.2)
                u13b = u13b.pow(0.63)
                if (hasMilestone("Ui", 5)) {
                    u13 = u13.pow(10)
                    u13b = powExp(u13b.pow(5),3)
                }
                if (inChallenge("u", 11) || inChallenge("s", 21)) u13 = decimalOne
                if (inChallenge("u", 21) || inChallenge("s", 21)) u13b = decimalOne
                return {r:u13, u:u13b}
            },
            effectDisplay(){
            return format(tmp.u.upgrades[13].effect.r)+"x to replicators base, "+format(tmp.u.upgrades[13].effect.u)+"x to uncoaters base."
            },
            unlocked(){
                return hasUUpg(12)
            }
        },
        14: {
            title: "Genome Replication",
            description: "Cases make replicators cheaper.",
            cost: new Decimal(6),
            effect(){
            let u14 = player.points.add(1).max(1)
            u14 = Decimal.log10(u14).pow(0.83)
            u14 = Decimal.pow(10,u14).pow(1.536)
            if (hasUpgrade("Ui", 11)) u14 = u14.pow(2)
            if (hasUpgrade("Ui", 21)) u14 = powExp(u14,1.1)
            if (inChallenge("s", 21)) u14 = decimalOne
            return u14
            },
            effectDisplay(){
            return format(getUUpgEff(14))+"x"
            },
            unlocked(){
                return hasUUpg(13)
            }
        },
        21: {
            title: "Bird Transmission",
            description: "Remove 'Air Transmission' hardcap and its softcap starts later based on cases.",
            cost: new Decimal(8),
            effect(){
            let u21 = player.points.add(10).max(10)
            u21 = Decimal.log10(u21).add(10).max(10)
            u21 = Decimal.log10(u21).add(10).max(10)
            u21 = u21.pow(0.1).div(1.12)
            if (inChallenge("s", 21)) u21 = decimalOne
            return u21
            },
            effectDisplay(){
            return format(getUUpgEff(21))+"x"
            },
            unlocked(){
                return hasUUpg(14)
            }
        },
        22: {
            title: "Viral Proteins",
            description: "Infectivity boosts replicators 2nd effect.",
            cost: decimalTen,
            effect(){
            let u22 = player.i.points.add(10).max(10)
            u22 = Decimal.log10(u22)
            u22 = u22.pow(0.26).add(0.13)
            if (inChallenge("u", 12) || inChallenge("s", 21)) u22 = decimalOne
            return u22
            },
            effectDisplay(){
            return "^"+format(getUUpgEff(22))
            },
            unlocked(){
                return hasUUpg(21)
            }
        },
        23: {
            title: "Viral Enzymes",
            description: "Infectivity boosts uncoaters 2nd effect.",
            cost: new Decimal(11),
            effect(){
            let u23 = player.i.points.add(10).max(10)
            u23 = Decimal.log10(u23)
            u23 = u23.pow(0.0747)
            if (u23.gte(150)) u23 = u23.div(150).pow(0.333).mul(150)
            if (u23.gte(1e9)) u23 = u23.div(1e9).pow(0.2).mul(1e9)
            if (inChallenge("u", 12) || inChallenge("s", 21)) u23 = decimalOne
            return u23
            },
            effectDisplay(){
                let dis = "^"+format(getUUpgEff(23))
                if (getUUpgEff(23).gte(150)) dis += " (softcapped)"
                return dis
            },
            unlocked(){
                return hasUUpg(22)
            }
        },
        24: {
            title: "Endocytosis",
            description: "'Transcription' is stronger based on uncoaters.",
            cost: new Decimal(13),
            effect(){
            let u24 = player.u.points.add(10).max(10)
            u24 = Decimal.log10(u24)
            u24 = u24.pow(1.523)
            if (inChallenge("u", 11) || inChallenge("s", 21)) u24 = decimalOne
            return u24
            },
            effectDisplay(){
            return "^"+format(getUUpgEff(24))
            },
            unlocked(){
                return hasUUpg(23)
            }
        },
    },
    challenges: { // Order: 1x1,2x1,1x2,3x1,4x1,2x2,1x3,3x2,2x3,4x2,3x3,4x3
        rows: 2,
        cols: 2,
        11: {
            name: "Coated",
            challengeDescription: function() {
                let c11 = "Uncoaters are useless."
                if (inChallenge("u", 11)) c11 = c11 + " (In Challenge)"
                if (challengeCompletions("u", 11) == 3) c11 = c11 + " (Completed)"
                c11 = c11 + "<br>Completed:" + challengeCompletions("u",11) + "/" + tmp.u.challenges[11].completionLimit
                return c11
            },
            goal(){
                if (challengeCompletions("u", 11) == 0) return Decimal.pow(10,2610);
                if (challengeCompletions("u", 11) == 1) return Decimal.pow(10,2865);
                if (challengeCompletions("u", 11) == 2) return Decimal.pow(10,4860);
            },
            currencyDisplayName: "cases",
            completionLimit:3 ,
            rewardDescription: "Infectivity makes uncoaters cheaper.",
            rewardEffect() {
                 let c11 = player.i.points.add(1).max(1)
                 let c11r = new Decimal(1.27)
                 let c11c = challengeCompletions("u", 11)
                 c11c = Decimal.pow(1.2, c11c)
                 c11 = Decimal.log10(c11).pow(0.7)
                 c11 = Decimal.pow(10,c11)
                 c11r = c11r.mul(c11c)
                 c11 = c11.pow(c11r)
                 c11 = c11.pow(tmp.s.buyables[13].effect)
                 if (hasMilestone("Ui", 5)) c11 = powExp(c11.pow(1.1),1.1)
                 if (inChallenge("u", 12)) c11 = decimalOne
                 return c11
            },
            rewardDisplay() {return format(tmp.u.challenges[11].rewardEffect)+"x"},
            unlocked(){
                return hasMilestone("u", 6)
            }
        },
        12: {
            name: "Disinfectant",
            challengeDescription: function() {
                let c12 = "Infectivity and 'Infection' are useless."
                if (inChallenge("u", 12)) c12 = c12 + " (In Challenge)"
                if (challengeCompletions("u", 12) == 3) c12 = c12 + " (Completed)"
                c12 = c12 + "<br>Completed:" + challengeCompletions("u",12) + "/" + tmp.u.challenges[12].completionLimit
                return c12
            },
            goal(){
                if (challengeCompletions("u", 12) == 0) return Decimal.pow(10,714);
                if (challengeCompletions("u", 12) == 1) return Decimal.pow(10,2360);
                if (challengeCompletions("u", 12) == 2) return Decimal.pow(10,3434);
            },
            currencyDisplayName: "cases",
            completionLimit:3 ,
            rewardDescription: "Cases boost 'Genetic ReShuffle'.",
            rewardEffect() {
                 let c12 = player.points.add(10).max(10)
                 let c12r = new Decimal(1/5)
                 let c12c = challengeCompletions("u", 12)
                 c12c = Decimal.div(c12c, 20)
                 c12r = c12r.add(c12c)
                 c12 = Decimal.log10(c12).add(10).max(10)
                 c12 = Decimal.log10(c12).pow(c12r)
                 return c12
            },
            rewardDisplay() {return "^"+format(tmp.u.challenges[12].rewardEffect)},
            unlocked(){
                return hasChallenge("u", 11)
            }
        },
        21: {
            name: "Unreplicated",
            challengeDescription: function() {
                let c21 = "Replicators are useless."
                if (inChallenge("u", 21)) c21 = c21 + " (In Challenge)"
                if (challengeCompletions("u", 21) == 3) c21 = c21 + " (Completed)"
                c21 = c21 + "<br>Completed:" + challengeCompletions("u",21) + "/" + tmp.u.challenges[21].completionLimit
                return c21
            },
            goal(){
                if (challengeCompletions("u", 21) == 0) return Decimal.pow(10,3700);
                if (challengeCompletions("u", 21) == 1) return Decimal.pow(10,5720);
                if (challengeCompletions("u", 21) == 2) return Decimal.pow(10,6905);
            },
            currencyDisplayName: "cases",
            completionLimit:3 ,
            rewardDescription: "Cases boost replicators 1st effect base.",
            rewardEffect() {
                 let c21 = player.points.add(10).max(10)
                 let c21r = decimalHalf
                 let c21c = challengeCompletions("u", 21)
                 c21c = Decimal.div(c21c, 2)
                 c21r = c21r.add(c21c)
                 c21 = Decimal.log10(c21).pow(c21r)
                 return c21
            },
            rewardDisplay() {return format(tmp.u.challenges[21].rewardEffect)+"x"},
            unlocked(){
                return hasChallenge("u", 12)
            }
        },
        22: {
            name: "Masks",
            challengeDescription: function() {
                let c22 = "'Transmission' softcap starts instantly and 'Coated' and 'Disinfectant' are applied at once. Cases gain is multiplied by 5^(total challenge completions-4)"
                if (inChallenge("u", 22)) c22 = c22 + " (In Challenge)"
                if (challengeCompletions("u", 22) == 3) c22 = c22 + " (Completed)"
                c22 = c22 + "<br>Completed:" + challengeCompletions("u",22) + "/" + tmp.u.challenges[22].completionLimit
                return c22
            },
            goal(){
                if (challengeCompletions("u", 22) == 0) return new Decimal(1e14);
                if (challengeCompletions("u", 22) == 1) return new Decimal(5e19);
                if (challengeCompletions("u", 22) == 2) return new Decimal(5e21);
            },
            currencyDisplayName: "cases",
            completionLimit:3 ,
            countsAs: [11, 12],
            rewardDescription: "VP boosts 'Transcription' and makes 'Transmission' softcap weaker.",
            rewardEffect() {
                 let c22 = player.v.points.add(10).max(10)
                 let c22r = new Decimal(0.15)
                 let c22c = challengeCompletions("u", 22)
                 c22c = Decimal.div(c22c, 20)
                 c22r = c22r.add(c22c)
                 c22 = Decimal.log10(c22).add(10).max(10)
                 c22 = Decimal.max(Decimal.log10(c22).pow(c22r).div(1.15),1)
                 return c22
            },
            rewardDisplay() {return format(tmp.u.challenges[22].rewardEffect)+"x"},
            unlocked(){
                return hasChallenge("u", 21)
            }
        },
    },
})
