addLayer("i", {
    name: "infectivity",
    symbol: "I",
    position: 0,
    startData() { return {
        points: decimalZero,
        best: decimalZero,
        total: decimalZero,
    unlocked: false,
    total: decimalZero
    }},
    color: "#880435",
    requires: new Decimal(7.8e9),
    resource: "infectivity",
    baseResource: "cases",
    baseSingular: "case",
    baseAmount() { return player.points },
    type: "normal",
    exponent: 0.08,
    branches: ["v"],
    softcap: new Decimal(Decimal.pow(10,1e7)),
    softcapPower: 0.5,
    hotkeys: [
        {
            key:"i", description: "I:Reset for infectivity", onPress() {
                if (canReset(this.layer))
                    doReset(this.layer)
            }
        },
    ],
    doReset(resettingLayer) {
        let keep = [];
        if (hasMilestone("u", 0) && resettingLayer=="u") keep.push("milestones")
        if (hasMilestone("s", 0) && resettingLayer=="s") keep.push("milestones")
        if (hasMilestone("u", 3) && resettingLayer=="u") keep.push("upgrades")
        if (hasMilestone("s", 1) && resettingLayer=="s") keep.push("upgrades")
        if (hasMilestone("d", 6) && resettingLayer=="d") keep.push("upgrades")
        if (hasAchievement("a", 41)) keep.push("upgrades")
        if (hasMilestone("a", 0)) keep.push("upgrades")
        if (hasMilestone("a", 0)) keep.push("milestones")
        if (layers[resettingLayer].row > this.row) layerDataReset(this.layer, keep)
    },
    effect(){
        let eff = player.i.points.add(1).max(1)
        eff = eff.pow(2)
        if (inChallenge("u", 12)) eff = decimalOne
        if (eff.gte(Decimal.pow(10,1e16))) eff = Decimal.pow(10,eff.div(Decimal.pow(10,1e16)).log10().pow(0.88)).mul(Decimal.pow(10,1e16))
        if (eff.gte(Decimal.pow(10,1e32))) eff = Decimal.pow(10,eff.div(Decimal.pow(10,1e32)).log10().pow(0.85)).mul(Decimal.pow(10,1e32))
        if (eff.gte(Decimal.pow(10,1e63))) eff = eff.log10().div(1e13).pow(2e61)
        return eff
    },
    effectDescription() {
        let dis = "which boosts cases gain by "+layerText("h2", "i", format(tmp.i.effect))
        if (tmp.i.effect.gte(Decimal.pow(10,1e16))) dis += " (softcapped)"
        elif (tmp.i.effect.gte(Decimal.pow(10,1e32))) dis += " (supercapped)"
        elif (tmp.i.effect.gte(Decimal.pow(10,1e63))) dis += " (hypercapped)"
        return dis
    },
    gainMult() {
        imult = decimalOne
        if (!inChallenge("ct",32)) {
        if (hasIUpg(13)) imult = imult.mul(getIUpgEff(13))
        if (hasIUpg(23)) imult = imult.mul(getIUpgEff(23))
        imult = imult.mul(tmp.u.effect)
        imult = imult.mul(tmp.d.effect)
        imult = imult.mul(tmp.f.effect).mul(tmp.ct.effect)
        if (hasAchievement("a", 31)) imult = imult.mul(tmp.a.effect)
        imult = imult.mul(tmp.s.buyables[12].effect)
        if (player.s.unlocked) imult = imult.mul(tmp.s.severityEff);
        }
        else {
            imult = imult.mul(tmp.Uv.buyables[12].effect).mul(tmp.Ui.effect).mul(tmp.Ui.pathEff)
            if (hasMilestone("Ui",4)) imult = imult.mul(milestoneEffect("Ui",4))
        }
        return imult
    },
    gainExp() {
        let exp = decimalOne
        return exp
    },
    row: 1,
    layerShown() {
        let shown = player.v.total.gte(decimalOne)
        if(player.i.unlocked) shown = true
        return shown && player.uv.tree == "normal"
    },
    milestones: {
        0: {
            requirementDescription: "15 total infectivity",
            effectDescription: "Keep virus upgrades on reset.",
            done() { return player.i.total.gte(15) }
        },
        1: {
            requirementDescription: "2,000 total infectivity",
            effectDescription: "Gain 100% of VP gain per second.",
            done() { return player.i.total.gte(2e3) }
        }
    },
    upgrades: {
        rows: 3,
        cols: 3,
        11: {
            title: "VP Boost",
            description: "Infectivity boosts VP gain.",
            cost: decimalTen,
            effect(){
            let i11 = player.i.points.add(1).max(1)
            if (inChallenge("u", 12)) i11 = decimalOne
            if (hasUpgrade("Uv",21)) i11 = i11.pow(tmp.Uv.upgrades[21].effect)
            return i11
            },
            effectDisplay(){
            return format(getIUpgEff(11))+"x"
            },
        },
        12: {
            title: "Air Transmission",
            description: "Infectivity boosts 'Transmission'.",
            cost: new Decimal(20),
            effect(){
            let i12 = player.i.points.add(15)
            let i12sf = new Decimal(1.35)
            i12 = Decimal.log10(i12.mul(2)).pow(0.3)
            if (hasUUpg(21)) i12sf = i12sf.mul(getUUpgEff(21))
            if (i12.gte(i12sf)) i12 = i12.mul(Decimal.pow(i12sf,2)).pow(1/3)
            if (i12.gte(2) && !hasUUpg(21)) i12 = decimalTwo
            if (inChallenge("u", 12)) i12 = decimalOne
            return i12
            },
            effectDisplay(){
                let i12dis = "^"+format(getIUpgEff(12))
                let i12sf = new Decimal(1.35)
                if (hasUUpg(21)) i12sf = i12sf.mul(getUUpgEff(21))
                if ((getIUpgEff(12).gte(i12sf) && getIUpgEff(12).lt(2)) || (hasUUpg(21) && getIUpgEff(12).gte(i12sf))) i12dis = i12dis+" (softcapped)" 
                if (getIUpgEff(12).gte(2) && !hasUUpg(21)) i12dis = i12dis+" (hardcapped)"
            return i12dis
            },
            unlocked(){
                return hasIUpg(11)
            }
        },
        13: {
            title: "Resistance",
            description: "Multiplier to infectivity based on VP.",
            cost: new Decimal(50),
            effect(){
            let i13 = player.v.points.add(10).max(10)
            i13 = Decimal.log10(i13).pow(0.4)
            if (hasIUpg(33)) i13 = i13.pow(getIUpgEff(33))
            return i13
            },
            effectDisplay(){
            return format(getIUpgEff(13))+"x"
            },
            unlocked(){
                return hasIUpg(12)
            }
        },
        21: {
            title: "Susceptible",
            description: "Infectivity increases 'Infection' base.",
            cost: new Decimal(500),
            effect(){
            let i21 = player.i.points.add(1).max(1)
            i21 = Decimal.log10(i21).pow(0.5)
            if(hasIUpg(31)) i21 = i21.mul(getIUpgEff(31))
            if (inChallenge("u", 12)) i21 = decimalOne
            return i21
            },
            effectDisplay(){
            return "+"+format(getIUpgEff(21))
            },
            unlocked(){
                return hasIUpg(13)
            }
        },
        22: {
            title: "Drug Resistance",
            description: "Cases increase 'Infection' base.",
            cost: new Decimal(5e3),
            effect(){
            let i22 = player.points.add(1).max(1)
            i22 = Decimal.log10(i22).pow(0.2)
            if(hasIUpg(32)) i22 = i22.mul(getIUpgEff(32))
            return i22
            },
            effectDisplay(){
            return "+"+format(getIUpgEff(22))
            },
            unlocked(){
                return hasIUpg(21)
            }
        },
        23: {
            title: "Environmental Hardening",
            description: "Multiplier to infectivity based on cases.",
            cost: new Decimal(25e3),
            effect(){
            let i23 = player.points.add(10).max(10)
            i23 = Decimal.log10(i23).pow(0.3).mul(1.25)
            if (hasIUpg(33)) i23 = i23.pow(getIUpgEff(33))
            return i23
            },
            effectDisplay(){
            return format(getIUpgEff(23))+"x"
            },
            unlocked(){
                return hasIUpg(22)
            }
        },
        31: {
            title: "SUSceptible",
            description: "'Susceptible' is stronger based on replicators and make it add and multiply.",
            cost: new Decimal(2.5e60),
            effect(){
            let i31 = player.r.points.add(1).max(1)
            i31 = i31.pow(0.78)
            if (inChallenge("u", 21)) i31 = decimalOne
            return i31
            },
            effectDisplay(){
            return format(getIUpgEff(31))+"x"
            },
            unlocked(){
                return hasRUpg(32)
            }
        },
        32: {
            title: "Genetic Hardening",
            description: "'Drug Resistance' is stronger based on replicators and make it add and multiply.",
            cost: new Decimal(4.20e69),
            effect(){
            let i32 = player.r.points.add(1).max(1)
            if (inChallenge("u", 21)) i32 = decimalOne
            return i32
            },
            effectDisplay(){
            return format(getIUpgEff(32))+"x"
            },
            unlocked(){
                return hasIUpg(31)
            }
        },
        33: {
            title: "Genetic ReShuffle",
            description: "'Resistance' and 'Environmental Hardening' is stronger based on infectivity.",
            cost: new Decimal(7.77e77),
            effect(){
            let i33 = player.i.points.add(10).max(10)
            i33 = Decimal.log10(i33).pow(1/3)
            if (inChallenge("u", 12)) i33 = decimalOne
            if (hasChallenge("u", 12)) i33 = i33.pow(challengeEffect("u", 12))
            if (i33.gte(1e17)) i33 = i33.div(1e17).pow(0.5).mul(1e17)
            if (i33.gte(1e130)) i33 = Decimal.pow(10,i33.div(1e130).log10().pow(0.75)).mul(1e130)
            if (i33.gte(Decimal.pow(10,1e57))) i33 = Decimal.pow(10,i33.div(Decimal.pow(10,1e57)).log10().pow(0.9)).mul(Decimal.pow(10,1e57))
            return i33
            },
            effectDisplay(){
                let dis = "^"+format(getIUpgEff(33))
                if (tmp.i.upgrades[33].effect.gte(1e17)) dis += " (softcapped)"
                return dis
            },
            unlocked(){
                return hasIUpg(32)
            }
        },
    },
})
