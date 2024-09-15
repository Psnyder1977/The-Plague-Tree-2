addLayer("r", {
    name: "replicators",
    symbol: "R",
    position: 1,
    startData() { return {
        points: decimalZero,
        total: decimalZero,
        best: decimalZero,
    unlocked: false
    }},
    color: "#df34c9",
    requires: new Decimal(5e58),
    resource: "replicators",
    resourceSingular: "replicator",
    baseResource: "cases",
    baseSingular: "case",
    baseAmount() { 
        return player.points 
    },
    type: "static",
    exponent: new Decimal(1.7),
    base: new Decimal(1e4),
    branches: ["v"],
    hotkeys: [
        {
            key:"r", description: "R:Reset for replicators", onPress() {
                if (canReset(this.layer))
                    doReset(this.layer)
            }
        },
    ],
    doReset(resettingLayer) {
        let keep = [];
        if ((hasMilestone("u", 0) && resettingLayer=="u") || hasMilestone("a", 0)) keep.push("milestones")
        if (hasMilestone("s", 0) && resettingLayer=="s") keep.push("milestones")
        if (hasMilestone("u", 3) && resettingLayer=="u") keep.push("upgrades")
        if (hasMilestone("s", 1) && resettingLayer=="s") keep.push("upgrades")
        if (hasMilestone("d", 6) && resettingLayer=="d") keep.push("upgrades")
        if (hasAchievement("a", 41)) keep.push("upgrades")
        if (hasMilestone("a", 0)) keep.push("upgrades")
        if (hasMilestone("a", 0)) keep.push("milestones")
        if (layers[resettingLayer].row > this.row) layerDataReset(this.layer, keep)
    },
    automate() {},
    autoPrestige() { return (hasMilestone("u", 4) && player.u.auto) },
    effbase() {
        let eff = new Decimal(100)
        if(hasRUpg(11)) eff = eff.mul(getRUpgEff(11))
        if(hasRUpg(13)) eff = eff.mul(getRUpgEff(13))
        if(hasSUpg(15)) eff = eff.mul(getSUpgEff(15))
        if(hasUUpg(13)) eff = eff.mul(upgradeEffect("u",13).r)
        if(hasChallenge("u", 21)) eff = eff.mul(challengeEffect("u", 21))
        if(hasUpgrade("Ui", 11)) eff = eff.mul(tmp.Ui.upgrades[11].effect)
        return eff
    },
    effect(){
        let eff = tmp.r.effbase
        eff = Decimal.pow(eff,player.r.points)
        if (eff.gte(Decimal.pow(10,Decimal.pow(10,1e3)))) eff = eff.log10().pow(Decimal.pow(10,997))
        if (inChallenge("u", 21)) eff = decimalOne
        return eff
    },
    effect2(){
        let eff2 = player.r.points
        eff2 = eff2.pow(0.75)
        if(hasRUpg(21)) eff2 = eff2.mul(getRUpgEff(21))
        if(hasUUpg(22)) eff2 = eff2.pow(getUUpgEff(22))
        if (inChallenge("u", 21)) eff2 = decimalZero
        return eff2
    },
    effectDescription() {
        return "which "+pluralize(player.r.points,'boosts','boost',true)+" cases gain by "+layerText("h2", "r", format(tmp.r.effect))+" and "+pluralize(player.r.points,'increases','increase',true)+" 'Infection' base by "+layerText("h2", "r", format(tmp.r.effect2))
    },
    gainMult() {
        rmult = decimalOne
        if(hasUUpg(14)) rmult = rmult.div(getUUpgEff(14))
        return rmult
    },
    gainExp() {
        return decimalOne
    },
    row: 1,
    resetsNothing() { return hasMilestone("u", 5) },
    layerShown() {
        let shown = player.i.total.gte(decimalOne)
        if(player.r.unlocked) shown = true
        return shown && player.uv.tree == "normal"
    },
    canBuyMax() {
        return hasMilestone("r", 1)
    },
    milestones: {
        0: {
            requirementDescription: "5 replicators",
            effectDescription: "Keep virus upgrades on reset.",
            done() { return player.r.points.gte(5) }
        },
        1: {
            requirementDescription: "12 replicators",
            effectDescription: "You can buy max replicators.",
            done() { return player.r.points.gte(12) }
        },
    },
    upgrades: {
        rows: 3,
        cols: 3,
        11: {
            title: "Replication",
            description: "Infectivity boosts replicators 1st effect base.",
            cost: decimalFour,
            effect(){
            let r11 = player.i.points.add(10).max(10)
            r11 = Decimal.log10(r11).pow(1.2).add(1).max(1)
            if (inChallenge("u", 12)) r11 = decimalOne
            return r11
            },
            effectDisplay(){
            return format(getRUpgEff(11))+"x"
            },
        },
        12: {
            title: "DNA",
            description: "Replicators boost 'Disease'.",
            cost: decimalFive,
            effect(){
            let r12 = player.r.points.add(10).max(10)
            r12 = Decimal.log10(r12).pow(1.6).mul(1.65).add(1).max(1)
            if (!inChallenge("ct",32)) r12 = r12.pow(tmp.e.reff2)
            if(hasRUpg(33)) r12 = r12.pow(getRUpgEff(33))
            if (inChallenge("u", 21)) r12 = decimalOne
            return r12
            },
            effectDisplay(){
            return "^"+format(getRUpgEff(12))
            },
            unlocked(){
                return hasRUpg(11)
            }
        },
        13: {
            title: "Attachment",
            description: "VP boosts replicators 1st effect base.",
            cost: new Decimal(7),
            effect(){
            let r13 = player.v.points.add(10).max(10)
            r13 = Decimal.log10(r13).pow(0.7).add(1).max(1)
            return r13
            },
            effectDisplay(){
            return format(getRUpgEff(13))+"x"
            },
            unlocked(){
                return hasRUpg(12)
            }
        },
        21: {
            title: "Entry",
            description: "VP boosts replicators 2nd effect.",
            cost: new Decimal(12),
            effect(){
            let r21 = player.v.points.add(10).max(10)
            r21 = Decimal.log10(r21).pow(0.35).add(1).max(1)
            return r21
            },
            effectDisplay(){
            return format(getRUpgEff(21))+"x"
            },
            unlocked(){
                return hasRUpg(13)
            }
        },
        22: {
            title: "Uncoating (title came from Uncoaters)",
            description: "Cases boost 'More Infections'.",
            cost: new Decimal(13),
            effect(){
            let r22 = player.points.add(10).max(10)
            r22 = Decimal.log10(r22).add(10).max(10)
            r22 = Decimal.log10(r22).pow(2).div(10).add(1).max(1)
            r22 = r22.mul(tmp.u.effect2)
            if (r22.gte(4.8e6)) r22 = r22.div(4.8e6).pow(0.5).mul(4.8e6)
            if (r22.gte(3e11)) r22 = Decimal.pow(10,r22.div(3e11).log10().pow(0.5)).mul(3e11)
            if (r22.gte(1e55)) r22 = Decimal.pow(10,r22.div(1e55).log10().pow(0.75)).mul(1e55)
            return r22
            },
            effectDisplay(){
                let dis = format(getRUpgEff(22))+"x"
                if (tmp.r.upgrades[22].effect.gte(4.8e6)) dis += " (softcapped)"
                return dis
            },
            unlocked(){
                return hasRUpg(21)
            }
        },
        23: {
            title: "Transcription",
            description: "'Self Boost' is stronger based on replicators",
            cost: new Decimal(16),
            effect(){
            let r23 = player.r.points.add(10).max(10)
            r23 = Decimal.log10(r23).pow(2.4).add(1).max(1)
            if (hasChallenge("u", 22)) r23 = r23.mul(challengeEffect("u", 22))
            if (hasUUpg(24)) r23 = r23.pow(getUUpgEff(24))
            if (r23.gte(1e25)) r23 = r23.div(1e25).pow(0.3).mul(1e25)
            if (r23.gte(1e80)) r23 = Decimal.pow(10,r23.div(1e80).log10().pow(0.75)).mul(1e80)
            if (inChallenge("u", 21)) r23 = decimalOne
            return r23
            },
            effectDisplay(){
                let dis = "^"+format(getRUpgEff(23))
                if (tmp.r.upgrades[23].effect.gte(1e25)) dis += " (softcapped)"
                return dis
            },
            unlocked(){
                return hasRUpg(22)
            }
        },
        31: {
            title: "Synthesis",
            description: "'Contaminate' is stronger based on replicators",
            cost: new Decimal(20),
            effect(){
            let r31 = player.r.points.add(10).max(10)
            r31 = Decimal.log10(r31).pow(3.8).add(1).max(1)
            if (inChallenge("u", 21)) r31 = decimalOne
            return r31
            },
            effectDisplay(){
            return "^"+format(getRUpgEff(31))
            },
            unlocked(){
                return hasRUpg(23)
            }
        },
        32: {
            title: "Virion",
            description: "Unlock a row of infectivity upgrades.",
            cost: new Decimal(21),
            unlocked(){
                return hasRUpg(31)
            }
        },
        33: {
            title: "Release",
            description: "'DNA' is stronger based on cases",
            cost: new Decimal(26),
            effect(){
            let r33 = player.points.add(10).max(10)
            r33 = Decimal.log10(r33).add(10).max(10)
            r33 = Decimal.log10(r33).pow(0.4).add(1).max(1)
            if (hasUpgrade("e",146)) r33 = r33.pow(upgradeEffect("e",146))
            if (r33.gte(1e50)) r33 = r33.div(1e50).log10().pow(0.5).pow10().mul(1e50)
            return r33
            },
            effectDisplay(){
            return "^"+format(getRUpgEff(33))
            },
            unlocked(){
                return hasIUpg(33)
            }
        },
    },
})
