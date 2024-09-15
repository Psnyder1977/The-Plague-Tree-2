addLayer("v", {
    name: "virus",
    symbol: "V",
    position: 0,
    startData() {
        return {
            unlocked: true,
            points: decimalZero,
            total: decimalZero,
            best: decimalZero,
        }
    },
    color: "#777777",
    requires: decimalOne,
    resource: "virus points",
    resourceSingular: "virus point",
    baseResource: "cases",
    baseSingular: "case",
    baseAmount() { return player.points },
    type: "normal",
    exponent: 0.5,
    softcap: Decimal.pow(10,1e7),
    softcapPower: 0.5,
    gainMult() {
        mult = decimalOne
        if(hasVUpg(22)) mult = mult.mul(getVUpgEff(22))
        if(hasVUpg(31)) mult = mult.mul(getVUpgEff(31))
        if(hasIUpg(11)) mult = mult.mul(getIUpgEff(11))
        if(hasUpgrade("Uv",12)) mult = mult.mul(upgradeEffect("Uv",12))
        mult = mult.mul(tmp.d.effect)
        mult = mult.mul(tmp.f.effect)
        if (hasAchievement("a", 21)) mult = mult.mul(tmp.a.effect)
        if (player.s.unlocked) mult = mult.mul(tmp.s.severityEff);
        return mult.mul(tmp.ct.effect)
    },
    gainExp() {
        return decimalOne
    },
    updateInterval()  {
        if (player===undefined||tmp===undefined) return 50
        return player.ms
    },
    row: 0,
    hotkeys: [
        {
            key:"v", description: "V:Reset for virus points", onPress() {
                if (canReset(this.layer))
                    doReset(this.layer)
            }
        },
    ],
    update(diff) {
        if (hasMilestone("i", 1)) generatePoints("v", diff);
    },
    doReset(resettingLayer) {
        let keep = [];
        if (hasMilestone("i", 0) && resettingLayer=="i") keep.push("upgrades")
        if (hasMilestone("r", 0) && resettingLayer=="r") keep.push("upgrades")
        if (hasAchievement("a", 31)) keep.push("upgrades")
        if (layers[resettingLayer].row > this.row) layerDataReset(this.layer, keep)
    },
    upgrades: {
        rows: 3,
        cols: 3,
        11: {
            title: "Start",
            description: "Gain 0.1 cases/s.",
            cost: decimalOne,
            effect(){
                return true
            },
            effectDisplay() {
                return format(getPointGen()) + "/s"
            }
        },
        12: {
            title: "Infection",
            description: "Multiply cases gain.",
            cost: decimalTwo,
            base() {
                let base =  decimalTwo
                if(hasIUpg(21)) base = base.add(getIUpgEff(21))
                if(hasIUpg(22)) base = base.add(getIUpgEff(22))
                base = base.add(tmp.r.effect2)
                if(hasIUpg(21) && hasIUpg(31)) base = base.mul(getIUpgEff(21).max(1))
                if(hasIUpg(22) && hasIUpg(32)) base = base.mul(getIUpgEff(22).max(1))
                if(hasUUpg(11)) base = base.mul(getUUpgEff(11))
                if(hasSUpg(24)) base = base.mul(getSUpgEff(24))
                base = base.mul(tmp.s.buyables[23].effect)
                return base
            },
            effect(){
                let eff = tmp.v.upgrades[12].base
                let v12sf = Decimal.pow(10,1e4)
                let v12sf2 = Decimal.pow(10,1e10)
                let v12sf3 = Decimal.pow(10,1e50)
                if(hasVUpg(23)) eff = eff.pow(getVUpgEff(23))
                if(hasFUpg(33)) eff = eff.pow(getFUpgEff(33))
                if(eff.gte(v12sf)) eff = Decimal.pow(10,Decimal.log10(eff.div(v12sf)).pow(3/4)).mul(v12sf)
                if(eff.gte(v12sf2)) eff = Decimal.pow(10,Decimal.log10(eff.div(v12sf2)).pow(0.9)).mul(v12sf2)
                if(eff.gte(v12sf3)) eff = Decimal.pow(10,Decimal.pow(10,eff.div(v12sf3).log10().log10().pow(0.99))).mul(v12sf3)
                if (eff.gte(Decimal.pow(10,Decimal.pow(10,1e3)))) eff = eff.log10().pow(Decimal.pow(10,997))
                if(hasUpgrade("e",11)) eff = eff.pow(upgradeEffect("e",11))
                if(hasUpgrade("e",16)) eff = eff.pow(tmp.e.upgrades[16].effect2)
                if(hasUpgrade("e",61)) eff = eff.pow(upgradeEffect("e",61))
                if(hasUpgrade("e",111)) eff = eff.pow(upgradeEffect("e",111))
                if (inChallenge("u", 12)) eff = decimalOne
                return eff
            },
            effectDisplay(){
                let v12dis = format(getVUpgEff(12))+"x"
                let v12sf = Decimal.pow(10,1e4)
                if (getVUpgEff(12).gte(v12sf)) v12dis = v12dis+" (softcapped)"
                return v12dis
            },
            unlocked(){
                return hasVUpg(11)
            }
        },
        13: {
            title: "Transmission",
            description: "Multiplier to cases based on VP.",
            cost: decimalFive,
            effect(){
                let v13 = player.v.points.add(2)
                let v13sf = new Decimal(1.797e308)
                let v13sf2 = Decimal.pow(10,2370)
                let v13sf3 = Decimal.pow(10,25e8)
                let v13sf4 = Decimal.pow(10,1e14)
                let v13sf5 = Decimal.pow(10,1e50)
                let v13sff = decimalHalf
                let v13sff2 = new Decimal(0.8)
                let v13sff3 = new Decimal(10/11)
                let v13sff4 = new Decimal(5/6)
                let v13sff5 = new Decimal(0.8)
                v13 = v13.pow(1/2)
                if(hasUUpg(12)) v13sf = v13sf.mul(getUUpgEff(12))
                if(hasUUpg(12)) v13sf2 = v13sf2.mul(getUUpgEff(12)).add(1).max(1)
                if(hasUUpg(12)) v13sf3 = v13sf3.mul(getUUpgEff(12)).add(1).max(1)
                if(hasUUpg(12)) v13sf4 = v13sf4.mul(getUUpgEff(12)).add(1).max(1)
                if(hasUUpg(12)) v13sf5 = v13sf5.mul(getUUpgEff(12)).add(1).max(1)
                if (inChallenge("u", 22)) v13sf = decimalOne
                if (inChallenge("u", 22)) v13sf2 = decimalOne
                if (hasChallenge("u", 22)) v13sff = v13sff.pow(challengeEffect("u", 22).pow(-1))
                if (hasChallenge("u", 22)) v13sff2 = v13sff2.pow(challengeEffect("u", 22).pow(-1))
                if(hasIUpg(12)) v13 = v13.pow(getIUpgEff(12))
                if(hasDUpg(14)) v13 = v13.pow(getDUpgEff(14))
                if(hasSUpg(55)) v13 = v13.pow(getSUpgEff(55))
                if(v13.gte(v13sf)) v13 = v13.mul(v13sf).pow(v13sff) 
                if(v13.gte(v13sf2)) {
                    v13 = Decimal.pow(10,Decimal.log10(v13.div(v13sf2)).pow(v13sff2)).mul(v13sf2)
                }
                if(v13.gte(v13sf3)) {
                    v13 = Decimal.pow(10,Decimal.log10(v13.div(v13sf3)).pow(v13sff3)).mul(v13sf3)
                }
                if(v13.gte(v13sf4)) {
                    v13 = Decimal.pow(10,Decimal.log10(v13.div(v13sf4)).pow(v13sff4)).mul(v13sf4)
                }
                if(v13.gte(v13sf5)) {
                    v13 = Decimal.pow(10,Decimal.pow(10,v13.div(v13sf5).log10().add(1).max(1).log10().pow(v13sff5))).mul(v13sf5)
                }
                if (v13.gte("eee3")) v13 = v13.log10().pow("e997")
                return v13  
            },
            effectDisplay(){
                let v13sf = new Decimal(1.797e308)
                if(hasUUpg(12)) v13sf = v13sf.mul(getUUpgEff(12))
                let v13dis = format(getVUpgEff(13))+"x"
                if (getVUpgEff(13).gte(v13sf) || inChallenge("u", 22)) v13dis = v13dis+" (softcapped)"
            return v13dis
            },
            unlocked(){
                return hasVUpg(12)
            }
        },
        21: {
            title: "Self Boost",
            description: "Multiplier to cases based on cases.",
            cost: decimalTen,
            effect(){
                let v21 = player.points.add(1).max(1)
                let v21sf = Decimal.pow(10,1e5)
                let v21sf2 = Decimal.pow(10,1e16)
                let v21sf3 = Decimal.pow(10,1e90)
                v21 = Decimal.log10(v21).pow(2).add(2)
                if(hasVUpg(32)) v21 = v21.pow(getVUpgEff(32))
                if(hasRUpg(23)) v21 = v21.pow(getRUpgEff(23))
                if(v21.gte(v21sf)) v21 = Decimal.pow(10,Decimal.log10(v21.div(v21sf)).pow(0.8)).mul(v21sf)
                if(v21.gte(v21sf2)) v21 = Decimal.pow(10,Decimal.log10(v21.div(v21sf2)).pow(0.88)).mul(v21sf2)
                if(v21.gte(v21sf3)) v21 = Decimal.pow(10,Decimal.pow(10,Decimal.log10(v21.div(v21sf3)).log10().pow(0.95))).mul(v21sf3)
                if (v21.gte(Decimal.pow(10,Decimal.pow(10,1e3)))) v21 = v21.log10().pow(Decimal.pow(10,997))
                return v21
            },
            effectDisplay(){
                let v21sf = Decimal.pow(10,1e5)
                let v21dis = format(getVUpgEff(21))+"x"
                if (getVUpgEff(21).gte(v21sf)) v21dis = v21dis + " (softcapped)"
                return v21dis
            },
            unlocked(){
                return hasVUpg(13)
            }
        },
        22: {
            title: "Contaminate",
            description: "Multiplier to VP based on cases.",
            cost: new Decimal(20),
            effect(){
                let v22 = player.points.add(1).max(1)
                v22 = Decimal.log10(v22).add(1).max(1)
                if(hasVUpg(33)) v22 = v22.pow(getVUpgEff(33))
                if(hasRUpg(31)) v22 = v22.pow(getRUpgEff(31))
                return v22
            },
            effectDisplay(){
                return format(getVUpgEff(22))+"x"
            },
            unlocked(){
                return hasVUpg(21)
            }
        },
        23: {
            title: "More Infections",
            description: "Raise 'Infection' to the number of bought upgrades.",
            cost: new Decimal(200),
            effect(){
                let v23 = player.v.upgrades.length
                if(hasRUpg(22)) v23 = Decimal.mul(v23,getRUpgEff(22))
                return v23
            },
            effectDisplay(){
                return "^"+format(getVUpgEff(23))
            },
            unlocked(){
                return hasVUpg(22)
            }
        },
        31: {
            title: "Disease",
            description: "Multiplier to VP based on VP.",
            cost: new Decimal(5e3),
            effect(){
                let v31 = player.v.points.add(10).max(10)
                v31 = Decimal.log10(v31).pow(1.3)
                if(hasRUpg(12)) v31 = v31.pow(getRUpgEff(12))
                if (v31.gte("eee50")) v31 = v31.div("eee50").log10().log10().pow(0.85).pow10().pow10().mul("eee50")
                if (v31.gte(Decimal.pow(10,Decimal.pow(10,Decimal.pow(10,4e4))))) v31 = v31.log10().log10().pow(Decimal.pow(10,39995).mul(2.5)).pow10()
                return v31
            },
            effectDisplay(){
                return format(getVUpgEff(31))+"x"
            },
            unlocked(){
                return hasVUpg(23)
            }
        },
        32: {
            title: "BOOSTER",
            description: "'Self Boost' is stronger based on VP.",
            cost: new Decimal(2.5e5),
            effect(){
                let v32 = player.v.points.add(10).max(10)
                v32 = Decimal.log10(v32).pow(0.2)
                return v32
            },
            effectDisplay(){
                return "^"+format(getVUpgEff(32))
            },
            unlocked(){
                return hasVUpg(31)
            }
        },
        33: {
            title: "Food Contamination",
            description: "'Contaminate' is stronger based on cases.",
            cost: new Decimal(5e6),
            effect(){
                let v33 = player.points.add(10).max(10)
                v33 = Decimal.log10(v33).pow(0.15)
                if (hasMilestone("Uv",2)) v33 = v33.pow(4.5)
                return v33
            },
            effectDisplay(){
                return "^"+format(getVUpgEff(33))
            },
            unlocked(){
                return hasVUpg(32)
            }
        },
    },
    layerShown() {return player.uv.tree == "normal"}
})
