addLayer("f", {
    name: "fatality",
    symbol: "F",
    position: 0,
    startData() { return {
        points: decimalZero,
        best: decimalZero,
        total: decimalZero,
        unlocked: false,
        sac: decimalZero,
        p: decimalZero,
        mult: decimalZero,
        d1: decimalZero,
        d2: decimalZero,
        d3: decimalZero,
        d4: decimalZero,
        d5: decimalZero,
        d6: decimalZero,
        d7: decimalZero,
        d8: decimalZero,
        resettime: new Decimal(0.001),
        cpm: decimalZero,
        casualty: decimalZero,
        casualtyTotal: decimalZero,
        d1auto: false,
        d2auto: false,
        d3auto: false,
        d4auto: false,
        d5auto: false,
        d6auto: false,
        d7auto: false,
        d8auto: false,
        multauto: false,
        boostauto: false,
        multbauto: false,
        sacauto: false,
        cmultauto: false,
        cdauto: false,
        crbauto: false,
        rbauto: false,
        iauto: false,
        rmultauto: false,
        kep: ['cdauto','crbauto','cmultauto','d1auto','d2auto','d3auto','d4auto','d5auto','d6auto','d7auto','d8auto','multauto','rmultauto','multbauto','sacauto','boostauto','rbauto','iauto'],
        t: [decimalZero,decimalZero,decimalZero,decimalZero,decimalZero,decimalZero,decimalZero,decimalZero,decimalZero,decimalZero,decimalZero],
        times: [decimalZero,decimalZero,decimalZero,decimalZero,decimalZero,decimalZero,decimalZero,decimalZero,decimalZero,decimalZero,decimalZero],
        buy: [41,42,43,44,51,52,53,54,61,62,63],
        sact: decimalZero,
        sactimes: decimalZero,
        cd: [decimalZero,decimalZero,decimalZero,decimalZero,decimalZero,decimalZero,decimalZero,decimalZero],
        cp: decimalZero,
        casuals: decimalOne,
        rt: decimalZero,
        rtimes: decimalZero,
        crb: decimalZero,
        crbtimes: decimalZero,
        rb: decimalZero,
        rbtimes: decimalZero,
        cboosts: decimalZero,
        virus: decimalZero,
        bt: decimalZero,
        btimes: decimalZero,
    }},
    color: "#f53d63",
    nodeStyle() {return {
        "background": (player.f.unlocked||canReset("f"))?"radial-gradient(#d5a776, #f53d63)":"#bf8f8f" ,
    }},
    componentStyles: {
        "prestige-button"() {return { "background": canReset("f")?"radial-gradient(#d5a776, #f53d63)":"#bf8f8f" }},
    },
    requires: Decimal.pow(10,10450),
    resource: "fatality",
    baseResource: "deaths",
    baseSingular: "death",
    baseAmount() { return player.d.points },
    type: "custom",
    exponent: 0.3,
    branches: ["d","s","u"],
    row: "3",
    hotkeys: [
            {key:"f", description: "F:Reset for fatality", onPress() {
                if (canReset(this.layer) && !hasMilestone("f",9)) doReset(this.layer)}
            },
            {key:"m", description: "M:Buy max Fatality Dimensions", onPress() {
                if (hasMilestone("f",6)) layers.f.clickables[11].onClick()
                if (hasMilestone("f",16)) layers.f.clickables[51].onClick()}
            },
            {key:"c", description: "C:Reset for casualty", onPress() {
                if (hasMilestone("f",12) && player.f.points.gte(Decimal.pow(10,5095).mul(5))) layers.f.clickables[12].onClick()}
            },
    ],
    powergain() {
        let pgain = tmp.f.buyables[11].gain
        return pgain.mul(tmp.ct.effect)
    },
    cpowergain() {
        let pgain = tmp.f.buyables[71].gain
        return pgain.mul(tmp.ct.effect)
    },
    fDimMult() {
        let mult = decimalOne
        if (hasFUpg(35)) mult = mult.mul(getFUpgEff(35))
        if (hasFUpg(41)) mult = mult.mul(getFUpgEff(41))
        if (hasFUpg(52)) mult = mult.mul(getFUpgEff(52))
        if (hasFUpg(55)) mult = mult.mul(getFUpgEff(55))
        if (hasFUpg(61)) mult = mult.mul(getFUpgEff(61))
        if (hasFUpg(81)) mult = mult.mul(getFUpgEff(81))
        if (hasFUpg(103)) mult = mult.mul(getFUpgEff(103))
        mult = mult.mul(tmp.f.buyables[31].effect)
        mult = mult.mul(tmp.f.buyables[32].effect)
        mult = mult.mul(this.cpeffect())
        if (inChallenge("f",61)) mult = tmp.f.buyables[32].effect
        if (inChallenge("f",62)) mult = this.cpeffect()
        if (hasAchievement("a",54)) mult = mult.mul(2)
        if (hasAchievement("a",65)) mult = mult.mul(tmp.a.effect)
        return mult
    },
    cDimMult() {
        let mult = decimalOne
        if (hasChallenge("f",31)) mult = mult.mul(challengeEffect("f",31))
        if (hasChallenge("f",52)) mult = mult.mul(challengeEffect("f",52))
        if (!hasUpgrade("Us",42)) mult = mult.mul(this.caseffect())
        if (hasFUpg(153)) mult = mult.mul(getFUpgEff(153))
        return mult
    },
    virusGain() {
        let exp = decimalTwo
        if (hasFUpg(163)) exp = exp.add(1).max(1)
        if (hasFUpg(164)) exp = exp.add(getFUpgEff(164))
        if (hasFUpg(165)) exp = exp.add(getFUpgEff(165))
        if (hasFUpg(166)) exp = exp.add(getFUpgEff(166))
        exp = exp.add(tmp.f.buyables[102].effect)
        let gain = player.f.casualty.div("ee4").add(1).max(1).log10().pow(exp).div(10000)
        if (hasFUpg(155)) gain = gain.mul(getFUpgEff(155))
        if (hasFUpg(157)) gain = gain.mul(tmp.f.upgrades[157].effect)
        if (hasFUpg(162)) gain = gain.mul(getFUpgEff(162))
        if (hasFUpg(181)) gain = gain.mul(getFUpgEff(181))
        gain = gain.mul(tmp.f.buyables[101].effect)
        if (hasUpgrade("e",12)) gain = gain.mul(upgradeEffect("e",12))
        if (hasUpgrade("e",125)) gain = gain.mul(upgradeEffect("e",125))
        return gain.mul(tmp.ct.effect)
    },
    speed() {
        let speed = 1
        if (hasUpgrade("e",12)) speed*=2
        if (hasUpgrade("e",23)) speed*=2
        if (hasUpgrade("e",123)) speed*=2
        if (hasMilestone("e",0)) speed*=4
        return speed
    },
    bulk() {
        let bulk = decimalOne
        if (hasUpgrade("e",12)) bulk = bulk.mul(10)
        if (hasUpgrade("e",23)) bulk = bulk.mul(100)
        if (hasUpgrade("e",123)) bulk = bulk.mul(1000)
        if (hasUpgrade("e",81)) bulk = bulk.pow(10)
        if (hasMilestone("e",8)) bulk = bulk.tetrate(1.79e308)
        return bulk
    },
    int() {
        let int = new Decimal(308)
        if (hasUpgrade("e",155)) int = int.mul(upgradeEffect("e",155))
        return int
    },
    update(diff) {
        player.f.p = player.f.p.add(tmp.f.powergain.mul(diff))
        player.f.cp = player.f.cp.add(tmp.f.cpowergain.mul(diff))
        if (hasMilestone("f",20)) player.f.virus = player.f.virus.add(tmp.f.virusGain.mul(diff)).min(tmp.f.virusGain.mul(60))
        player.f.casualtyTotal = player.f.casualtyTotal.max(player.f.casualty)
        player.f.resettime = player.f.resettime.add(diff)
        if (hasMilestone("f",7)) generatePoints("f",diff/100)
        if (hasMilestone("f",9)) generatePoints("f",diff)
        if (hasMilestone("f",18)) {
            player.f.casualty = player.f.casualty.add(tmp.f.clickables[12].gain.mul(diff/100))
            player.f.casualtyTotal = player.f.casualtyTotal.add(tmp.f.clickables[12].gain.mul(diff/100))
        }
        if (hasFUpg(113)) {
            player.f.casualty = player.f.casualty.add(getFUpgEff(113).mul(diff))
            player.f.casualtyTotal = player.f.casualtyTotal.add(getFUpgEff(113).mul(diff))
        }
        player.f.buyables[11] = player.f.buyables[11].add(tmp.f.buyables[12].gain.mul(diff))
        player.f.buyables[12] = player.f.buyables[12].add(tmp.f.buyables[13].gain.mul(diff))
        player.f.buyables[13] = player.f.buyables[13].add(tmp.f.buyables[14].gain.mul(diff))
        player.f.buyables[14] = player.f.buyables[14].add(tmp.f.buyables[21].gain.mul(diff))
        player.f.buyables[21] = player.f.buyables[21].add(tmp.f.buyables[22].gain.mul(diff))
        player.f.buyables[22] = player.f.buyables[22].add(tmp.f.buyables[23].gain.mul(diff))
        player.f.buyables[23] = player.f.buyables[23].add(tmp.f.buyables[24].gain.mul(diff))
        player.f.buyables[71] = player.f.buyables[71].add(tmp.f.buyables[72].gain.mul(diff)).max(player.f.cd[0])
        player.f.buyables[72] = player.f.buyables[72].add(tmp.f.buyables[73].gain.mul(diff)).max(player.f.cd[1])
        player.f.buyables[73] = player.f.buyables[73].add(tmp.f.buyables[74].gain.mul(diff)).max(player.f.cd[2])
        player.f.buyables[74] = player.f.buyables[74].add(tmp.f.buyables[81].gain.mul(diff)).max(player.f.cd[3])
        player.f.buyables[81] = player.f.buyables[81].add(tmp.f.buyables[82].gain.mul(diff)).max(player.f.cd[4])
        player.f.buyables[82] = player.f.buyables[82].add(tmp.f.buyables[83].gain.mul(diff)).max(player.f.cd[5])
        player.f.buyables[83] = player.f.buyables[83].add(tmp.f.buyables[84].gain.mul(diff)).max(player.f.cd[6])
        player.f.times = [decimalZero,decimalZero,decimalZero,decimalZero,decimalZero,decimalZero,decimalZero,decimalZero,decimalZero,decimalZero,decimalZero]
        if (player.f.casualtyTotal.gte(1) || inChallenge("ct",32)) {
        for (i = 0; i < player.f.t.length; i++) {
            let t = tmp.f.buyables[player.f.buy[i]].speed.mul(diff)
            player.f.t[i] = Decimal.add(player.f.t[i], t)
            if (player.f.t[i].gte(1)) {
                player.f.times[i] = Decimal.floor(player.f.t[i]).mul(-1)
                player.f.t[i] = Decimal.add(player.f.t[i], player.f.times[i])
                player.f.times[i] = player.f.times[i].mul(-1)
                if (tmp.f.buyables[player.f.buy[i]].on) layers.f.buyables[player.f.buy[i]-30].buyMax(tmp.f.buyables[player.f.buy[i]].bulk)
            }
        }
    }
        let st = tmp.f.buyables[64].speed.mul(diff)
        player.f.sact = Decimal.add(player.f.sact, st)
        if (player.f.sact.gte(1) && !inChallenge("f",22) && !hasMilestone("f",14)) {
            player.f.sactimes = Decimal.floor(player.f.sact).mul(-1)
            player.f.sact = Decimal.add(player.f.sact, player.f.sactimes)
            player.f.sactimes = player.f.sactimes.mul(-1)
            if (tmp.f.buyables[64].on && tmp.f.clickables[13].effectnext.gte(100)) layers.f.clickables[13].onClick()
        }
        if (hasMilestone("f",14)) {
            player.f.sac = player.f.buyables[11]
        }
        let m = tmp.f.buyables[91].effect.pow(diff)
        let limit = new Decimal(1.7976e308)
        if (hasFUpg(181)) limit = Decimal.tetrate(10,1.79e308)
        if (tmp.f.buyables[92].effect.gte(0.1)) {
        player.f.rt = Decimal.add(player.f.rt, diff)
            if (player.f.rt.gte(tmp.f.buyables[92].interval) && hasMilestone("f",17)) {
                player.f.rtimes = player.f.rt.mul(-1)
                player.f.rt = Decimal.add(player.f.rt, player.f.rtimes)
                player.f.rtimes = player.f.rtimes.mul(-1)
                player.f.casuals = player.f.casuals.mul(tmp.f.buyables[91].effect).min(limit)
            }
        } 
        else if (player.f.casuals.mul(m.pow(tmp.f.buyables[92].interval.pow(-1))).gte(Decimal.pow(10,tmp.f.buyables[91].effect.log10().div(tmp.f.buyables[92].effect).mul(1e4).log(getFUpgEff(184)).mul(tmp.f.int)))) {
            player.f.casuals = Decimal.pow(10,tmp.f.buyables[91].effect.log10().div(tmp.f.buyables[92].effect).mul(0.0001).max(1).log(getFUpgEff(184)).mul(tmp.f.int))
        }
        else {
            player.f.casuals = player.f.casuals.mul(m.pow(tmp.f.buyables[92].interval.pow(-1))).min(limit)
        }
        player.f.casuals = player.f.casuals.max(1)
        let bst = tmp.f.speed*diff
        player.f.bt = Decimal.add(player.f.bt, bst)
        if (player.f.bt.gte(1)) {
            player.f.btimes = Decimal.floor(player.f.bt).mul(-1)
            player.f.bt = Decimal.add(player.f.bt, player.f.btimes)
            player.f.btimes = player.f.btimes.mul(-1)
            if (hasUpgrade("f", 187)) {
                layers.f.buyables[101].buyMax(player.f.btimes.mul(tmp.f.bulk))
                layers.f.buyables[102].buyMax(player.f.btimes.mul(tmp.f.bulk))
                layers.f.buyables[103].buyMax(player.f.btimes.mul(tmp.f.bulk))
            }
        }
        if (player.f.cmultauto) {
            if (hasMilestone("f",18)) {
                let max = player.f.casualty.div(5).max(1).log10()
                if (max.gte(1e35)) max = max.div(1e35).pow(1/3).mul(1e35)
                player.f.buyables[34] = max.ceil().max(player.f.buyables[34])
            }
            else layers.f.clickables[14].onClick()
        }
        if (player.f.cdauto) {
            player.f.cd[0] = player.f.casualty.max(1).div(1e14).log10().div(5).ceil().max(player.f.cd[0])
            player.f.cd[1] = player.f.casualty.max(1).div(1e16).log10().div(9).ceil().max(player.f.cd[1])
            player.f.cd[2] = player.f.casualty.max(1).div(1e29).log10().div(13).ceil().max(player.f.cd[2])
            player.f.cd[3] = player.f.casualty.max(1).div(1e50).log10().div(17).ceil().max(player.f.cd[3])
            player.f.cd[4] = player.f.casualty.max(1).div(Decimal.pow(10,460)).log10().div(20).ceil().max(player.f.cd[4])
            player.f.cd[5] = player.f.casualty.max(1).div(Decimal.pow(10,575)).log10().div(25).ceil().max(player.f.cd[5])
            player.f.cd[6] = player.f.casualty.max(1).div(Decimal.pow(10,790)).log10().div(30).ceil().max(player.f.cd[6])
            player.f.cd[7] = player.f.casualty.max(1).div(Decimal.pow(10,1905)).log10().div(40).ceil().max(player.f.cd[7])
            player.f.buyables[84] = player.f.casualty.max(1).div(Decimal.pow(10,1905)).log10().div(40).ceil().max(player.f.buyables[84])
        }
        if (player.f.crbauto) layers.f.buyables[93].buyMax()
        if (player.f.iauto) hasMilestone("e",0) ? layers.f.buyables[92].buyMax() : layers.f.buyables[92].buy()
        if (player.f.rmultauto) {
            if (hasFUpg(183)) {
                let max = player.f.casualty.max(1).div(Decimal.pow(10,470)).log10().div(25).ceil().max(0)
                player.f.buyables[91] = max
            }
            else layers.f.buyables[91].buyMax()
        }
        if (player.f.rbauto && tmp.f.clickables[52].canClick && !hasFUpg(181)) layers.f.clickables[52].onClick()
        if (player.f.rbauto && hasFUpg(181)) player.f.cboosts = tmp.f.buyables[93].effect
    },
    canReset() {return player.d.points.gte(Decimal.pow(10,10450)) && !hasMilestone("f",9)},
    gainMult() {
        let mult = decimalOne
        if (inChallenge("ct",32)) {
            if (hasUpgrade("Up",32)) mult = mult.mul(tmp.Up.upgrades[32].effect)
            if (hasUpgrade("Up",41)) mult = mult.mul(tmp.Up.upgrades[41].effect)
            if (hasMilestone("Up",9)) mult = mult.mul(tmp.Up.milestones[8].effect)
        }
        else {
        if (hasFUpg(12)) mult = mult.mul(getFUpgEff(12))
        if (hasFUpg(14)) mult = mult.mul(getFUpgEff(14))
        if (hasFUpg(22)) mult = mult.mul(getFUpgEff(22))
        if (hasFUpg(24)) mult = mult.mul(getFUpgEff(24))
        mult = mult.mul(tmp.f.peffect)
        .mul(tmp.ct.effect)
        }
        return mult
    },
    gainExp() {
        let exp = decimalOne
        if (inChallenge("ct",32)) {
            if (hasChallenge("Up",41)) exp = exp.add(1)
            if (hasChallenge("Up",42)) exp = exp.add(1)
            if (hasUpgrade("Up",44)) exp = exp.add(1)
            if (hasUpgrade("ct",495)) exp = exp.add(1)
            if (hasAchievement("a",222) && player.Up.protein.gte(1)) exp = exp.add(0.2)
            exp = exp.add(tmp.Up.buyables[13].effect)
        }
        else {
        if (hasFUpg(25)) exp = exp.add(1).max(1)
        if (hasFUpg(32)) exp = exp.add(getFUpgEff(32))
        if (hasFUpg(42)) exp = exp.add(getFUpgEff(42))
        if (hasFUpg(51)) exp = exp.add(getFUpgEff(51))
        }
        if (hasAchievement("a",224)) exp = exp.mul(1.01)
        if (hasAchievement("a",225)) exp = exp.mul(1.02)
        return exp
    },
    getResetGain() {
        let f = tmp.f.baseAmount
        if (inChallenge("f",31)) f = Decimal.pow(10,10450)
        if (f.lt(tmp.f.requires)) return decimalZero
        let gain = f.div(tmp.f.requires).mul(10).log10().pow(tmp.f.exponent).pow(tmp.f.gainExp).mul(tmp.f.gainMult)
        if (!inChallenge("ct",32)) {
        if (inChallenge("f",42)) gain = gain.pow(0.1)
        if (inChallenge("f",51)) gain = Decimal.pow(10,gain.log10().pow(0.75))
        if (hasChallenge("f",42)) gain = gain.pow(1.05)
        if (hasFUpg(171)) gain = gain.pow(getFUpgEff(171))
        if (hasUpgrade("e",175)) gain = gain.pow(upgradeEffect("e",175))
        if (hasUpgrade("e",194)) gain = gain.pow(upgradeEffect("e",194))
        }
        return gain.floor()
    },
    getNextAt() {
        let next = tmp.f.getResetGain.add(1).max(1)
		if (next.gte(tmp.f.softcap)) next = next.div(tmp.f.softcap.pow(decimalOne.sub(tmp.f.softcapPower))).pow(decimalOne.div(tmp.f.softcapPower))
		next = Decimal.pow(10,(next.div(tmp.f.gainMult).root(tmp.f.exponent).root(tmp.f.gainExp))).mul(tmp.f.requires).div(10).max(tmp.f.requires)
		return next;
    },
    prestigeButtonText() {
        let text =  `${ player.f.points.lt(1e3) ? (tmp.f.resetDescription !== undefined ? tmp.f.resetDescription : "Reset for ") : ""}+<b>${formatWhole(tmp.f.resetGain)}</b> ${tmp.f.resource} ${tmp.f.getResetGain.lt(100) && player.f.points.lt(1e3) ? `<br><br>Next at ${ (tmp.f.roundUpCost ? formatWhole(tmp.f.nextAt) : format(tmp.f.nextAt))} ${ tmp.f.baseResource }` : ""}` + "<br>"
        let gain = tmp.f.getResetGain.div(player.f.resettime)
        if (gain.gte(10)) text += format(gain) + "/s"
        else text += format(gain.mul(60)) + "/min"
        return text
    },
    layerShown() {
        return (hasSUpg(55) || player.f.unlocked) && player.uv.tree == "normal"
    },
    doReset(resettingLayer) {
        let keep=[];
        if (hasMilestone("ct", 0)) {
            keep.push("milestones")
            keep.push("challenges")
        }
        if (hasMilestone("ct", 1)) keep.push("upgrades")
        if (hasMilestone("a", 0)) player.u.auto = true
        player.f.resettime = new Decimal(0.001)
        if (hasMilestone("ct", 0)) {
            for (i = 0; i < player.f.kep.length; i++) {
                keep.push(player.f.kep[i])
            }
        }
        if (layers[resettingLayer].row > this.row || resettingLayer=='Uu' || resettingLayer=='Ud') layerDataReset(this.layer, keep)
        if (hasMilestone("ct", 0)) {
            for (i = 0; i < 9; i++) {
                player.f.buyables[player.f.buy[i]] = new Decimal(15)
            }
            player.f.buyables[62] = new Decimal(9)
            player.f.buyables[63] = new Decimal(13)
            player.f.buyables[64] = new Decimal(9)
        }
    },
    multpd() {
        let base = decimalTwo
        if (hasFUpg(53)) base = base.add(getFUpgEff(53))
        if (hasFUpg(82)) base = base.add(0.3)
        if (hasUpgrade("Up",42)) base = base.pow(tmp.Up.upgrades[42].effect)
        if (hasUpgrade("Up",62)) base = base.pow(3)
        if (inChallenge("f",12)) base = decimalOne
        return base
    },
    cmultpd() {
        let base = decimalFive
        return base
    },
    cmultExp() {
        let exp = decimalOne
        if (hasMilestone("Up",17)) exp = exp.mul(tmp.Up.milestones[17].effect)
        return exp
    },
    effect() {
        let eff = player.f.best.add(1).max(1)
        eff = eff.pow(eff.log10().add(1).max(1).pow(1.7)).pow(15)
        if (hasFUpg(15)) eff = eff.pow(getFUpgEff(15))
        if (hasFUpg(124)) eff = eff.pow(getFUpgEff(124))
        if (eff.gte(Decimal.pow(10,2e6))) eff = Decimal.pow(10,eff.div(Decimal.pow(10,2e6)).log10().pow(0.85)).mul(Decimal.pow(10,2e6))
        return eff
    },
    effect2() {
        let eff = player.f.best.add(1).max(1)
        eff = eff.pow(eff.log10().add(1).max(1).pow(1.2)).pow(2)
        if (hasFUpg(124)) eff = eff.pow(getFUpgEff(124))
        return eff
    },
    peffect() {
        let eff = player.f.p.add(1).max(1)
        eff = eff.pow(0.6)
        if (hasFUpg(62)) eff = eff.pow(getFUpgEff(62))
        if (hasFUpg(161)) eff = eff.pow(getFUpgEff(161))
        if (hasUpgrade("e",144)) eff = eff.pow(upgradeEffect("e",144))
        if (eff.gte(Decimal.pow(10,1e8))) eff = Decimal.pow(10,eff.div(Decimal.pow(10,1e8)).log10().pow(0.8)).mul(Decimal.pow(10,1e8))
        if (eff.gte(Decimal.pow(10,5e10))) eff = hasUpgrade("e",141) ? Decimal.pow(10,eff.div(Decimal.pow(10,5e10)).log10().pow(0.93)).mul(Decimal.pow(10,5e10)) : eff.log10().div(5).pow(5e9)
        if (eff.gte(Decimal.pow(10,1e66))) eff = Decimal.pow(10,eff.div(Decimal.pow(10,1e66)).log10().pow(0.66)).mul(Decimal.pow(10,1e66))
        if (inChallenge("f",52)) eff = decimalOne
        return eff
    },
    cpeffect() {
        let exp = 0.8
        if (hasUpgrade("Up",73)) exp = 8/9
        let eff = player.f.cp.add(1).max(1)
        eff = eff.pow(50)
        if (hasChallenge("f",42)) eff = eff.pow(1.5)
        if (hasChallenge("f",62)) eff = eff.pow(challengeEffect("f",62))
        if (hasFUpg(167)) eff = eff.pow(getFUpgEff(167))
        if (eff.gte(Decimal.pow(10,2e9))) eff = Decimal.pow(10,eff.div(Decimal.pow(10,2e9)).log10().pow(exp)).mul(Decimal.pow(10,2e9))
        if (eff.gte(Decimal.pow(10,1e24)) && inChallenge("ct",32)) eff = Decimal.pow(10,eff.div(Decimal.pow(10,1e24)).log10().pow(0.9)).mul(Decimal.pow(10,1e24))
        if (eff.gte(Decimal.pow(10,1e30)) && inChallenge("ct",32)) eff = eff.log10().div(1e30).pow(0.8).mul(1e30).pow10()
        if (eff.gte(Decimal.pow(10,1e36)) && inChallenge("ct",32)) eff = eff.log10().div(1e36).pow(0.75).mul(1e36).pow10()
        //if (eff.gte(Decimal.pow(10,1e45)) && inChallenge("ct",32)) eff = eff.log10().div(1e45).pow(0.5).mul(1e45).pow10()
        return eff
    },
    caseffect() {
        let eff = player.f.casuals.max(1)
        eff = eff.log10().add(1).max(1).pow(30) 
        if (eff.gte(1e30)) eff = eff.div(1e30).pow(0.2).mul(1e30)
        if (hasFUpg(181)) eff = eff.add(player.f.casuals.max(1).pow(20))
        if (hasUpgrade("Up",72)) eff = eff.pow(tmp.Up.upgrades[72].effect)
        if (hasUpgrade("Us",42)) eff = eff.max(10).log10().pow(0.02)
        if (hasUpgrade("Us",101)) {
            eff = eff.max(10).log10().max(10).log10().pow(0.02)
            if (eff.gte(3)) eff = eff.add(7).log10().pow(0.5).pow10().add(2).div(4)
            if (eff.gte(1e11)) eff = eff.log10().div(11).pow(0.4).mul(11).pow10()
        }
        return eff
    },
    DimScaling() {
        let scale = decimalTen
        if (inChallenge("ct",32)) {
            if (hasUpgrade("Up",63)) scale = scale.sub(1)
        }
        else {
        if (inChallenge("f",21)) scale = new Decimal(100)
        if (inChallenge("f",41)) scale = new Decimal(1.797e308)
        if (hasFUpg(65)) scale = scale.sub(1)
        if (hasFUpg(73)) scale = scale.sub(1)
        if (hasFUpg(111)) scale = scale.sub(1)
        if (hasFUpg(84)) scale = scale.sub(1)
        if (hasFUpg(115)) scale = scale.sub(1)
        if (hasFUpg(122)) scale = scale.sub(1)
        if (hasFUpg(134)) scale = scale.sub(0.5)
        if (hasFUpg(154)) scale = scale.sub(getFUpgEff(154))
        if (hasFUpg(185)) scale = scale.sub(tmp.f.upgrades[185].effect)
        if (hasChallenge("f",41)) scale = scale.sub(1)
        if (hasUpgrade("e",35)) scale = scale.pow(0.05)
        if (hasUpgrade("e",186)) scale = new Decimal(1.000001)
        }
        return scale
    },
    effectDescription() {
        return "which boosts cases, VP, infectivity, severity by " + layerText("h2", "f", format(this.effect())) + ", and death gain by " +layerText("h2", "f", format(this.effect2())) + " (based on best)."
    },
    tabFormat: {
        "Milestones": {
            content: [
                function() {if (player.tab == "f" && player.subtabs.f.mainTabs == "Milestones") return "main-display"},
                ["raw-html", function() {if (hasMilestone("f",9)) return "You are gaining " + layerText("h2", "f", format(tmp.f.getResetGain)) + " fatality per second"}],
                function() {if (!hasMilestone("f",9)) return "prestige-button"},
                "resource-display",
                ["display-text", 
                function() {
                    if (!hasMilestone("f",9)) return "Fatality time: " + formatTime(player.f.resettime)
                }
                ],
                "blank",
                "milestones",
            ]
        },
        "Upgrades": {
            content: [
                function() {if (player.tab == "f" && player.subtabs.f.mainTabs == "Upgrades") return "main-display"},
                ["raw-html", function() {if (hasMilestone("f",9)) return "You are gaining " + layerText("h2", "f", format(tmp.f.getResetGain)) + " fatality per second"}],
                function() {if (!hasMilestone("f",9)) return "prestige-button"},
                "resource-display",
                ["display-text", 
                function() {
                    if (!hasMilestone("f",9)) return "Fatality time: " + formatTime(player.f.resettime)
                }
                ],
                "blank",
                function() {if (player.tab == "f" && player.subtabs.f.mainTabs == "Upgrades") return ["upgrades",[1,2,3,4,5,6,7]]}
            ]
        },
        "Dimensions": {
            content: [
                function() {if (player.tab == "f" && player.subtabs.f.mainTabs == "Dimensions") return "main-display"},
                ["raw-html", function() {if (hasMilestone("f",9) && player.tab == "f" && player.subtabs.f.mainTabs == "Dimensions" ) return "You are gaining " + layerText("h2", "f", format(tmp.f.getResetGain)) + " fatality per second"}],
                function() {if (!hasMilestone("f",9)) return "prestige-button"},
                "resource-display",
                ["raw-html", function() {
                    if (player.tab != "f" || player.subtabs.f.mainTabs != "Dimensions" ) return
                    let dis = "You have " + layerText("h2", "f", format(player.f.p)) + " fatality power, which boosts fatality gain by " + layerText("h2", "f", format(tmp.f.peffect))
                    if (tmp.f.peffect.gte(Decimal.pow(10,1e8))) dis += " (softcapped)"
                    return dis
                }],
                ["raw-html", 
                function () {
                    if (player.tab == "f" && player.subtabs.f.mainTabs == "Dimensions") {
                    let a = "You are gaining " + format(tmp.f.powergain) + " fatality power per second.<br>"
                    let b = "You are gaining " + format(tmp.f.buyables[12].gain) + " Fatality Dimension 1 per second.<br>"
                    let c = "You are gaining " + format(tmp.f.buyables[13].gain) + " Fatality Dimension 2 per second.<br>"
                    let d = "You are gaining " + format(tmp.f.buyables[14].gain) + " Fatality Dimension 3 per second.<br>"
                    let e = "You are gaining " + format(tmp.f.buyables[21].gain) + " Fatality Dimension 4 per second.<br>"
                    let f = "You are gaining " + format(tmp.f.buyables[22].gain) + " Fatality Dimension 5 per second.<br>"
                    let g = getBuyableAmount("f",32).gte(1)?"You are gaining " + format(tmp.f.buyables[23].gain) + " Fatality Dimension 6 per second.<br>":""
                    let h = getBuyableAmount("f",32).gte(2)?"You are gaining " + format(tmp.f.buyables[24].gain) + " Fatality Dimension 7 per second.<br>":""
                    return a+b+c+d+e+f+g+h
                    }
                }],
                "blank",
                ["row", [["clickable", 11],["clickable", 13]]],
                ["buyables",[1,2]],
                ["row", [["buyable", 31], ["buyable", 32], ["buyable", 33]]],
            ],
            unlocked() {return hasMilestone("f", 6)}
        },
        "Casualty": {
            content: [
                function() {if (player.tab == "f" && player.subtabs.f.mainTabs == "Casualty") return "main-display"},
                function() {if (!hasMilestone("f",9)) return "prestige-button"},
                ["display-text", 
                function() {
                    if (!hasMilestone("f",9)) return "Fatality time: " + formatTime(player.f.resettime)
                }
                ],
                "blank",
                ["raw-html", function() {if (player.tab == "f" && player.subtabs.f.mainTabs == "Casualty") return "You have <h2 style='color:#3d2963;text-shadow:0px 0px 10px;'>" + formatWhole(player.f.casualty) +"</h2> casualty"}],
                "blank",
                function() {if (!hasMilestone("f",18)) return ["row", [["clickable", 12]]]},
                ["display-text", 
                function() {
                    if (hasMilestone("f",18) && player.tab == "f" && player.subtabs.f.mainTabs == "Casualty") return "You are gaining <h2 style='color:#3d2963;text-shadow:0px 0px 10px;'>" + formatWhole(tmp.f.clickables[12].gain.div(100)) + "</h2> casualty per second."
                }
                ],
                "blank",
                ["display-text", 
                function() {
                    if (player.tab == "f" && player.subtabs.f.mainTabs == "Casualty") return "You have made a total of " + formatWhole(player.f.casualtyTotal) + " casualty."
                }
                ],
                ["display-text", 
                function() {
                    if (!hasMilestone("f",18)) return "Casualty time: " + formatTime(player.f.resettime)
                }
                ],
                ["display-text", 
                function() {
                    let dis = "Best Casualty/min: "
                    if (player.f.cpm.lt(10)) dis += format(player.f.cpm.mul(60)) + "/min"
                    else dis += format(player.f.cpm) + "/s"
                    if (!hasMilestone("f",18)) return dis
                }
                ],
                ["raw-html", "<br><h2>Casualty Upgrades</h2><br>"],
                function() {if (player.tab == "f" && player.subtabs.f.mainTabs == "Casualty") return ["upgrades",[8,9,10,11,12,13,14]]}
            ],
            buttonStyle: {"border-color": "#3d2963"},
            unlocked() {return hasMilestone("f", 12)},
        },
        "Multiplier": {
            content: [
                ["raw-html", function() {if (player.tab == "f" && player.subtabs.f.mainTabs == "Multiplier") return "You have <h2 style='color:#3d2963;text-shadow:0px 0px 10px;'>" + formatWhole(player.f.casualty) +"</h2> casualty"}],
                "blank",
                function() {if (!hasMilestone("f",18)) return ["row", [["clickable", 12]]]},
                ["display-text", 
                function() {
                    if (hasMilestone("f",18) && player.tab == "f" && player.subtabs.f.mainTabs == "Multiplier") return "You are gaining <h2 style='color:#3d2963;text-shadow:0px 0px 10px;'>" + formatWhole(tmp.f.clickables[12].gain.div(100)) + "</h2> casualty per second."
                }
                ],
                "blank",
                ["column", [["row", [["clickable", 14]]]]],
                ["row", [["buyable", 34]]],
            ],
            buttonStyle: {"border-color": "#3d2963"},
            unlocked() {return hasMilestone("f", 12)},
        },
        "Challenges": {
            content: [
                ["raw-html", function() {if (player.tab == "f" && player.subtabs.f.mainTabs == "Challenges") return "You have <h2 style='color:#3d2963;text-shadow:0px 0px 10px;'>" + formatWhole(player.f.casualty) +"</h2> casualty"}],
                "blank",
                function() {if (!hasMilestone("f",18)) return ["row", [["clickable", 12]]]},
                ["display-text", 
                function() {
                    if (hasMilestone("f",18) && player.tab == "f" && player.subtabs.f.mainTabs == "Challenges") return "You are gaining <h2 style='color:#3d2963;text-shadow:0px 0px 10px;'>" + formatWhole(tmp.f.clickables[12].gain.div(100)) + "</h2> casualty per second."
                }
                ],
                "blank",
                ["display-text", 
                function() {
                    if (player.tab == "f" && player.subtabs.f.mainTabs == "Challenges") return "You have made a total of " + formatWhole(player.f.casualtyTotal) + " casualty."
                }
                ],
                ["display-text", 
                function() {
                    return "Starting a challenge does a casualty reset. Completing a challenge gives " + formatWhole(tmp.f.buyables[34].effect) + " casualty"
                }
                ],
                ["bar", "NextCC"],
                "challenges"
            ],
            buttonStyle: {"border-color": "#3d2963"},
            unlocked() {return hasMilestone("f", 12)},
        },
        "Autobuyers": {
            content: [
                ["raw-html", function() {if (player.tab == "f" && player.subtabs.f.mainTabs == "Autobuyers") return "You have <h2 style='color:#3d2963;text-shadow:0px 0px 10px;'>" + formatWhole(player.f.casualty) +"</h2> casualty"}],
                "blank",
                function() {if (!hasMilestone("f",18)) return ["row", [["clickable", 12]]]},
                ["display-text", 
                function() {
                    if (hasMilestone("f",18) && player.tab == "f" && player.subtabs.f.mainTabs == "Autobuyers") return "You are gaining <h2 style='color:#3d2963;text-shadow:0px 0px 10px;'>" + formatWhole(tmp.f.clickables[12].gain.div(100)) + "</h2> casualty per second."
                }
                ],
                "blank",
                ["display-text", 
                function() {
                    if (player.tab == "f" && player.subtabs.f.mainTabs == "Autobuyers") return "You have made a total of " + formatWhole(player.f.casualtyTotal) + " casualty."
                }
                ],
                ["row",[["column", [["buyable", 41],["clickable", 21]]],["column", [["buyable", 42],["clickable", 22]]],["column", [["buyable", 43],["clickable", 23]]],["column", [["buyable", 44],["clickable", 24]]]]],
                ["row",[["column", [["buyable", 51],["clickable", 31]]],["column", [["buyable", 52],["clickable", 32]]],["column", [["buyable", 53],["clickable", 33]]],["column", [["buyable", 54],["clickable", 34]]]]],
                ["row",[["column", [["buyable", 61],["clickable", 41]]],["column", [["buyable", 62],["clickable", 42]]],["column", [["buyable", 63],["clickable", 43]]],["column", [["buyable", 64],["clickable", 44]]]]],
            ],
            buttonStyle: {"border-color": "#3d2963"},
            unlocked() {return hasChallenge("f", 11)},
        },
        "Casualty Dimensions": {
            content: [
                ["raw-html", function() {if (player.tab == "f" && player.subtabs.f.mainTabs == "Casualty Dimensions" ) return "You have <h2 style='color:#3d2963;text-shadow:0px 0px 10px;'>" + formatWhole(player.f.casualty) +"</h2> casualty"}],
                "blank",
                function() {if (!hasMilestone("f",18)) return ["row", [["clickable", 12]]]},
                ["display-text", 
                function() {
                    if (hasMilestone("f",18) && player.tab == "f" && player.subtabs.f.mainTabs == "Casualty Dimensions" ) return "You are gaining <h2 style='color:#3d2963;text-shadow:0px 0px 10px;'>" + formatWhole(tmp.f.clickables[12].gain.div(100)) + "</h2> casualty per second."
                }
                ],
                "blank",
                ["display-text", 
                function() {
                    if (player.tab == "f" && player.subtabs.f.mainTabs == "Casualty Dimensions" ) return "You have made a total of " + formatWhole(player.f.casualtyTotal) + " casualty."
                }
                ],
                ["raw-html", function() {
                    if (player.tab != "f" || player.subtabs.f.mainTabs != "Casualty Dimensions" ) return
                    let dis = "You have <h2 style='color:#3d2963;text-shadow:0px 0px 10px;'>" + format(player.f.cp) + "</h2> casualty power, which boosts Fatality Dimensions by <h2 style='color:#3d2963;text-shadow:0px 0px 10px;'>" + format(tmp.f.cpeffect) +"</h2>"
                    if (tmp.f.cpeffect.gte(Decimal.pow(10,2e9))) dis += " (softcapped)"
                    return dis
                }],
                ["raw-html", 
                function () {
                    if (player.tab == "f" && player.subtabs.f.mainTabs == "Casualty Dimensions") {
                    let a = "You are gaining " + format(tmp.f.cpowergain) + " casualty power per second.<br>"
                    let b = "You are gaining " + format(tmp.f.buyables[72].gain) + " Casualty Dimension 1 per second.<br>"
                    let c = tmp.f.buyables[73].unlocked?"You are gaining " + format(tmp.f.buyables[73].gain) + " Casualty Dimension 2 per second.<br>":""
                    let d = tmp.f.buyables[74].unlocked?"You are gaining " + format(tmp.f.buyables[74].gain) + " Casualty Dimension 3 per second.<br>":""
                    let e = tmp.f.buyables[81].unlocked?"You are gaining " + format(tmp.f.buyables[81].gain) + " Casualty Dimension 4 per second.<br>":""
                    let f = tmp.f.buyables[82].unlocked?"You are gaining " + format(tmp.f.buyables[82].gain) + " Casualty Dimension 5 per second.<br>":""
                    let g = tmp.f.buyables[83].unlocked?"You are gaining " + format(tmp.f.buyables[83].gain) + " Fatality Dimension 6 per second.<br>":""
                    let h = tmp.f.buyables[84].unlocked?"You are gaining " + format(tmp.f.buyables[84].gain) + " Fatality Dimension 7 per second.<br>":""
                    return a+b+c+d+e+f+g+h
                    }
                }],
                ["bar", "NextCD"],
                "blank",
                ["column", [["row", [["clickable", 51]]]]],
                ["buyables",[7,8]]
                
            ],
            buttonStyle: {"border-color": "#3d2963"},
            unlocked() {return hasMilestone("f", 16)},
        },
        "Casuals": {
            content: [
                ["raw-html", function() {if (player.tab == "f" && player.subtabs.f.mainTabs == "Casuals") return "You have <h2 style='color:#3d2963;text-shadow:0px 0px 10px;'>" + formatWhole(player.f.casualty) +"</h2> casualty"}],
                "blank",
                function() {if (!hasMilestone("f",18)) return ["row", [["clickable", 12]]]},
                ["display-text", 
                function() {
                    if (hasMilestone("f",18) && player.tab == "f" && player.subtabs.f.mainTabs == "Casuals") return "You are gaining <h2 style='color:#3d2963;text-shadow:0px 0px 10px;'>" + formatWhole(tmp.f.clickables[12].gain.div(100)) + "</h2> casualty per second."
                }
                ],
                "blank",
                ["display-text", 
                function() {
                    if (player.tab == "f" && player.subtabs.f.mainTabs == "Casuals") return "You have made a total of " + formatWhole(player.f.casualtyTotal) + " casualty."
                }
                ],
                ["raw-html", function() {if (player.tab == "f" && player.subtabs.f.mainTabs == "Casuals") return "You have <h2 style='color:#3d2963;text-shadow:0px 0px 10px;'>" + formatWhole(player.f.casuals) +"</h2> "+pluralize(player.f.casuals,'casual','casuals',true)+", which "+pluralize(player.f.casuals,'boosts','boost',true)+(hasUpgrade("Us",101)?" antifolded protein effects by ^":hasUpgrade("Us",42)?" Unvaxxed Prion gain by ^":" Casualty Dimensions by ")+"<h2 style='color:#3d2963;text-shadow:0px 0px 10px;'>" + format(tmp.f.caseffect) +"</h2>"}],
                "blank",
                ["row", [["column", [["buyable", 91],["clickable", 62]]], ["column", [["buyable", 92],["clickable", 61]]], ["column", [["buyable", 93],["clickable", 53]]]]],
                ["row", [["column", [["clickable", 52],["clickable", 54]]]]]
            ],
            buttonStyle: {"border-color": "#3d2963"},
            unlocked() {return hasMilestone("f", 17)},
        },
        "Casual Virus": {
            content: [
                ["raw-html", function() {if (player.tab == "f" && player.subtabs.f.mainTabs == "Casual Virus") return "You have <h2 style='color:#3d2963;text-shadow:0px 0px 10px;'>" + formatWhole(player.f.casualty) +"</h2> casualty"}],
                "blank",
                function() {if (!hasMilestone("f",18)) return ["row", [["clickable", 12]]]},
                ["display-text", 
                function() {
                    if (hasMilestone("f",18) && player.tab == "f" && player.subtabs.f.mainTabs == "Casual Virus") return "You are gaining <h2 style='color:#3d2963;text-shadow:0px 0px 10px;'>" + formatWhole(tmp.f.clickables[12].gain.div(100)) + "</h2> casualty per second."
                }
                ],
                "blank",
                ["display-text", 
                function() {
                    if (player.tab == "f" && player.subtabs.f.mainTabs == "Casual Virus") return "You have made a total of " + formatWhole(player.f.casualtyTotal) + " casualty."
                }
                ],
                "blank",
                ["raw-html", function() {if (player.tab == "f" && player.subtabs.f.mainTabs == "Casual Virus") return "You have <h2 style='color:#3d2963;text-shadow:0px 0px 10px;'>" + format(player.f.virus) +"</h2> casual "+pluralize(player.f.virus,'virus','viruses')+""}],
                "blank",
                ["raw-html", function() {if (player.tab == "f" && player.subtabs.f.mainTabs == "Casual Virus") return "You are gaining <h2 style='color:#3d2963;text-shadow:0px 0px 10px;'>" + format(tmp.f.virusGain) +"</h2> casual "+pluralize(player.f.virus,'virus','viruses')+" per second, with a limit of <h2 style='color:#3d2963;text-shadow:0px 0px 10px;'>" + format(tmp.f.virusGain.mul(60)) + "</h2> casual "+pluralize(player.f.virus,'virus','viruses')+""}],
                ["upgrades",[15,16,17,18]],
                ["buyables",[10]]
            ],
            buttonStyle: {"border-color": "#3d2963"},
            unlocked() {return hasMilestone("f", 20)},
        },
    },
    
    milestones: {
        0: {
            requirementDescription() { return "2 total fatality" },
            effectDescription() { return "Keep first 5 death milestones on reset." },
            done() { return player.f.total.gte(2) }
        },
        1: {
            requirementDescription() { return "3 total fatality" },
            effectDescription() { return "Keep next 6 death milestones on reset." },
            done() { return player.f.total.gte(3) }
        },
        3: {
            requirementDescription() { return "10 total fatality" },
            effectDescription() { return "Keep previous upgrades on reset." },
            done() { return player.f.total.gte(10) }
        },
        4: {
            requirementDescription() { return "25 total fatality" },
            effectDescription() { return "Keep symptom challenges on reset." },
            done() { return player.f.total.gte(25) }
        },
        5: {
            requirementDescription() { return "3,000,000 total fatality" },
            effectDescription() { return "Unlock death buyables." },
            done() { return player.f.total.gte(3e6) }
        },
        6: {
            requirementDescription() { return format(1e11) + " total fatality" },
            effectDescription() { return "Unlock fatality dimensions and death buyables cost nothing." },
            done() { return player.f.total.gte(1e11) }
        },
        7: {
            requirementDescription() { return format(3e33) + " total fatality" },
            effectDescription() { return "Gain 1% of fatality gain per second." },
            done() { return player.f.total.gte(3e33) },
            unlocked() {return hasMilestone("f",6)|| player.ct.unlocked}
        },
        8: {
            requirementDescription() { return format(4.44e44) + " total fatality" },
            effectDescription() { return "Unlock Dimension Multiplier and autobuyers buy 100x more." },
            done() { return player.f.total.gte(4.44e44) },
            unlocked() {return hasMilestone("f",6)|| player.ct.unlocked}
        },
        9: {
            requirementDescription() { return format(Decimal.pow(2,512)) + " total fatality" },
            effectDescription() { return "Gain 100% of fatality gain per second and disable prestige." },
            done() { return player.f.total.gte(Decimal.pow(2,512)) },
            unlocked() {return hasMilestone("f",6)|| player.ct.unlocked}
        },
        10: {
            requirementDescription() { return format("6.969e420") + " total fatality" },
            effectDescription() { return "Unlock Dimension Shifts and dimensions cost nothing." },
            done() { return player.f.total.gte("6.969e420") },
            unlocked() {return hasMilestone("f",9)|| player.ct.unlocked}
        },
        11: {
            requirementDescription() { return format("1.337e1337") + " total fatality" },
            effectDescription() { return "Unlock Multiplier Boosts and buy max Dimension Boosts." },
            done() { return player.f.total.gte("1.337e1337") },
            unlocked() {return player.f.points.gte(Decimal.pow(10,1e3)) || hasMilestone("f",11)|| player.ct.unlocked}
        },
        12: {
            requirementDescription() { return format("5.095e5095") + " total fatality" },
            effectDescription() { return "Unlock Casualty and buy max Multiplier Boosts." },
            done() { return player.f.total.gte(Decimal.pow(10,5095).mul(5.095)) },
            unlocked() {return player.f.points.gte(Decimal.pow(10,4e3)) || hasMilestone("f",12)|| player.ct.unlocked}
        },
        13: {
            requirementDescription() { return "50 total casualty" },
            effectDescription() { return "Multiplier Boosts don't reset Dimension Boosts and unlock Auto Sacrifice." },
            done() { return player.f.casualtyTotal.gte(50) },
            unlocked() {return player.f.casualtyTotal.gte(1)|| player.ct.unlocked}
        },
        14: {
            requirementDescription() { return "10,000,000 total casualty" },
            effectDescription() { return "Dimension Boosts and Sacrifice reset nothing." },
            done() { return player.f.casualtyTotal.gte(1e7) },
            unlocked() {return player.f.casualtyTotal.gte(1e6)|| player.ct.unlocked}
        },
        15: {
            requirementDescription() { return format(1e12) + " total casualty" },
            effectDescription() { return "Multiplier Boosts reset nothing." },
            done() { return player.f.casualtyTotal.gte(1e12) },
            unlocked() {return player.f.casualtyTotal.gte(1e9)|| player.ct.unlocked}
        },
        16: {
            requirementDescription() { return format(1e14) + " total casualty" },
            effectDescription() { return "Unlock Casualty Dimensions." },
            done() { return player.f.casualtyTotal.gte(1e14) },
            unlocked() {return player.f.casualtyTotal.gte(1e12)|| player.ct.unlocked}
        },
        17: {
            requirementDescription() { return format("4.7e470") + " total casualty" },
            effectDescription() { return "Unlock Casuals." },
            done() { return player.f.casualtyTotal.gte("4.70e470") },
            unlocked() {return player.f.casualtyTotal.gte(1e100)|| player.ct.unlocked}
        },
        18: {
            requirementDescription() { return format("ee3") + " total casualty" },
            effectDescription() { return "Gain 1% of casualty gain per second, autobuy Casualty Multiplier, Casualty Multiplier costs nothing, and disable prestige." },
            done() { return player.f.casualtyTotal.gte(Decimal.pow(10,1e3)) },
            toggles: [["f", "cmultauto"]],
            unlocked() {return player.f.casualtyTotal.gte("e1000")|| player.ct.unlocked}
        },
        19: {
            requirementDescription() { return format("5.555e5555") + " total casualty" },
            effectDescription() { return "Autobuy Casualty Dimensions and they cost nothing." },
            done() { return player.f.casualtyTotal.gte("5.555e5555") },
            toggles: [["f", "cdauto"]],
            unlocked() {return player.f.casualtyTotal.gte(Decimal.pow(10,1e3))|| player.ct.unlocked}
        },
        20: {
            requirementDescription() { return format("ee4") + " total casualty" },
            effectDescription() { return "Unlock Casual Virus and Replicated Boost Autobuyer." },
            done() { return player.f.casualtyTotal.gte("ee4") },
            unlocked() {return player.f.casualtyTotal.gte("e5000")|| player.ct.unlocked}
        },
        21: {
            requirementDescription() { return format("ee5") + " total casualty" },
            effectDescription() { return "Unlock Casual Virus buyables." },
            done() { return player.f.casualtyTotal.gte("ee5") },
            unlocked() {return player.f.casualtyTotal.gte("ee4")|| player.ct.unlocked}
        },
    },
    clickables: {
        rows: 6,
        cols: 4,
        11: {
            display() {
                return "<h2>Max All (M)</h2>"
            },
            canClick() {return true},
            onClick() {
                layers.f.buyables[11].buyMax(Decimal.tetrate(10,1.79e308))
                layers.f.buyables[12].buyMax(Decimal.tetrate(10,1.79e308))
                layers.f.buyables[13].buyMax(Decimal.tetrate(10,1.79e308))
                layers.f.buyables[14].buyMax(Decimal.tetrate(10,1.79e308))
                layers.f.buyables[21].buyMax(Decimal.tetrate(10,1.79e308))
                layers.f.buyables[22].buyMax(Decimal.tetrate(10,1.79e308))
                if (getBuyableAmount("f",32).gte(1)) layers.f.buyables[23].buyMax(Decimal.tetrate(10,1.79e308))
                if (getBuyableAmount("f",32).gte(2)) layers.f.buyables[24].buyMax(Decimal.tetrate(10,1.79e308))
                layers.f.buyables[31].buyMax(Decimal.tetrate(10,1.79e308))
            },
            style: {'height':'130px', 'width':'130px'},
        },
        12: {
            gain() { 
                let f = player.f.points.add(1).max(1)
                if (f.lt("5e5095") && inChallenge("ct",32)) return decimalZero
                f = Decimal.pow(10,f.log10().div(5095).sub(1)).max(1).mul(tmp.f.clickables[12].gainmult)
                return f.floor()
            },
            next() {
                let gain = tmp.f.clickables[12].gain.add(1).max(1)
                let next = Decimal.pow(10,gain.div(tmp.f.clickables[12].gainmult).log10().add(1).max(1).mul(5095))
                return next
            },
            gainmult() {
                let mult = tmp.f.buyables[34].effect 
                if (hasFUpg(94)) mult = mult.mul(getFUpgEff(94))
                if (hasFUpg(104)) mult = mult.mul(getFUpgEff(104))
                if (hasFUpg(114)) mult = mult.mul(getFUpgEff(114))
                if (hasFUpg(85)) mult = mult.mul(getFUpgEff(85))
                if (hasMilestone("Us",5)) return mult.mul(tmp.ct.effect)
                return mult.mul(tmp.ct.effect).mul(tmp.Up.prpEff[0])
            },
            display() {
                let dis = "Reset Dimensions for +<h3>" + formatWhole(tmp.f.clickables[12].gain) + "</h3> casualty<br>"
                if (tmp.f.clickables[12].gain.lt(1000)) {
                if (player.f.points.gte(Decimal.pow(10,5095).mul(5))) dis += "Next at " + format(tmp.f.clickables[12].next) + " fatality"
                else dis += "Req: 5.095e5,095 fatality"
                }
                if (tmp.f.clickables[12].gain.div(player.f.resettime).gte(10)) dis += "<br>" + format(tmp.f.clickables[12].gain.div(player.f.resettime)) + "/s"
                else dis += "<br>" + format(tmp.f.clickables[12].gain.div(player.f.resettime).mul(60)) + "/min"
                return dis
            },
            canClick() {
                return player.f.points.gte(Decimal.pow(10,5095).mul(5)) && !hasMilestone("f",18)
            },
            onClick() {
                if (!hasMilestone("f",18)) {player.f.casualty = player.f.casualty.add(tmp.f.clickables[12].gain)
                player.f.casualtyTotal = player.f.casualtyTotal.add(tmp.f.clickables[12].gain)
                player.f.cpm = player.f.cpm.max(tmp.f.clickables[12].gain.div(player.f.resettime))
                startCChallenge(0)
                }
            },
            style: {'height':'130px', 'width':'175px', 'font-size':'13px',
            'background-color'() {
                let points = player.f.points
                let color = "#bf8f8f"
                if (points.gte(Decimal.pow(10,5095).mul(5))) color = "#3d2963"
                return color
            }
        }
        },
        14: {
            display() {
                return "<h2>Buy Max</h2>"
            },
            canClick() {return true},
            onClick() {
                layers.f.buyables[34].buyMax()
            },
            style: {'height':'130px', 'width':'130px',
                "background-color"() {
                    let color = "#3d2963"
                    return color
                }
            },
        },
        13: {
            display() {
                if (player.tab != "f") return 
                let dis = "<h2>Sacrifice</h2><br>Multiply Fatality Dimension 8 by " + format(this.effectnext().max(1)) + "."
                dis += "<br>Multiplier: " + format(this.effect()) + "x"
                return dis
            },
            effect() {
                let eff = player.f.sac.add(1).max(1).pow(0.025)
                if (hasChallenge("f",32)) eff = eff.pow(3)
                if (eff.gte(Decimal.pow(10,1e8))) eff = eff.div(Decimal.pow(10,1e8)).pow(0.2).mul(Decimal.pow(10,1e8))
                return eff
            },
            effectnext() {
                let eff = player.f.buyables[11].pow(0.025)
                if (hasChallenge("f",32)) eff = eff.pow(3)
                if (eff.gte(Decimal.pow(10,1e8))) eff = eff.div(Decimal.pow(10,1e8)).pow(0.2).mul(Decimal.pow(10,1e8))
                return eff.div(this.effect())
            },
            canClick() {return this.effectnext().gte(1) && player.f.buyables[24].gte(1)},
            onClick() {
                player.f.sac = player.f.sac.add(player.f.buyables[11])
                if (!hasMilestone("f",14)) {
                player.f.buyables[11] = decimalZero
                player.f.buyables[12] = decimalZero
                player.f.buyables[13] = decimalZero
                player.f.buyables[14] = decimalZero
                player.f.buyables[21] = decimalZero
                player.f.buyables[22] = decimalZero
                player.f.buyables[23] = decimalZero
                }
            },
            unlocked() {return hasFUpg(83)},
            style: {'height':'130px', 'width':'130px'},
        },
        21: {
            display() {
                if (player.f.d1auto) return "<h2>ON</h2>"
                else return "<h2>OFF</h2>"
            },
            canClick() {return true},
            onClick() {
                if (player.f.d1auto) player.f.d1auto = false 
                else player.f.d1auto = true
            },
            unlocked() {
                return hasChallenge("f",11)
            },
            style: {'height':'50px', 'min-height':'50px', 'width':'50px', 'background-color':"#3d2963"},
        },
        22: {
            display() {
                if (player.f.d2auto) return "<h2>ON</h2>"
                else return "<h2>OFF</h2>"
            },
            canClick() {return true},
            onClick() {
                if (player.f.d2auto) player.f.d2auto = false 
                else player.f.d2auto = true
            },
            unlocked() {
                return hasChallenge("f",11)
            },
            style: {'height':'50px', 'min-height':'50px', 'width':'50px', 'background-color':"#3d2963"},
        },
        23: {
            display() {
                if (player.f.d3auto) return "<h2>ON</h2>"
                else return "<h2>OFF</h2>"
            },
            canClick() {return true},
            onClick() {
                if (player.f.d3auto) player.f.d3auto = false 
                else player.f.d3auto = true
            },
            unlocked() {
                return hasChallenge("f",11)
            },
            style: {'height':'50px', 'min-height':'50px', 'width':'50px', 'background-color':"#3d2963"},
        },
        24: {
            display() {
                if (player.f.d4auto) return "<h2>ON</h2>"
                else return "<h2>OFF</h2>"
            },
            canClick() {return true},
            onClick() {
                if (player.f.d4auto) player.f.d4auto = false 
                else player.f.d4auto = true
            },
            unlocked() {
                return hasChallenge("f",12)
            },
            style: {'height':'50px', 'min-height':'50px', 'width':'50px', 'background-color':"#3d2963"},
        },
        31: {
            display() {
                if (player.f.d5auto) return "<h2>ON</h2>"
                else return "<h2>OFF</h2>"
            },
            canClick() {return true},
            onClick() {
                if (player.f.d5auto) player.f.d5auto = false 
                else player.f.d5auto = true
            },
            unlocked() {
                return hasChallenge("f",12)
            },
            style: {'height':'50px', 'min-height':'50px', 'width':'50px', 'background-color':"#3d2963"},
        },
        32: {
            display() {
                if (player.f.d6auto) return "<h2>ON</h2>"
                else return "<h2>OFF</h2>"
            },
            canClick() {return true},
            onClick() {
                if (player.f.d6auto) player.f.d6auto = false 
                else player.f.d6auto = true
            },
            unlocked() {
                return hasChallenge("f",12)
            },
            style: {'height':'50px', 'min-height':'50px', 'width':'50px', 'background-color':"#3d2963"},
        },
        33: {
            display() {
                if (player.f.d7auto) return "<h2>ON</h2>"
                else return "<h2>OFF</h2>"
            },
            canClick() {return true},
            onClick() {
                if (player.f.d7auto) player.f.d7auto = false 
                else player.f.d7auto = true
            },
            unlocked() {
                return hasChallenge("f",21)
            },
            style: {'height':'50px', 'min-height':'50px', 'width':'50px', 'background-color':"#3d2963"},
        },
        34: {
            display() {
                if (player.f.d8auto) return "<h2>ON</h2>"
                else return "<h2>OFF</h2>"
            },
            canClick() {return true},
            onClick() {
                if (player.f.d8auto) player.f.d8auto = false 
                else player.f.d8auto = true
            },
            unlocked() {
                return hasChallenge("f",21)
            },
            style: {'height':'50px', 'min-height':'50px', 'width':'50px', 'background-color':"#3d2963"},
        },
        41: {
            display() {
                if (player.f.multauto) return "<h2>ON</h2>"
                else return "<h2>OFF</h2>"
            },
            canClick() {return true},
            onClick() {
                if (player.f.multauto) player.f.multauto = false 
                else player.f.multauto = true
            },
            unlocked() {
                return hasChallenge("f",21)
            },
            style: {'height':'50px', 'min-height':'50px', 'width':'50px', 'background-color':"#3d2963"},
        },
        42: {
            display() {
                if (player.f.boostauto) return "<h2>ON</h2>"
                else return "<h2>OFF</h2>"
            },
            canClick() {return true},
            onClick() {
                if (player.f.boostauto) player.f.boostauto = false 
                else player.f.boostauto = true
            },
            unlocked() {
                return hasChallenge("f",22)
            },
            style: {'height':'50px', 'min-height':'50px', 'width':'50px', 'background-color':"#3d2963"},
        },
        43: {
            display() {
                if (player.f.multbauto) return "<h2>ON</h2>"
                else return "<h2>OFF</h2>"
            },
            canClick() {return true},
            onClick() {
                if (player.f.multbauto) player.f.multbauto = false 
                else player.f.multbauto = true
            },
            unlocked() {
                return hasChallenge("f",22)
            },
            style: {'height':'50px', 'min-height':'50px', 'width':'50px', 'background-color':"#3d2963"},
        },
        44: {
            display() {
                if (player.f.sacauto) return "<h2>ON</h2>"
                else return "<h2>OFF</h2>"
            },
            canClick() {return true},
            onClick() {
                if (player.f.sacauto) player.f.sacauto = false 
                else player.f.sacauto = true
            },
            unlocked() {
                return hasMilestone("f",13)
            },
            style: {'height':'50px', 'min-height':'50px', 'width':'50px', 'background-color':"#3d2963"},
        },
        51: {
            display() {
                return "<h2>Max All (M)</h2>"
            },
            canClick() {return true},
            onClick() {
                layers.f.buyables[71].buyMax(Decimal.tetrate(10,1.79e308))
                layers.f.buyables[72].buyMax(Decimal.tetrate(10,1.79e308))
                if (tmp.f.buyables[73].unlocked) layers.f.buyables[73].buyMax(Decimal.tetrate(10,1.79e308))
                if (tmp.f.buyables[74].unlocked) layers.f.buyables[74].buyMax(Decimal.tetrate(10,1.79e308))
                if (tmp.f.buyables[81].unlocked) layers.f.buyables[81].buyMax(Decimal.tetrate(10,1.79e308))
                if (tmp.f.buyables[82].unlocked) layers.f.buyables[82].buyMax(Decimal.tetrate(10,1.79e308))
                if (tmp.f.buyables[83].unlocked) layers.f.buyables[83].buyMax(Decimal.tetrate(10,1.79e308))
                if (tmp.f.buyables[84].unlocked) layers.f.buyables[84].buyMax(Decimal.tetrate(10,1.79e308))
            },
            style: {'height':'130px', 'width':'130px', 'background-color':"#3d2963"},
        },
        52: {
            display() {
                let dis = "Reset casuals for a Replicated Boost.<br>"
                dis += "Replicated Boosts: " + formatWhole(player.f.cboosts) + "/" + formatWhole(tmp.f.buyables[93].effect)
                return dis
            },
            canClick() {return player.f.casuals.gte(1.796e308) && player.f.cboosts.lt(tmp.f.buyables[93].effect) },
            onClick() {
                if (!hasFUpg(181)) player.f.casuals = decimalOne
                if (!hasFUpg(181)) player.f.cboosts = player.f.cboosts.add(1).max(1)
                else player.f.cboosts = tmp.f.buyables[93].effect
            },
            style: {'height':'130px', 'width':'175px', 'font-size':'13px',
            'background-color'() {
                let color = "#bf8f8f"
                if (tmp.f.clickables[52].canClick) color = "#3d2963"
                return color
            }}
        },
        53: {
            display() {
                if (player.f.crbauto) return "<h2>ON</h2>"
                else return "<h2>OFF</h2>"
            },
            canClick() {return true},
            onClick() {
                if (player.f.crbauto) player.f.crbauto = false 
                else player.f.crbauto = true
            },
            unlocked() {
                return hasMilestone("f",20)
            },
            style: {'height':'50px', 'min-height':'50px', 'width':'50px', 'background-color':"#3d2963"},
        },
        54: {
            display() {
                if (player.f.rbauto) return "<h2>ON</h2>"
                else return "<h2>OFF</h2>"
            },
            canClick() {return true},
            onClick() {
                if (player.f.rbauto) player.f.rbauto = false 
                else player.f.rbauto = true
            },
            unlocked() {
                return hasMilestone("f",20)
            },
            style: {'height':'50px', 'min-height':'50px', 'width':'50px', 'background-color':"#3d2963"},
        },
        61: {
            display() {
                if (player.f.iauto) return "<h2>ON</h2>"
                else return "<h2>OFF</h2>"
            },
            canClick() {return true},
            onClick() {
                if (player.f.iauto) player.f.iauto = false 
                else player.f.iauto = true
            },
            unlocked() {
                return hasFUpg(182)
            },
            style: {'height':'50px', 'min-height':'50px', 'width':'50px', 'background-color':"#3d2963"},
        },
        62: {
            display() {
                if (player.f.rmultauto) return "<h2>ON</h2>"
                else return "<h2>OFF</h2>"
            },
            canClick() {return true},
            onClick() {
                if (player.f.rmultauto) player.f.rmultauto = false 
                else player.f.rmultauto = true
            },
            unlocked() {
                return hasFUpg(183)
            },
            style: {'height':'50px', 'min-height':'50px', 'width':'50px', 'background-color':"#3d2963"},
        },
    },
    buyables: {
		rows: 10,
        cols: 4,
        11: {
			title: "Fatality Dimension 1",
			cost() { // cost for buying xth buyable, can be an object if there are multiple currencies
                let x=player.f.d1
                let cost = Decimal.pow(1e3, x).mul(1e11)
                let scale = x.sub(330)
                if (cost.gte(Decimal.pow(10,1e3)) && !(hasUpgrade("e",186) && !inChallenge("ct",32))) cost = cost.mul(this.multInc().pow(scale.mul(scale.add(1).max(1).div(2))))
                return cost.floor()
            },
            multInc() {
                return tmp.f.DimScaling
            },
            base() { 
                let base = tmp.f.multpd
                return base
            },
            gain(x=player[this.layer].buyables[this.id]) {
                let gain = this.effect().mul(x)
                return gain
            },
            total() {
                let total = getBuyableAmount("f", 11)
                return total
            },
            bought() {
                let bought = player.f.d1
                return bought
            },
			effect() { // Effects of owning x of the items, x is a decimal
                let x = tmp[this.layer].buyables[this.id].bought
                let base = tmp[this.layer].buyables[this.id].base
                let eff = Decimal.pow(base, x).mul(tmp.f.fDimMult)
                if (hasFUpg(91) && !inChallenge("f",61) && !inChallenge("f",62)) eff = eff.mul(getFUpgEff(91))
                if (hasFUpg(34) && !inChallenge("f",61) && !inChallenge("f",62)) eff = eff.mul(getFUpgEff(34))
                if (inChallenge("f", 11)) eff = eff.div("1.8e308")
                return eff;
            },
            display() { // Everything else displayed in the buyable button after the title
                if (player.tab != "f" || player.subtabs.f.mainTabs != "Dimensions") return 
                return "Produces fatality power.\n\
                Cost: " + format(tmp[this.layer].buyables[this.id].cost)+" fatality\n\
                Multiplier: " + format(tmp[this.layer].buyables[this.id].effect)+"x\n\
                Amount: " + formatWhole(this.total()) + "(" + formatWhole(this.bought()) + ")"
            },
            unlocked() { return hasMilestone("f", 6) }, 
            canAfford() {
                    return player.f.points.gte(tmp[this.layer].buyables[this.id].cost)},
            buy() { 
                cost = tmp[this.layer].buyables[this.id].cost
                if (tmp[this.layer].buyables[this.id].canAfford) {
                    if (!hasMilestone("f",10)) player.f.points = player.f.points.sub(cost).max(0)	
                    player.f.d1 = player.f.d1.add(1).max(1)
                    player[this.layer].buyables[this.id] = player[this.layer].buyables[this.id].add(1).max(1)
                }
            },
            buyMax(b) { //log10(cost/1e1001)/log10(Inc) = (x^2+x)/2+3x
                let cost = this.cost()
                let f = player.f.points
                let z = this.multInc().log10()
                let s = f.div("e1001").log10()
                let m = Decimal.tetrate(10,((hasUpgrade("e",186) && !inChallenge("ct",32))+0)*1.79e308).add(329)
                let max = f.div(1e11).max(10).log10().div(3).ceil().min(m)
                if (max.gte(m)) max = max.add(s.mul(2).add(3).mul(4).mul(z).add(z.pow(2)).add(36).pow(0.5).sub(z).sub(6).div(z.mul(2))).ceil()
                let diff = max.sub(player.f.d1).min(b)
                cost = Decimal.sub(1,Decimal.pow(1e3,max)).div(-999).mul(1e11)
                if (tmp[this.layer].buyables[this.id].canAfford) {
                    if (!hasMilestone("f",10)) player.f.points = player.f.points.sub(cost).max(0)	
                    player.f.d1 = player.f.d1.add(diff)
                    player[this.layer].buyables[this.id] = player[this.layer].buyables[this.id].add(diff)
                }
            },
            style: {'height':'180px', 'width':'180px',},
        },
        12: {
			title: "Fatality Dimension 2",
			cost() { // cost for buying xth buyable, can be an object if there are multiple currencies
                let x=player.f.d2
                let cost = Decimal.pow(1e4, x).mul(1e14)
                let scale = x.sub(247)
                if (cost.gte(Decimal.pow(10,1e3)) && !(hasUpgrade("e",186) && !inChallenge("ct",32))) cost = cost.mul(this.multInc().pow(scale.mul(scale.add(1).max(1).div(2))))
                return cost.floor()
            },
            multInc() {
                return tmp.f.DimScaling
            },
            base() { 
                let base = tmp.f.multpd
                return base
            },
            gain(x=player[this.layer].buyables[this.id]) {
                let gain = this.effect().mul(x).div(10)
                return gain
            },
            total() {
                let total = getBuyableAmount("f", 12)
                return total
            },
            bought() {
                let bought = player.f.d2
                return bought
            },
			effect() { // Effects of owning x of the items, x is a decimal
                let x = tmp[this.layer].buyables[this.id].bought
                let base = tmp[this.layer].buyables[this.id].base
                let eff = Decimal.pow(base, x).mul(tmp.f.fDimMult)
                if (hasFUpg(92) && !inChallenge("f",61) && !inChallenge("f",62)) eff = eff.mul(getFUpgEff(92))
                return eff;
            },
            display() { // Everything else displayed in the buyable button after the title
                if (player.tab != "f" || player.subtabs.f.mainTabs != "Dimensions") return 
                return "Produces Fatality Dimension 1.\n\
                Cost: " + format(tmp[this.layer].buyables[this.id].cost)+" fatality\n\
                Multiplier: " + format(tmp[this.layer].buyables[this.id].effect)+"x\n\
                Amount: " + formatWhole(this.total()) + "(" + formatWhole(this.bought()) + ")"
            },
            unlocked() { return hasMilestone("f", 6) }, 
            canAfford() {
                    return player.f.points.gte(tmp[this.layer].buyables[this.id].cost)},
            buy() { 
                cost = tmp[this.layer].buyables[this.id].cost
                if (tmp[this.layer].buyables[this.id].canAfford) {
                    if (!hasMilestone("f",10)) player.f.points = player.f.points.sub(cost).max(0)
                    player.f.d2 = player.f.d2.add(1).max(1)	
                    player[this.layer].buyables[this.id] = player[this.layer].buyables[this.id].add(1).max(1)
                }
            },
            buyMax(b) { 
                let cost = this.cost()
                let f = player.f.points
                let z = this.multInc().log10()
                let s = f.div("e1001").log10()
                let m = Decimal.tetrate(10,((hasUpgrade("e",186) && !inChallenge("ct",32))+0)*1.79e308).add(246)
                let max = f.div(1e14).max(10).log10().div(4).ceil().min(m)
                if (max.gte(m)) max = max.add(s.mul(2).add(4).mul(4).mul(z).add(z.pow(2)).add(64).pow(0.5).sub(z).sub(8).div(z.mul(2))).ceil()
                let diff = max.sub(player.f.d2).min(b)
                cost = Decimal.sub(1,Decimal.pow(1e4,max)).div(-9999).mul(1e14)
                if (tmp[this.layer].buyables[this.id].canAfford) {
                    if (!hasMilestone("f",10)) player.f.points = player.f.points.sub(cost).max(0)	
                    player.f.d2 = player.f.d2.add(diff)
                    player[this.layer].buyables[this.id] = player[this.layer].buyables[this.id].add(diff)
                }
            },
            style: {'height':'180px', 'width':'180px'},
        },
        13: {
			title: "Fatality Dimension 3",
			cost() { // cost for buying xth buyable, can be an object if there are multiple currencies
                let x=player.f.d3
                let cost = Decimal.pow(1e5, x).mul(1e15)
                let scale = x.sub(197)
                if (cost.gte(Decimal.pow(10,1e3)) && !(hasUpgrade("e",186) && !inChallenge("ct",32))) cost = cost.mul(this.multInc().pow(scale.mul(scale.add(1).max(1).div(2))))
                return cost.floor()
            },
            multInc() {
                return tmp.f.DimScaling
            },
            base() { 
                let base = tmp.f.multpd
                return base
            },
            gain(x=player[this.layer].buyables[this.id]) {
                let gain = this.effect().mul(x).div(10)
                return gain
            },
            total() {
                let total = getBuyableAmount("f", 13)
                return total
            },
            bought() {
                let bought = player.f.d3
                return bought
            },
			effect() { // Effects of owning x of the items, x is a decimal
                let x = tmp[this.layer].buyables[this.id].bought
                let base = tmp[this.layer].buyables[this.id].base
                let eff = Decimal.pow(base, x).mul(tmp.f.fDimMult)
                if (hasFUpg(101) && !inChallenge("f",61) && !inChallenge("f",62)) eff = eff.mul(getFUpgEff(101))
                return eff;
            },
            display() { // Everything else displayed in the buyable button after the title
                if (player.tab != "f" || player.subtabs.f.mainTabs != "Dimensions") return 
                return "Produces Fatality Dimension 2.\n\
                Cost: " + format(tmp[this.layer].buyables[this.id].cost)+" fatality\n\
                Multiplier: " + format(tmp[this.layer].buyables[this.id].effect)+"x\n\
                Amount: " + formatWhole(this.total()) + "(" + formatWhole(this.bought()) + ")"
            },
            unlocked() { return hasMilestone("f", 6) }, 
            canAfford() {
                    return player.f.points.gte(tmp[this.layer].buyables[this.id].cost)},
            buy() { 
                cost = tmp[this.layer].buyables[this.id].cost
                if (tmp[this.layer].buyables[this.id].canAfford) {
                    if (!hasMilestone("f",10)) player.f.points = player.f.points.sub(cost).max(0)
                    player.f.d3 = player.f.d3.add(1).max(1)	
                    player[this.layer].buyables[this.id] = player[this.layer].buyables[this.id].add(1).max(1)
                }
            },
            buyMax(b) { 
                let cost = this.cost()
                let f = player.f.points
                let z = this.multInc().log10()
                let s = f.div(Decimal.pow(10,1e3)).log10()
                let m = Decimal.tetrate(10,((hasUpgrade("e",186) && !inChallenge("ct",32))+0)*1.79e308).add(196)
                let max = f.div(1e15).max(10).log10().div(5).ceil().min(m)
                if (max.gte(m)) max = max.add(s.mul(2).add(5).mul(4).mul(z).add(z.pow(2)).add(100).pow(0.5).sub(z).sub(10).div(z.mul(2))).ceil()
                let diff = max.sub(player.f.d3).min(b)
                cost = Decimal.sub(1,Decimal.pow(1e5,max)).div(-99999).mul(1e15)
                if (tmp[this.layer].buyables[this.id].canAfford) {
                    if (!hasMilestone("f",10)) player.f.points = player.f.points.sub(cost).max(0)	
                    player.f.d3 = player.f.d3.add(diff)
                    player[this.layer].buyables[this.id] = player[this.layer].buyables[this.id].add(diff)
                }
            },
            style: {'height':'180px', 'width':'180px'},
        },
        14: {
			title: "Fatality Dimension 4",
			cost() { // cost for buying xth buyable, can be an object if there are multiple currencies
                let x=player.f.d4
                let cost = Decimal.pow(1e6, x).mul(1e18)
                let scale = x.sub(164)
                if (cost.gte(Decimal.pow(10,1e3)) && !(hasUpgrade("e",186) && !inChallenge("ct",32))) cost = cost.mul(this.multInc().pow(scale.mul(scale.add(1).max(1).div(2))))
                return cost.floor()
            },
            multInc() {
                return tmp.f.DimScaling
            },
            base() { 
                let base = tmp.f.multpd
                return base
            },
            gain(x=player[this.layer].buyables[this.id]) {
                let gain = this.effect().mul(x).div(10)
                return gain
            },
            total() {
                let total = getBuyableAmount("f", 14)
                return total
            },
            bought() {
                let bought = player.f.d4
                return bought
            },
			effect() { // Effects of owning x of the items, x is a decimal
                let x = tmp[this.layer].buyables[this.id].bought
                let base = tmp[this.layer].buyables[this.id].base
                let eff = Decimal.pow(base, x).mul(tmp.f.fDimMult)
                if (hasFUpg(102) && !inChallenge("f",61) && !inChallenge("f",62)) eff = eff.mul(getFUpgEff(102))
                return eff;
            },
            display() { // Everything else displayed in the buyable button after the title
                if (player.tab != "f" || player.subtabs.f.mainTabs != "Dimensions") return 
                return "Produces Fatality Dimension 3.\n\
                Cost: " + format(tmp[this.layer].buyables[this.id].cost)+" fatality\n\
                Multiplier: " + format(tmp[this.layer].buyables[this.id].effect)+"x\n\
                Amount: " + formatWhole(this.total()) + "(" + formatWhole(this.bought()) + ")"
            },
            unlocked() { return hasMilestone("f", 6) }, 
            canAfford() {
                    return player.f.points.gte(tmp[this.layer].buyables[this.id].cost)},
            buy() { 
                cost = tmp[this.layer].buyables[this.id].cost
                if (tmp[this.layer].buyables[this.id].canAfford) {
                    if (!hasMilestone("f",10)) player.f.points = player.f.points.sub(cost).max(0)
                    player.f.d4 = player.f.d4.add(1).max(1)	
                    player[this.layer].buyables[this.id] = player[this.layer].buyables[this.id].add(1).max(1)
                }
            },
            buyMax(b) { 
                let cost = this.cost()
                let f = player.f.points
                let z = this.multInc().log10()
                let s = f.div("e1002").log10()
                let m = Decimal.tetrate(10,((hasUpgrade("e",186) && !inChallenge("ct",32))+0)*1.79e308).add(163)
                let max = f.div(1e18).max(10).log10().div(6).ceil().min(m)
                if (max.gte(m)) max = max.add(s.mul(2).add(6).mul(4).mul(z).add(z.pow(2)).add(144).pow(0.5).sub(z).sub(12).div(z.mul(2))).ceil()
                let diff = max.sub(player.f.d4).min(b)
                cost = Decimal.sub(1,Decimal.pow(1e6,max)).div(-999999).mul(1e18)
                if (tmp[this.layer].buyables[this.id].canAfford) { 
                    if (!hasMilestone("f",10)) player.f.points = player.f.points.sub(cost).max(0)	
                    player.f.d4 = player.f.d4.add(diff)
                    player[this.layer].buyables[this.id] = player[this.layer].buyables[this.id].add(diff)
                }
            },
            style: {'height':'180px', 'width':'180px'},
        },
        21: {
			title: "Fatality Dimension 5",
			cost() { // cost for buying xth buyable, can be an object if there are multiple currencies
                let x=player.f.d5
                let cost = Decimal.pow(1e8, x).mul(1e21)
                let scale = x.sub(123)
                if (cost.gte(Decimal.pow(10,1e3)) && !(hasUpgrade("e",186) && !inChallenge("ct",32))) cost = cost.mul(this.multInc().pow(scale.mul(scale.add(1).max(1).div(2))))
                return cost.floor()
            },
            multInc() {
                return tmp.f.DimScaling
            },
            base() { 
                let base = tmp.f.multpd
                return base
            },
            gain(x=player[this.layer].buyables[this.id]) {
                let gain = this.effect().mul(x).div(10)
                return gain
            },
            total() {
                let total = getBuyableAmount("f", 21)
                return total
            },
            bought() {
                let bought = player.f.d5
                return bought
            },
			effect() { // Effects of owning x of the items, x is a decimal
                let x = tmp[this.layer].buyables[this.id].bought
                let base = tmp[this.layer].buyables[this.id].base
                let eff = Decimal.pow(base, x).mul(tmp.f.fDimMult)
                if (hasFUpg(102) && !inChallenge("f",61) && !inChallenge("f",62)) eff = eff.mul(getFUpgEff(102))
                return eff;
            },
            display() { // Everything else displayed in the buyable button after the title
                if (player.tab != "f" || player.subtabs.f.mainTabs != "Dimensions") return 
                return "Produces Fatality Dimension 4.\n\
                Cost: " + format(tmp[this.layer].buyables[this.id].cost)+" fatality\n\
                Multiplier: " + format(tmp[this.layer].buyables[this.id].effect)+"x\n\
                Amount: " + formatWhole(this.total()) + "(" + formatWhole(this.bought()) + ")"
            },
            unlocked() { return hasMilestone("f", 6) }, 
            canAfford() {
                    return player.f.points.gte(tmp[this.layer].buyables[this.id].cost)},
            buy() { 
                cost = tmp[this.layer].buyables[this.id].cost
                if (tmp[this.layer].buyables[this.id].canAfford) {
                    if (!hasMilestone("f",10)) player.f.points = player.f.points.sub(cost).max(0)
                    player.f.d5 = player.f.d5.add(1).max(1)	
                    player[this.layer].buyables[this.id] = player[this.layer].buyables[this.id].add(1).max(1)
                }
            },
            buyMax(b) { 
                let cost = this.cost()
                let f = player.f.points
                let z = this.multInc().log10()
                let s = f.div("e1005").log10()
                let m = Decimal.tetrate(10,((hasUpgrade("e",186) && !inChallenge("ct",32))+0)*1.79e308).add(122)
                let max = f.div(1e21).max(10).log10().div(8).ceil().min(m)
                if (max.gte(m)) max = max.add(s.mul(2).add(8).mul(4).mul(z).add(z.pow(2)).add(256).pow(0.5).sub(z).sub(16).div(z.mul(2))).ceil()
                let diff = max.sub(player.f.d5).min(b)
                cost = Decimal.sub(1,Decimal.pow(1e8,max)).div(-99999999).mul(1e21)
                if (tmp[this.layer].buyables[this.id].canAfford) {
                    if (!hasMilestone("f",10)) player.f.points = player.f.points.sub(cost).max(0)	
                    player.f.d5 = player.f.d5.add(diff)
                    player[this.layer].buyables[this.id] = player[this.layer].buyables[this.id].add(diff)
                }
            },
            style: {'height':'180px', 'width':'180px'},
        },
        22: {
			title: "Fatality Dimension 6",
			cost() { // cost for buying xth buyable, can be an object if there are multiple currencies
                let x=player.f.d6
                let cost = Decimal.pow(1e10, x).mul(1e26)
                let scale = x.sub(98)
                if (cost.gte(Decimal.pow(10,1e3)) && !(hasUpgrade("e",186) && !inChallenge("ct",32))) cost = cost.mul(this.multInc().pow(scale.mul(scale.add(1).max(1).div(2))))
                return cost.floor()
            },
            multInc() {
                return tmp.f.DimScaling
            },
            base() { 
                let base = tmp.f.multpd
                return base
            },
            gain(x=player[this.layer].buyables[this.id]) {
                let gain = this.effect().mul(x).div(10)
                return gain
            },
            total() {
                let total = getBuyableAmount("f", 22)
                return total
            },
            bought() {
                let bought = player.f.d6
                return bought
            },
			effect() { // Effects of owning x of the items, x is a decimal
                let x = tmp[this.layer].buyables[this.id].bought
                let base = tmp[this.layer].buyables[this.id].base
                let eff = Decimal.pow(base, x).mul(tmp.f.fDimMult)
                if (hasFUpg(101) && !inChallenge("f",61) && !inChallenge("f",62)) eff = eff.mul(getFUpgEff(101))
                return eff;
            },
            display() { // Everything else displayed in the buyable button after the title
                if (player.tab != "f" || player.subtabs.f.mainTabs != "Dimensions") return 
                return "Produces Fatality Dimension 5.\n\
                Cost: " + format(tmp[this.layer].buyables[this.id].cost)+" fatality\n\
                Multiplier: " + format(tmp[this.layer].buyables[this.id].effect)+"x\n\
                Amount: " + formatWhole(this.total()) + "(" + formatWhole(this.bought()) + ")"
            },
            unlocked() { return hasMilestone("f", 6) }, 
            canAfford() {
                    return player.f.points.gte(tmp[this.layer].buyables[this.id].cost)},
            buy() { 
                cost = tmp[this.layer].buyables[this.id].cost
                if (tmp[this.layer].buyables[this.id].canAfford) {
                    if (!hasMilestone("f",10)) player.f.points = player.f.points.sub(cost).max(0)
                    player.f.d6 = player.f.d6.add(1).max(1)	
                    player[this.layer].buyables[this.id] = player[this.layer].buyables[this.id].add(1).max(1)
                }
            },
            buyMax(b) { 
                let cost = this.cost()
                let f = player.f.points
                let z = this.multInc().log10()
                let s = f.div("e1006").log10()
                let m = Decimal.tetrate(10,((hasUpgrade("e",186) && !inChallenge("ct",32))+0)*1.79e308).add(97)
                let max = f.div(1e26).max(10).log10().div(10).ceil().min(m)
                if (max.gte(m)) max = max.add(s.mul(2).add(10).mul(4).mul(z).add(z.pow(2)).add(400).pow(0.5).sub(z).sub(20).div(z.mul(2))).ceil()
                let diff = max.sub(player.f.d6).min(b)
                cost = Decimal.sub(1,Decimal.pow(1e10,max)).div(-9999999999).mul(1e26)
                if (tmp[this.layer].buyables[this.id].canAfford) {
                    if (!hasMilestone("f",10)) player.f.points = player.f.points.sub(cost).max(0)	
                    player.f.d6 = player.f.d6.add(diff)
                    player[this.layer].buyables[this.id] = player[this.layer].buyables[this.id].add(diff)
                }
            },
            style: {'height':'180px', 'width':'180px'},
        },
        23: {
			title: "Fatality Dimension 7",
			cost() { // cost for buying xth buyable, can be an object if there are multiple currencies
                let x=player.f.d7
                let cost = Decimal.pow(1e12, x).mul("e435")
                let scale = x.sub(48)
                if (cost.gte(Decimal.pow(10,1e3)) && !(hasUpgrade("e",186) && !inChallenge("ct",32))) cost = cost.mul(this.multInc().pow(scale.mul(scale.add(1).max(1).div(2))))
                return cost.floor()
            },
            multInc() {
                return tmp.f.DimScaling
            },
            base() { 
                let base = tmp.f.multpd
                return base
            },
            gain(x=player[this.layer].buyables[this.id]) {
                let gain = this.effect().mul(x).div(10)
                return gain
            },
            total() {
                let total = getBuyableAmount("f", 23)
                return total
            },
            bought() {
                let bought = player.f.d7
                return bought
            },
			effect() { // Effects of owning x of the items, x is a decimal
                let x = tmp[this.layer].buyables[this.id].bought
                let base = tmp[this.layer].buyables[this.id].base
                let eff = Decimal.pow(base, x).mul(tmp.f.fDimMult)
                if (hasFUpg(92) && !inChallenge("f",61) && !inChallenge("f",62)) eff = eff.mul(getFUpgEff(92))
                return eff;
            },
            display() { // Everything else displayed in the buyable button after the title
                if (player.tab != "f" || player.subtabs.f.mainTabs != "Dimensions") return 
                return "Produces Fatality Dimension 6.\n\
                Cost: " + format(tmp[this.layer].buyables[this.id].cost)+" fatality\n\
                Multiplier: " + format(tmp[this.layer].buyables[this.id].effect)+"x\n\
                Amount: " + formatWhole(this.total()) + "(" + formatWhole(this.bought()) + ")"
            },
            unlocked() { return player.f.buyables[32].gte(1) }, 
            canAfford() {
                    return player.f.points.gte(tmp[this.layer].buyables[this.id].cost) && !inChallenge("f",22)},
            buy() { 
                cost = tmp[this.layer].buyables[this.id].cost
                if (tmp[this.layer].buyables[this.id].canAfford) {
                    if (!hasMilestone("f",10)) player.f.points = player.f.points.sub(cost).max(0)
                    player.f.d7 = player.f.d7.add(1).max(1)	
                    player[this.layer].buyables[this.id] = player[this.layer].buyables[this.id].add(1).max(1)
                }
            },
            buyMax(b) { 
                let cost = this.cost()
                let f = player.f.points
                let z = this.multInc().log10()
                let s = f.div("e1011").log10()
                let m = Decimal.tetrate(10,((hasUpgrade("e",186) && !inChallenge("ct",32))+0)*1.79e308).add(47)
                let max = f.div("e435").max(10).log10().div(12).ceil().min(m)
                if (max.gte(m)) max = max.add(s.mul(2).add(12).mul(4).mul(z).add(z.pow(2)).add(576).pow(0.5).sub(z).sub(24).div(z.mul(2))).ceil()
                let diff = max.sub(player.f.d7).min(b)
                cost = Decimal.sub(1,Decimal.pow(1e12,max)).div(-1e12).mul("e435")
                if (tmp[this.layer].buyables[this.id].canAfford) {
                    if (!hasMilestone("f",10)) player.f.points = player.f.points.sub(cost).max(0)	
                    player.f.d7 = player.f.d7.add(diff)
                    player[this.layer].buyables[this.id] = player[this.layer].buyables[this.id].add(diff)
                }
            },
            style: {'height':'180px', 'width':'180px'},
        },
        24: {
			title: "Fatality Dimension 8",
			cost() { // cost for buying xth buyable, can be an object if there are multiple currencies
                let x=player.f.d8
                let cost = Decimal.pow(1e15, x).mul("e560")
                let scale = x.sub(30)
                if (cost.gte(Decimal.pow(10,1e3)) && !(hasUpgrade("e",186) && !inChallenge("ct",32))) cost = cost.mul(this.multInc().pow(scale.mul(scale.add(1).max(1).div(2))))
                return cost.floor()
            },
            multInc() {
                return tmp.f.DimScaling
            },
            base() { 
                let base = tmp.f.multpd
                return base
            },
            gain(x=player[this.layer].buyables[this.id]) {
                let gain = this.effect().mul(x).div(10)
                return gain
            },
            total() {
                let total = getBuyableAmount("f", 24)
                return total
            },
            bought() {
                let bought = player.f.d8
                return bought
            },
			effect() { // Effects of owning x of the items, x is a decimal
                let x = tmp[this.layer].buyables[this.id].bought
                let base = tmp[this.layer].buyables[this.id].base
                let eff = Decimal.pow(base, x).mul(tmp.f.fDimMult)
                if (hasFUpg(91) && !inChallenge("f",61) && !inChallenge("f",62)) eff = eff.mul(getFUpgEff(91))
                if (!inChallenge("f",61)) eff = eff.mul(tmp.f.clickables[13].effect)
                return eff;
            },
            display() { // Everything else displayed in the buyable button after the title
                if (player.tab != "f" || player.subtabs.f.mainTabs != "Dimensions") return 
                return "Produces Fatality Dimension 7.\n\
                Cost: " + format(tmp[this.layer].buyables[this.id].cost)+" fatality\n\
                Multiplier: " + format(tmp[this.layer].buyables[this.id].effect)+"x\n\
                Amount: " + formatWhole(this.total()) + "(" + formatWhole(this.bought()) + ")"
            },
            unlocked() { return player.f.buyables[32].gte(2) }, 
            canAfford() {
                    return player.f.points.gte(tmp[this.layer].buyables[this.id].cost) && !inChallenge("f",22)},
            buy() { 
                cost = tmp[this.layer].buyables[this.id].cost
                if (tmp[this.layer].buyables[this.id].canAfford) {
                    if (!hasMilestone("f",10)) player.f.points = player.f.points.sub(cost).max(0)
                    player.f.d8 = player.f.d8.add(1).max(1)	
                    player[this.layer].buyables[this.id] = player[this.layer].buyables[this.id].add(1).max(1)
                }
            },
            buyMax(b) { 
                let cost = this.cost()
                let f = player.f.points
                let z = this.multInc().log10()
                let s = f.div("e1010").log10()
                let m = Decimal.tetrate(10,((hasUpgrade("e",186) && !inChallenge("ct",32))+0)*1.79e308).add(29)
                let max = f.div("e560").max(10).log10().div(15).ceil().min(m)
                if (max.gte(m)) max = max.add(s.mul(2).add(15).mul(4).mul(z).add(z.pow(2)).add(900).pow(0.5).sub(z).sub(30).div(z.mul(2))).ceil()
                let diff = max.sub(player.f.d8).min(b)
                cost = Decimal.sub(1,Decimal.pow(1e15,max)).div(-1e15).mul("e560")
                if (tmp[this.layer].buyables[this.id].canAfford) {
                    if (!hasMilestone("f",10)) player.f.points = player.f.points.sub(cost).max(0)	
                    player.f.d8 = player.f.d8.add(diff)
                    player[this.layer].buyables[this.id] = player[this.layer].buyables[this.id].add(diff)
                }
            },
            style: {'height':'180px', 'width':'180px'},
        },
        31: {
			title: "Fatality Dimension Multiplier",
			cost(x=player.f.mult) { // cost for buying xth buyable, can be an object if there are multiple currencies
                let cost = Decimal.pow(10, x).mul(1e45)
                let scale = x.sub(955)
                if (cost.gte(Decimal.pow(10,1e3)) && !(hasUpgrade("e",186) && !inChallenge("ct",32))) cost = cost.mul(this.multInc().pow(scale.mul(scale.add(1).max(1).div(2))))
                return cost.floor()
            },
            multInc() {
                return tmp.f.DimScaling
            },
            base() { 
                let base = new Decimal(1.1)
                if (hasFUpg(63)) base = base.add(getFUpgEff(63))
                if (hasFUpg(64)) base = base.add(getFUpgEff(64))
                base = base.mul(layers.f.buyables[33].effect())
                return base
            },
            gain(x=player[this.layer].buyables[this.id]) {
                let gain = this.effect().mul(x).div(10)
                return gain
            },
            total() {
                let total = getBuyableAmount("f", 31)
                return total
            },
            bought() {
                let bought = player.f.mult
                return bought
            },
			effect() { // Effects of owning x of the items, x is a decimal
                let x = tmp[this.layer].buyables[this.id].bought
                let base = tmp[this.layer].buyables[this.id].base
                return Decimal.pow(base, x);
            },
            display() { // Everything else displayed in the buyable button after the title
                if (player.tab != "f" || player.subtabs.f.mainTabs != "Dimensions") return 
                return "Multiply fatality dimensions by " + format(this.base()) + "\n\
                Cost: " + format(tmp[this.layer].buyables[this.id].cost)+" fatality\n\
                Multiplier: " + format(tmp[this.layer].buyables[this.id].effect)+"x\n\
                Amount: " + formatWhole(this.total()) + "(" + formatWhole(this.bought()) + ")"
            },
            unlocked() { return hasMilestone("f", 8) }, 
            canAfford() {
                    return player.f.points.gte(tmp[this.layer].buyables[this.id].cost)},
            buy() { 
                cost = tmp[this.layer].buyables[this.id].cost
                if (tmp[this.layer].buyables[this.id].canAfford) {
                    if (!hasMilestone("f",10)) player.f.points = player.f.points.sub(cost).max(0)
                    player.f.mult = player.f.mult.add(1).max(1)	
                    player[this.layer].buyables[this.id] = player[this.layer].buyables[this.id].add(1).max(1)
                }
            },
            buyMax(b) { 
                let cost = this.cost()
                let f = player.f.points
                let z = this.multInc().log10()
                let s = f.div(Decimal.pow(10,1e3)).log10()
                let m = Decimal.tetrate(10,((hasUpgrade("e",186) && !inChallenge("ct",32))+0)*1.79e308).add(954)
                let max = player.f.points.div(1e45).max(10).log10().ceil().min(m)
                if (max.gte(m)) max = max.add(s.mul(2).add(1).max(1).mul(4).mul(z).add(z.pow(2)).add(4).pow(0.5).sub(z).sub(2).div(z.mul(2))).ceil()
                let diff = max.sub(player.f.mult).min(b)
                cost = Decimal.sub(1,Decimal.pow(10,diff)).div(-9).mul(cost)
                if (tmp[this.layer].buyables[this.id].canAfford) {
                    if (!hasMilestone("f",10)) player.f.points = player.f.points.sub(cost).max(0)	
                    player.f.mult = player.f.mult.add(diff)
                    player[this.layer].buyables[this.id] = player[this.layer].buyables[this.id].add(diff)
                }
            },
            style: {'height':'180px', 'width':'180px'},
        },
        32: {
			title() {
                let dim = "Fatality Dimension Shift"
                if (tmp.f.buyables[32].total.gte(2)) dim = "Fatality Dimension Boost"
                return dim
            },
			cost() { // cost for buying xth buyable, can be an object if there are multiple currencies
                let cost = new Decimal(40)
                let x = tmp.f.buyables[32].total
                if (x.gte(1e18)) x = x.div(1e18).pow(2).mul(1e18)
                if (x.gte(1)) cost = decimalTen
                if (x.gte(2)) cost = Decimal.add(10,x.sub(2).mul(this.scale()))
                return cost.floor()
            },
            scale() {
                let scale = decimalFour
                if (hasFUpg(65)) scale = scale.sub(1)
                if (hasFUpg(74)) scale = scale.sub(0.5)
                if (hasFUpg(84)) scale = scale.sub(0.5)
                if (hasFUpg(122)) scale = scale.sub(0.5)
                if (hasFUpg(134)) scale = scale.sub(0.5)
                return scale
            },
            base() { 
                let base = decimalTen
                if (hasFUpg(72)) base = base.mul(2)
                if (hasFUpg(75)) base = base.mul(5)
                if (hasFUpg(93)) base = base.mul(5)
                if (hasFUpg(122)) base = base.mul(getFUpgEff(122))
                if (hasChallenge("f",61)) base = base.mul(challengeEffect("f",61))
                base = base.mul(tmp.e.deff)
                if (hasUpgrade("Up",54)) base = base.pow(tmp.Up.upgrades[54].effect)
                return base
            },
            total() {
                let total = getBuyableAmount("f", 32)
                return total
            },
			effect() { // Effects of owning x of the items, x is a decimal
                let x = tmp[this.layer].buyables[this.id].total
                let base = tmp[this.layer].buyables[this.id].base
                return Decimal.pow(base, x);
            },
            display() { // Everything else displayed in the buyable button after the title
                if (player.tab != "f" || player.subtabs.f.mainTabs != "Dimensions") return 
                let req = Decimal.add(6,tmp.f.buyables[32].total).min(8)
                let dim = "Unlock a new Dimension, and multiply fatality dimensions by "
                if (tmp.f.buyables[32].total.gte(2)) dim = "Multiply fatality dimensions by "
                return dim + format(this.base()) +".\n\
                Requires: " + formatWhole(tmp[this.layer].buyables[this.id].cost)+" Fatality Dimension " + formatWhole(req) + "\n\
                Multiplier: " + format(tmp[this.layer].buyables[this.id].effect)+"x\n\
                Amount: " + formatWhole(tmp.f.buyables[32].total)
            },
            unlocked() { return hasMilestone("f", 10) }, 
            canAfford() {
                let req = getBuyableAmount("f", 22)
                if (this.total().gte(2)) req = getBuyableAmount("f", 24)
                else if (this.total().gte(1)) req = getBuyableAmount("f", 23)
                return req.gte(tmp[this.layer].buyables[this.id].cost) && !inChallenge("f",22)},
            buy() { //x=(cost-10)/s+2
                let d6 = getBuyableAmount("f", 24)
                let max = d6.sub(10).div(this.scale()).add(3)
                if (max.gte(1e18)) max = max.div(1e18).pow(0.5).mul(1e18)
                let diff = max.floor().sub(this.total()).max(1)
                if (this.total().lt(2)) diff = decimalOne
                if (tmp[this.layer].buyables[this.id].canAfford) {
                    if (!hasMilestone("f",14)) {
                    player.f.p = decimalZero
                    player.f.points = decimalZero
                    player.f.sac = decimalZero
                    player.f.d1 = decimalZero
                    player.f.d2 = decimalZero
                    player.f.d3 = decimalZero
                    player.f.d4 = decimalZero
                    player.f.d5 = decimalZero
                    player.f.d6 = decimalZero
                    player.f.d7 = decimalZero
                    player.f.d8 = decimalZero
                    player.f.mult = decimalZero
                    player.f.buyables[11] = decimalZero
                    player.f.buyables[12] = decimalZero
                    player.f.buyables[13] = decimalZero
                    player.f.buyables[14] = decimalZero
                    player.f.buyables[21] = decimalZero
                    player.f.buyables[22] = decimalZero
                    player.f.buyables[23] = decimalZero
                    player.f.buyables[24] = decimalZero
                    player.f.buyables[31] = decimalZero
                    }
                    if (hasMilestone("f",11)) player[this.layer].buyables[this.id] = player[this.layer].buyables[this.id].add(diff)
                    else player[this.layer].buyables[this.id] = player[this.layer].buyables[this.id].add(1).max(1)
                }
            },
            buyMax(b) { //x=(cost-10)/s+2
                let d6 = getBuyableAmount("f", 24)
                let max = d6.sub(10).div(this.scale()).add(3)
                if (max.gte(1e18)) max = max.div(1e18).pow(0.5).mul(1e18)
                let diff = max.floor().min(b).sub(this.total()).max(1)
                if (this.total().lt(2)) diff = decimalOne
                if (tmp[this.layer].buyables[this.id].canAfford) {
                    if (!hasMilestone("f",14)) {
                        player.f.p = decimalZero
                        player.f.points = decimalZero
                        player.f.sac = decimalZero
                        player.f.d1 = decimalZero
                        player.f.d2 = decimalZero
                        player.f.d3 = decimalZero
                        player.f.d4 = decimalZero
                        player.f.d5 = decimalZero
                        player.f.d6 = decimalZero
                        player.f.d7 = decimalZero
                        player.f.d8 = decimalZero
                        player.f.mult = decimalZero
                        player.f.buyables[11] = decimalZero
                        player.f.buyables[12] = decimalZero
                        player.f.buyables[13] = decimalZero
                        player.f.buyables[14] = decimalZero
                        player.f.buyables[21] = decimalZero
                        player.f.buyables[22] = decimalZero
                        player.f.buyables[23] = decimalZero
                        player.f.buyables[24] = decimalZero
                        player.f.buyables[31] = decimalZero
                        }
                    player[this.layer].buyables[this.id] = player[this.layer].buyables[this.id].add(diff)
                }
            },
            style: {'height':'180px', 'width':'180px'},
        },
        33: {
			title() {
                let dim = "Fatality Multiplier Boost"
                if (this.total().gte(this.distantStart())) dim = "Distant Fatality Multiplier Boost"
                if (this.total().gte(this.sStart())) dim = "Social Distant Multiplier Boost"
                return dim
            },
			cost() { // cost for buying xth buyable, can be an object if there are multiple currencies
                let cost = new Decimal(45)
                let x = player.f.buyables[33]
                let distant = this.distantStart()
                let ss = this.sStart()
                if (x.gte(ss)) x = Decimal.pow(this.sScale(),x.sub(ss)).mul(ss) 
                if (inChallenge("f",22)) cost = cost = new Decimal(100)
                cost = cost.add(x.mul(this.scale()))
                if (x.gte(distant)) cost = cost.add(x.sub(distant).pow(2).add(x).sub(distant).div(this.distantScale()))
                return cost.floor()
            },
            scale() {
                let scale = new Decimal(7)
                if (inChallenge("f",22)) scale = new Decimal(11)
                if (hasFUpg(111)) scale = scale.sub(1)
                if (hasFUpg(115)) scale = scale.sub(1)
                return scale
            },
            distantStart() {
                let distant = new Decimal(100)
                if (hasFUpg(133)) distant = distant.add(20)
                if (hasFUpg(145)) distant = distant.add(getFUpgEff(145))
                return distant.min(this.sStart())
            },
            distantScale() {
                let distant = decimalTen
                if (hasFUpg(185)) distant = distant.mul(tmp.f.upgrades[185].effect2)
                return distant
            },
            sStart() {
                let scale = new Decimal(10000)
                if (hasUpgrade("e",35)) scale = scale.add(upgradeEffect("e",35))
                return scale
            },
            sScale() {
                let scale = new Decimal(1.001)
                if (hasUpgrade("e",54)) scale = scale.root(upgradeEffect("e",54))
                if (hasUpgrade("e",55)) scale = scale.root(upgradeEffect("e",55))
                return scale
            },
            base() { 
                let base = new Decimal(1.032)
                if (hasFUpg(75)) base = base.pow(1.125)
                if (hasFUpg(112)) base = base.pow(1.3)
                if (hasFUpg(105)) base = base.pow(getFUpgEff(105))
                if (hasFUpg(172)) base = base.pow(getFUpgEff(172))
                if (hasFUpg(121)) base = base.pow(1.35)
                if (hasFUpg(132)) base = base.pow(tmp.f.upgrades[132].effect2)
                if (hasUpgrade("Up",52)) base = base.pow(tmp.Up.upgrades[52].effect)
                if (hasChallenge("f",51)) base = base.pow(1.2)
                if (inChallenge("f",22)) base = base.pow(1.5)
                if (inChallenge("f",32)) base = decimalOne
                return base
            },
            total() {
                let total = getBuyableAmount("f", 33)
                return total
            },
			effect() { // Effects of owning x of the items, x is a decimal
                let x = this.total().add(player.f.cboosts.mul(5))
                let base = this.base()
                return Decimal.pow(base, x);
            },
            display() { // Everything else displayed in the buyable button after the title
                if (player.tab != "f" || player.subtabs.f.mainTabs != "Dimensions") return 
                let dim = "Reset Dimension Boosts, and multiply Fatality Dimension Multiplier base by "
                let req = "8"
                if (inChallenge("f",22)) req = "6"
                return dim + format(this.base()) +".\n\
                Requires: " + formatWhole(tmp[this.layer].buyables[this.id].cost)+" Fatality Dimension " +req+"\n\
                Multiplier: " + format(tmp[this.layer].buyables[this.id].effect)+"x\n\
                Amount: " + formatWhole(this.total())
            },
            unlocked() { return hasMilestone("f", 11) }, 
            canAfford() {
                let req = getBuyableAmount("f", 24)
                if (inChallenge("f",22)) req = getBuyableAmount("f", 22)
                return req.gte(tmp[this.layer].buyables[this.id].cost)},
            buy() { //cost = 45+sx+((x-y)^2+x-y)/10         cost-45 = sx+((x-y)^2+x-y)/10
                let d8 = getBuyableAmount("f", 24)
                let sub = new Decimal(45)
                let d = this.distantStart()
                let b = this.distantScale()
                let s = this.scale()
                let ss = this.sStart()
                if (inChallenge("f",22)) {
                    d8 = getBuyableAmount("f", 22)
                    sub = new Decimal(100)
                } 
                let max = d8.sub(sub).div(this.scale()).add(1).max(1).floor()
                if (max.gte(d)) max = b.pow(2).mul(s.pow(2)).add(d8.mul(2).sub(s.mul(2).mul(d)).add(s).sub(90).mul(b.mul(2))).add(1).max(1).pow(0.5).sub(b.mul(s)).add(d.mul(2)).sub(1).div(2).add(1).max(1).floor()
                if (max.gte(ss)) max = max.div(ss).log(this.sScale()).add(ss.add(1).max(1)).floor()
                let diff = max.sub(this.total()).max(1)
                if (tmp[this.layer].buyables[this.id].canAfford) {
                    if (!hasMilestone("f",15)) {
                    player.f.p = decimalZero
                    player.f.points = decimalZero
                    player.f.sac = decimalZero
                    player.f.d1 = decimalZero
                    player.f.d2 = decimalZero
                    player.f.d3 = decimalZero
                    player.f.d4 = decimalZero
                    player.f.d5 = decimalZero
                    player.f.d6 = decimalZero
                    player.f.d7 = decimalZero
                    player.f.d8 = decimalZero
                    player.f.mult = decimalZero
                    player.f.buyables[11] = decimalZero
                    player.f.buyables[12] = decimalZero
                    player.f.buyables[13] = decimalZero
                    player.f.buyables[14] = decimalZero
                    player.f.buyables[21] = decimalZero
                    player.f.buyables[22] = decimalZero
                    player.f.buyables[23] = decimalZero
                    player.f.buyables[24] = decimalZero
                    player.f.buyables[31] = decimalZero
                    if (!hasMilestone("f",13)) player.f.buyables[32] = (hasFUpg(84) && !inChallenge("f", 22)) ? decimalTwo : decimalZero
                    }
                    if (hasMilestone("f",12)) player[this.layer].buyables[this.id] = player[this.layer].buyables[this.id].add(diff)
                    else player[this.layer].buyables[this.id] = player[this.layer].buyables[this.id].add(1).max(1)
                }
            },
            buyMax(m) { //(cost-45)/s = x
                let d8 = getBuyableAmount("f", 24)
                let sub = new Decimal(45)
                let d = this.distantStart()
                let b = this.distantScale()
                let s = this.scale()
                let ss = this.sStart()
                if (inChallenge("f",22)) {
                    d8 = getBuyableAmount("f", 22)
                    sub = new Decimal(100)
                }
                let max = d8.sub(sub).div(this.scale()).add(1).max(1).floor()
                if (max.gte(d)) max = b.pow(2).mul(s.pow(2)).add(d8.mul(2).sub(s.mul(2).mul(d)).add(s).sub(90).mul(b.mul(2))).add(1).max(1).pow(0.5).sub(b.mul(s)).add(d.mul(2)).sub(1).div(2).add(1).max(1).floor()
                if (max.gte(ss)) max = max.div(ss).log(this.sScale()).add(ss.add(1).max(1)).floor()
                max = max.min(m)
                let diff = max.sub(this.total()).max(1)
                if (tmp[this.layer].buyables[this.id].canAfford) {
                    if (!hasMilestone("f",15)) {
                        player.f.p = decimalZero
                        player.f.points = decimalZero
                        player.f.sac = decimalZero
                        player.f.d1 = decimalZero
                        player.f.d2 = decimalZero
                        player.f.d3 = decimalZero
                        player.f.d4 = decimalZero
                        player.f.d5 = decimalZero
                        player.f.d6 = decimalZero
                        player.f.d7 = decimalZero
                        player.f.d8 = decimalZero
                        player.f.mult = decimalZero
                        player.f.buyables[11] = decimalZero
                        player.f.buyables[12] = decimalZero
                        player.f.buyables[13] = decimalZero
                        player.f.buyables[14] = decimalZero
                        player.f.buyables[21] = decimalZero
                        player.f.buyables[22] = decimalZero
                        player.f.buyables[23] = decimalZero
                        player.f.buyables[24] = decimalZero
                        player.f.buyables[31] = decimalZero
                        if (!hasMilestone("f",13)) player.f.buyables[32] = (hasFUpg(84) && !inChallenge("f", 22)) ? decimalTwo : decimalZero
                        }
                    if (hasMilestone("f",12)) player[this.layer].buyables[this.id] = player[this.layer].buyables[this.id].add(diff)
                }
            },
            style: {'height':'180px', 'width':'180px'},
        },
        34: {
			title() {
                let dis = ""
                let x=tmp[this.layer].buyables[this.id].total
                if (x.gte(1e35)) dis += "Distant "
                return dis + "Casualty Multiplier"
            },
            cost(x=tmp[this.layer].buyables[this.id].total) { // cost for buying xth buyable, can be an object if there are multiple currencies
                if (x.gte(1e35)) x = x.div(1e35).pow(3).mul(1e35)
                let cost = Decimal.pow(10, x).mul(5)
                return cost.floor()
            },
            base() { 
                let base = decimalTwo
                if (hasFUpg(135)) base = base.add(0.1)
                if (hasFUpg(151)) base = base.add(getFUpgEff(151))
                if (hasFUpg(173)) base = base.add(getFUpgEff(173))
                return base
            },
            total() {
                let total = getBuyableAmount("f", 34)
                return total
            },
			effect() { // Effects of owning x of the items, x is a decimal
                let x = tmp[this.layer].buyables[this.id].total
                let base = tmp[this.layer].buyables[this.id].base
                return Decimal.pow(base, x);
            },
            display() { // Everything else displayed in the buyable button after the title
                if (player.tab != "f" || player.subtabs.f.mainTabs != "Multiplier") return 
                return "Multiply Casualty gain by " + format(this.base()) + "\n\
                Cost: " + format(tmp[this.layer].buyables[this.id].cost)+" casualty\n\
                Multiplier: " + format(tmp[this.layer].buyables[this.id].effect)+"x\n\
                Amount: " + formatWhole(this.total())
            },
            unlocked() { return hasMilestone("f", 8) }, 
            canAfford() {
                    return player.f.casualty.gte(tmp[this.layer].buyables[this.id].cost)},
            buy() { 
                cost = tmp[this.layer].buyables[this.id].cost
                if (tmp[this.layer].buyables[this.id].canAfford) {
                    if (!hasMilestone("f",18)) player.f.casualty = player.f.casualty.sub(cost).max(0)
                    player[this.layer].buyables[this.id] = player[this.layer].buyables[this.id].add(1).max(1)
                }
            },
            buyMax() { 
                let cost = this.cost()
                let f = player.f.casualty.max(1)
                let max = f.div(5).log10()
                if (max.gte(1e35)) max = max.div(1e35).pow(1/3).mul(1e35)
                let diff = max.ceil().sub(this.total())
                cost = Decimal.sub(1,Decimal.pow(10,diff)).div(-9).mul(cost)
                if (tmp[this.layer].buyables[this.id].canAfford) {
                    if (!hasMilestone("f",18)) player.f.casualty = player.f.casualty.sub(cost).max(0)	
                    player[this.layer].buyables[this.id] = player[this.layer].buyables[this.id].add(diff)
                }
            },
            style: {'height':'180px', 'width':'180px',
                "background-color"() {
                    let color = "#bf8f8f"
                    if (tmp.f.buyables[34].canAfford) color = "#3d2963"
                    return color
                }
            },
        },
        41: {
			title() {
                let dim = "Fatality Dimension 1 Autobuyer"
                return dim
            },
			cost(x=player[this.layer].buyables[this.id]) { // cost for buying xth buyable, can be an object if there are multiple currencies
                let cost = Decimal.pow(2.8,x)
                return cost.floor()
            },
            on() {
                return player.f.d1auto
            },
            speedbase() { 
                let base = new Decimal(2.5)
                return base
            },
            bulkbase() { 
                let base = decimalTwo
                return base
            },
            total() {
                let total = getBuyableAmount("f", 41)
                return total
            },
			speed() { 
                let x = tmp.f.buyables[this.id].total
                let base = tmp.f.buyables[this.id].speedbase
                return Decimal.pow(base, x).div(1.25).min(10);
            },
            bulk() { 
                let x = tmp.f.buyables[this.id].total
                let base = tmp.f.buyables[this.id].bulkbase
                let eff = Decimal.pow(base, x)
                if (hasUpgrade("e",21)) eff = eff.mul(1e6)
                if (hasUpgrade("e",143)) eff = Decimal.tetrate(10,1.79e308)
                return eff;
            },
            display() { // Everything else displayed in the buyable button after the title
                if (player.tab != "f" || player.subtabs.f.mainTabs != "Autobuyers") return 
                let dim = "Autobuys Fatality Dimension 1."
                if (this.total().gte(15)) dim += "(MAXED)"
                return dim + "\n\
                Cost: " + formatWhole(tmp[this.layer].buyables[this.id].cost)+" casualty\n\
                Interval: " + formatTime(Decimal.div(1,this.speed()))+"\n\
                Bulk: " + formatWhole(this.bulk())
            },
            canAfford() {
                return player.f.casualty.gte(tmp[this.layer].buyables[this.id].cost) && this.total().lt(15)},
            unlocked() { return hasChallenge("f", 11) }, 
            buy() { 
                cost = tmp[this.layer].buyables[this.id].cost
                if (tmp[this.layer].buyables[this.id].canAfford) {
                    player.f.casualty = player.f.casualty.sub(cost).max(0)	
                    player[this.layer].buyables[this.id] = player[this.layer].buyables[this.id].add(1).max(1)
                }
            },
            style: {'height':'180px', 'width':'180px',
                "background-color"() {
                    let color = "#bf8f8f"
                    if (tmp.f.buyables[41].canAfford) color = "#3d2963"
                    return color
                }
            },
        },
        42: {
			title() {
                let dim = "Fatality Dimension 2 Autobuyer"
                return dim
            },
			cost(x=player[this.layer].buyables[this.id]) { // cost for buying xth buyable, can be an object if there are multiple currencies
                let cost = Decimal.pow(2.8,x)
                return cost.floor()
            },
            on() {
                return player.f.d2auto
            },
            speedbase() { 
                let base = new Decimal(2.5)
                return base
            },
            bulkbase() { 
                let base = decimalTwo
                return base
            },
            total() {
                let total = getBuyableAmount("f", 42)
                return total
            },
			speed() { 
                let x = tmp.f.buyables[this.id].total
                let base = tmp.f.buyables[this.id].speedbase
                return Decimal.pow(base, x).div(1.5).min(10);
            },
            bulk() { 
                let x = tmp.f.buyables[this.id].total
                let base = tmp.f.buyables[this.id].bulkbase
                let eff = Decimal.pow(base, x)
                if (hasUpgrade("e",21)) eff = eff.mul(1e6)
                if (hasUpgrade("e",143)) eff = Decimal.tetrate(10,1.79e308)
                return eff;
            },
            display() { // Everything else displayed in the buyable button after the title
                if (player.tab != "f" || player.subtabs.f.mainTabs != "Autobuyers") return 
                let dim = "Autobuys Fatality Dimension 2."
                if (this.total().gte(15)) dim += "(MAXED)"
                return dim + "\n\
                Cost: " + formatWhole(tmp[this.layer].buyables[this.id].cost)+" casualty\n\
                Interval: " + formatTime(Decimal.div(1,this.speed()))+"\n\
                Bulk: " + formatWhole(this.bulk())
            },
            canAfford() {
                return player.f.casualty.gte(tmp[this.layer].buyables[this.id].cost) && this.total().lt(15)},
            unlocked() { return hasChallenge("f", 11) }, 
            buy() { 
                cost = tmp[this.layer].buyables[this.id].cost
                if (tmp[this.layer].buyables[this.id].canAfford) {
                    player.f.casualty = player.f.casualty.sub(cost).max(0)	
                    player[this.layer].buyables[this.id] = player[this.layer].buyables[this.id].add(1).max(1)
                }
            },
            style: {'height':'180px', 'width':'180px',
                "background-color"() {
                    let color = "#bf8f8f"
                    if (tmp.f.buyables[42].canAfford) color = "#3d2963"
                    return color
                }
            },
        },
        43: {
			title() {
                let dim = "Fatality Dimension 3 Autobuyer"
                return dim
            },
			cost(x=player[this.layer].buyables[this.id]) { // cost for buying xth buyable, can be an object if there are multiple currencies
                let cost = Decimal.pow(2.8,x)
                return cost.floor()
            },
            on() {
                return player.f.d3auto
            },
            speedbase() { 
                let base = new Decimal(2.5)
                return base
            },
            bulkbase() { 
                let base = decimalTwo
                return base
            },
            total() {
                let total = getBuyableAmount("f", 43)
                return total
            },
			speed() { 
                let x = tmp.f.buyables[this.id].total
                let base = tmp.f.buyables[this.id].speedbase
                return Decimal.pow(base, x).div(1.75).min(10);
            },
            bulk() { 
                let x = tmp.f.buyables[this.id].total
                let base = tmp.f.buyables[this.id].bulkbase
                let eff = Decimal.pow(base, x)
                if (hasUpgrade("e",21)) eff = eff.mul(1e6)
                if (hasUpgrade("e",143)) eff = Decimal.tetrate(10,1.79e308)
                return eff;
            },
            display() { // Everything else displayed in the buyable button after the title
                if (player.tab != "f" || player.subtabs.f.mainTabs != "Autobuyers") return 
                let dim = "Autobuys Fatality Dimension 3."
                if (this.total().gte(15)) dim += "(MAXED)"
                return dim + "\n\
                Cost: " + formatWhole(tmp[this.layer].buyables[this.id].cost)+" casualty\n\
                Interval: " + formatTime(Decimal.div(1,this.speed()))+"\n\
                Bulk: " + formatWhole(this.bulk())
            },
            canAfford() {
                return player.f.casualty.gte(tmp[this.layer].buyables[this.id].cost) && this.total().lt(15)},
            unlocked() { return hasChallenge("f", 11) }, 
            buy() { 
                cost = tmp[this.layer].buyables[this.id].cost
                if (tmp[this.layer].buyables[this.id].canAfford) {
                    player.f.casualty = player.f.casualty.sub(cost).max(0)	
                    player[this.layer].buyables[this.id] = player[this.layer].buyables[this.id].add(1).max(1)
                }
            },
            style: {'height':'180px', 'width':'180px',
                "background-color"() {
                    let color = "#bf8f8f"
                    if (tmp.f.buyables[43].canAfford) color = "#3d2963"
                    return color
                }
            },
        },
        44: {
			title() {
                let dim = "Fatality Dimension 4 Autobuyer"
                return dim
            },
			cost(x=player[this.layer].buyables[this.id]) { // cost for buying xth buyable, can be an object if there are multiple currencies
                let cost = Decimal.pow(2.8,x)
                return cost.floor()
            },
            on() {
                return player.f.d4auto
            },
            speedbase() { 
                let base = new Decimal(2.5)
                return base
            },
            bulkbase() { 
                let base = decimalTwo
                return base
            },
            total() {
                let total = getBuyableAmount("f", 44)
                return total
            },
			speed() { 
                let x = tmp.f.buyables[this.id].total
                let base = tmp.f.buyables[this.id].speedbase
                return Decimal.pow(base, x).div(2).min(10);
            },
            bulk() { 
                let x = tmp.f.buyables[this.id].total
                let base = tmp.f.buyables[this.id].bulkbase
                let eff = Decimal.pow(base, x)
                if (hasUpgrade("e",21)) eff = eff.mul(1e6)
                if (hasUpgrade("e",143)) eff = Decimal.tetrate(10,1.79e308)
                return eff;
            },
            display() { // Everything else displayed in the buyable button after the title
                if (player.tab != "f" || player.subtabs.f.mainTabs != "Autobuyers") return 
                let dim = "Autobuys Fatality Dimension 4."
                if (this.total().gte(15)) dim += "(MAXED)"
                return dim + "\n\
                Cost: " + formatWhole(tmp[this.layer].buyables[this.id].cost)+" casualty\n\
                Interval: " + formatTime(Decimal.div(1,this.speed()))+"\n\
                Bulk: " + formatWhole(this.bulk())
            },
            canAfford() {
                return player.f.casualty.gte(tmp[this.layer].buyables[this.id].cost) && this.total().lt(15)},
            unlocked() { return hasChallenge("f", 12) }, 
            buy() { 
                cost = tmp[this.layer].buyables[this.id].cost
                if (tmp[this.layer].buyables[this.id].canAfford) {
                    player.f.casualty = player.f.casualty.sub(cost).max(0)	
                    player[this.layer].buyables[this.id] = player[this.layer].buyables[this.id].add(1).max(1)
                }
            },
            style: {'height':'180px', 'width':'180px',
                "background-color"() {
                    let color = "#bf8f8f"
                    if (tmp.f.buyables[44].canAfford) color = "#3d2963"
                    return color
                }
            },
        },
        51: {
			title() {
                let dim = "Fatality Dimension 5 Autobuyer"
                return dim
            },
			cost(x=player[this.layer].buyables[this.id]) { // cost for buying xth buyable, can be an object if there are multiple currencies
                let cost = Decimal.pow(2.8,x)
                return cost.floor()
            },
            on() {
                return player.f.d5auto
            },
            speedbase() { 
                let base = new Decimal(2.5)
                return base
            },
            bulkbase() { 
                let base = decimalTwo
                return base
            },
            total() {
                let total = getBuyableAmount("f", 51)
                return total
            },
			speed() { 
                let x = tmp.f.buyables[this.id].total
                let base = tmp.f.buyables[this.id].speedbase
                return Decimal.pow(base, x).div(2.25).min(10);
            },
            bulk() { 
                let x = tmp.f.buyables[this.id].total
                let base = tmp.f.buyables[this.id].bulkbase
                let eff = Decimal.pow(base, x)
                if (hasUpgrade("e",21)) eff = eff.mul(1e6)
                if (hasUpgrade("e",143)) eff = Decimal.tetrate(10,1.79e308)
                return eff;
            },
            display() { // Everything else displayed in the buyable button after the title
                if (player.tab != "f" || player.subtabs.f.mainTabs != "Autobuyers") return 
                let dim = "Autobuys Fatality Dimension 5."
                if (this.total().gte(15)) dim += "(MAXED)"
                return dim + "\n\
                Cost: " + formatWhole(tmp[this.layer].buyables[this.id].cost)+" casualty\n\
                Interval: " + formatTime(Decimal.div(1,this.speed()))+"\n\
                Bulk: " + formatWhole(this.bulk())
            },
            canAfford() {
                return player.f.casualty.gte(tmp[this.layer].buyables[this.id].cost) && this.total().lt(15)},
            unlocked() { return hasChallenge("f", 12) }, 
            buy() { 
                cost = tmp[this.layer].buyables[this.id].cost
                if (tmp[this.layer].buyables[this.id].canAfford) {
                    player.f.casualty = player.f.casualty.sub(cost).max(0)	
                    player[this.layer].buyables[this.id] = player[this.layer].buyables[this.id].add(1).max(1)
                }
            },
            style: {'height':'180px', 'width':'180px',
                "background-color"() {
                    let color = "#bf8f8f"
                    if (tmp.f.buyables[51].canAfford) color = "#3d2963"
                    return color
                }
            },
        },
        52: {
			title() {
                let dim = "Fatality Dimension 6 Autobuyer"
                return dim
            },
			cost(x=player[this.layer].buyables[this.id]) { // cost for buying xth buyable, can be an object if there are multiple currencies
                let cost = Decimal.pow(2.8,x)
                return cost.floor()
            },
            on() {
                return player.f.d6auto
            },
            speedbase() { 
                let base = new Decimal(2.5)
                return base
            },
            bulkbase() { 
                let base = decimalTwo
                return base
            },
            total() {
                let total = getBuyableAmount("f", 52)
                return total
            },
			speed() { 
                let x = tmp.f.buyables[this.id].total
                let base = tmp.f.buyables[this.id].speedbase
                return Decimal.pow(base, x).div(2.5).min(10);
            },
            bulk() { 
                let x = tmp.f.buyables[this.id].total
                let base = tmp.f.buyables[this.id].bulkbase
                let eff = Decimal.pow(base, x)
                if (hasUpgrade("e",21)) eff = eff.mul(1e6)
                if (hasUpgrade("e",143)) eff = Decimal.tetrate(10,1.79e308)
                return eff;
            },
            display() { // Everything else displayed in the buyable button after the title
                if (player.tab != "f" || player.subtabs.f.mainTabs != "Autobuyers") return 
                let dim = "Autobuys Fatality Dimension 6."
                if (this.total().gte(15)) dim += "(MAXED)"
                return dim + "\n\
                Cost: " + formatWhole(tmp[this.layer].buyables[this.id].cost)+" casualty\n\
                Interval: " + formatTime(Decimal.div(1,this.speed()))+"\n\
                Bulk: " + formatWhole(this.bulk())
            },
            canAfford() {
                return player.f.casualty.gte(tmp[this.layer].buyables[this.id].cost) && this.total().lt(15)},
            unlocked() { return hasChallenge("f", 12) }, 
            buy() { 
                cost = tmp[this.layer].buyables[this.id].cost
                if (tmp[this.layer].buyables[this.id].canAfford) {
                    player.f.casualty = player.f.casualty.sub(cost).max(0)	
                    player[this.layer].buyables[this.id] = player[this.layer].buyables[this.id].add(1).max(1)
                }
            },
            style: {'height':'180px', 'width':'180px',
                "background-color"() {
                    let color = "#bf8f8f"
                    if (tmp.f.buyables[52].canAfford) color = "#3d2963"
                    return color
                }
            },
        },
        53: {
			title() {
                let dim = "Fatality Dimension 7 Autobuyer"
                return dim
            },
			cost(x=player[this.layer].buyables[this.id]) { // cost for buying xth buyable, can be an object if there are multiple currencies
                let cost = Decimal.pow(2.8,x)
                return cost.floor()
            },
            on() {
                return player.f.d7auto
            },
            speedbase() { 
                let base = new Decimal(2.5)
                return base
            },
            bulkbase() { 
                let base = decimalTwo
                return base
            },
            total() {
                let total = getBuyableAmount("f", 53)
                return total
            },
			speed() { 
                let x = tmp.f.buyables[this.id].total
                let base = tmp.f.buyables[this.id].speedbase
                return Decimal.pow(base, x).div(2.75).min(10);
            },
            bulk() { 
                let x = tmp.f.buyables[this.id].total
                let base = tmp.f.buyables[this.id].bulkbase
                let eff = Decimal.pow(base, x)
                if (hasUpgrade("e",21)) eff = eff.mul(1e6)
                if (hasUpgrade("e",143)) eff = Decimal.tetrate(10,1.79e308)
                return eff;
            },
            display() { // Everything else displayed in the buyable button after the title
                if (player.tab != "f" || player.subtabs.f.mainTabs != "Autobuyers") return 
                let dim = "Autobuys Fatality Dimension 7."
                if (this.total().gte(15)) dim += "(MAXED)"
                return dim + "\n\
                Cost: " + formatWhole(tmp[this.layer].buyables[this.id].cost)+" casualty\n\
                Interval: " + formatTime(Decimal.div(1,this.speed()))+"\n\
                Bulk: " + formatWhole(this.bulk())
            },
            canAfford() {
                return player.f.casualty.gte(tmp[this.layer].buyables[this.id].cost) && this.total().lt(15)},
            unlocked() { return hasChallenge("f", 21) }, 
            buy() { 
                cost = tmp[this.layer].buyables[this.id].cost
                if (tmp[this.layer].buyables[this.id].canAfford) {
                    player.f.casualty = player.f.casualty.sub(cost).max(0)	
                    player[this.layer].buyables[this.id] = player[this.layer].buyables[this.id].add(1).max(1)
                }
            },
            style: {'height':'180px', 'width':'180px',
                "background-color"() {
                    let color = "#bf8f8f"
                    if (tmp.f.buyables[53].canAfford) color = "#3d2963"
                    return color
                }
            },
        },
        54: {
			title() {
                let dim = "Fatality Dimension 8 Autobuyer"
                return dim
            },
			cost(x=player[this.layer].buyables[this.id]) { // cost for buying xth buyable, can be an object if there are multiple currencies
                let cost = Decimal.pow(2.8,x)
                return cost.floor()
            },
            on() {
                return player.f.d8auto
            },
            speedbase() { 
                let base = new Decimal(2.5)
                return base
            },
            bulkbase() { 
                let base = decimalTwo
                return base
            },
            total() {
                let total = getBuyableAmount("f", 54)
                return total
            },
			speed() { 
                let x = tmp.f.buyables[this.id].total
                let base = tmp.f.buyables[this.id].speedbase
                return Decimal.pow(base, x).div(3).min(10);
            },
            bulk() { 
                let x = tmp.f.buyables[this.id].total
                let base = tmp.f.buyables[this.id].bulkbase
                let eff = Decimal.pow(base, x)
                if (hasUpgrade("e",21)) eff = eff.mul(1e6)
                if (hasUpgrade("e",143)) eff = Decimal.tetrate(10,1.79e308)
                return eff;
            },
            display() { // Everything else displayed in the buyable button after the title
                if (player.tab != "f" || player.subtabs.f.mainTabs != "Autobuyers") return 
                let dim = "Autobuys Fatality Dimension 8."
                if (this.total().gte(15)) dim += "(MAXED)"
                return dim + "\n\
                Cost: " + formatWhole(tmp[this.layer].buyables[this.id].cost)+" casualty\n\
                Interval: " + formatTime(Decimal.div(1,this.speed()))+"\n\
                Bulk: " + formatWhole(this.bulk())
            },
            canAfford() {
                return player.f.casualty.gte(tmp[this.layer].buyables[this.id].cost) && this.total().lt(15)},
            unlocked() { return hasChallenge("f", 21) }, 
            buy() { 
                cost = tmp[this.layer].buyables[this.id].cost
                if (tmp[this.layer].buyables[this.id].canAfford) {
                    player.f.casualty = player.f.casualty.sub(cost).max(0)	
                    player[this.layer].buyables[this.id] = player[this.layer].buyables[this.id].add(1).max(1)
                }
            },
            style: {'height':'180px', 'width':'180px',
                "background-color"() {
                    let color = "#bf8f8f"
                    if (tmp.f.buyables[54].canAfford) color = "#3d2963"
                    return color
                }
            },
        },
        61: {
			title() {
                let dim = "Fatality Dimension Multiplier Autobuyer"
                return dim
            },
			cost(x=player[this.layer].buyables[this.id]) { // cost for buying xth buyable, can be an object if there are multiple currencies
                let cost = Decimal.pow(2.8,x)
                return cost.floor()
            },
            on() {
                return player.f.multauto
            },
            speedbase() { 
                let base = new Decimal(2.5)
                return base
            },
            bulkbase() { 
                let base = decimalTwo
                return base
            },
            total() {
                let total = getBuyableAmount("f", 61)
                return total
            },
			speed() { 
                let x = tmp.f.buyables[this.id].total
                let base = tmp.f.buyables[this.id].speedbase
                return Decimal.pow(base, x).div(1.5).min(10);
            },
            bulk() { 
                let x = tmp.f.buyables[this.id].total
                let base = tmp.f.buyables[this.id].bulkbase
                let eff = Decimal.pow(base, x)
                if (hasUpgrade("e",21)) eff = eff.mul(1e6)
                if (hasUpgrade("e",143)) eff = Decimal.tetrate(10,1.79e308)
                return eff;
            },
            display() { // Everything else displayed in the buyable button after the title
                if (player.tab != "f" || player.subtabs.f.mainTabs != "Autobuyers") return 
                let dim = "Autobuys Fatality Dimension Multiplier."
                if (this.total().gte(15)) dim += "(MAXED)"
                return dim + "\n\
                Cost: " + formatWhole(tmp[this.layer].buyables[this.id].cost)+" casualty\n\
                Interval: " + formatTime(Decimal.div(1,this.speed()))+"\n\
                Bulk: " + formatWhole(this.bulk())
            },
            canAfford() {
                return player.f.casualty.gte(tmp[this.layer].buyables[this.id].cost) && this.total().lt(15)},
            unlocked() { return hasChallenge("f", 21) }, 
            buy() { 
                cost = tmp[this.layer].buyables[this.id].cost
                if (tmp[this.layer].buyables[this.id].canAfford) {
                    player.f.casualty = player.f.casualty.sub(cost).max(0)	
                    player[this.layer].buyables[this.id] = player[this.layer].buyables[this.id].add(1).max(1)
                }
            },
            style: {'height':'180px', 'width':'180px',
                "background-color"() {
                    let color = "#bf8f8f"
                    if (tmp.f.buyables[61].canAfford) color = "#3d2963"
                    return color
                }
            },
        },
        62: {
			title() {
                let dim = "Fatality Dimension Boost Autobuyer"
                return dim
            },
			cost(x=player[this.layer].buyables[this.id]) { // cost for buying xth buyable, can be an object if there are multiple currencies
                let cost = Decimal.pow(3.5,x)
                return cost.floor()
            },
            on() {
                return player.f.boostauto
            },
            speedbase() { 
                let base = new Decimal(1.8)
                return base
            },
            total() {
                let total = getBuyableAmount("f", 62)
                return total
            },
			speed() { 
                let x = tmp.f.buyables[this.id].total
                let base = tmp.f.buyables[this.id].speedbase
                return Decimal.pow(base, x).div(15).min(10);
            },
            bulk() { 
                return Decimal.tetrate(10, 1.79e308);
            },
            display() { // Everything else displayed in the buyable button after the title
                if (player.tab != "f" || player.subtabs.f.mainTabs != "Autobuyers") return 
                let dim = "Autobuys Fatality Dimension Boost."
                if (this.speed().gte(10)) dim += "(MAXED)"
                return dim + "\n\
                Cost: " + formatWhole(tmp[this.layer].buyables[this.id].cost)+" casualty\n\
                Interval: " + formatTime(Decimal.div(1,this.speed()))
            },
            canAfford() {
                return player.f.casualty.gte(tmp[this.layer].buyables[this.id].cost) && this.speed().lt(10)},
            unlocked() { return hasChallenge("f", 22) }, 
            buy() { 
                cost = tmp[this.layer].buyables[this.id].cost
                if (tmp[this.layer].buyables[this.id].canAfford) {
                    player.f.casualty = player.f.casualty.sub(cost).max(0)	
                    player[this.layer].buyables[this.id] = player[this.layer].buyables[this.id].add(1).max(1)
                }
            },
            style: {'height':'180px', 'width':'180px',
                "background-color"() {
                    let color = "#bf8f8f"
                    if (tmp.f.buyables[62].canAfford) color = "#3d2963"
                    return color
                }
            },
        },
        63: {
			title() {
                let dim = "Fatality Multiplier Boost Autobuyer"
                return dim
            },
			cost(x=player[this.layer].buyables[this.id]) { // cost for buying xth buyable, can be an object if there are multiple currencies
                let cost = Decimal.pow(3.5,x)
                return cost.floor()
            },
            on() {
                return player.f.multbauto
            },
            speedbase() { 
                let base = new Decimal(1.7)
                return base
            },
            total() {
                let total = getBuyableAmount("f", 63)
                return total
            },
			speed() { 
                let x = tmp.f.buyables[this.id].total
                let base = tmp.f.buyables[this.id].speedbase
                return Decimal.pow(base, x).div(60).min(10);
            },
            bulk() { 
                return Decimal.tetrate(10, 1.79e308);
            },
            display() { // Everything else displayed in the buyable button after the title
                if (player.tab != "f" || player.subtabs.f.mainTabs != "Autobuyers") return 
                let dim = "Autobuys Fatality Multiplier Boost."
                if (this.speed().gte(10)) dim += "(MAXED)"
                return dim + "\n\
                Cost: " + formatWhole(tmp[this.layer].buyables[this.id].cost)+" casualty\n\
                Interval: " + formatTime(Decimal.div(1,this.speed()))
            },
            canAfford() {
                return player.f.casualty.gte(tmp[this.layer].buyables[this.id].cost) && this.speed().lt(10)},
            unlocked() { return hasChallenge("f", 22) }, 
            buy() { 
                cost = tmp[this.layer].buyables[this.id].cost
                if (tmp[this.layer].buyables[this.id].canAfford) {
                    player.f.casualty = player.f.casualty.sub(cost).max(0)	
                    player[this.layer].buyables[this.id] = player[this.layer].buyables[this.id].add(1).max(1)
                }
            },
            style: {'height':'180px', 'width':'180px',
                "background-color"() {
                    let color = "#bf8f8f"
                    if (tmp.f.buyables[63].canAfford) color = "#3d2963"
                    return color
                }
            },
        },
        64: {
			title() {
                let dim = "Automatic Sacrifice"
                return dim
            },
			cost(x=player[this.layer].buyables[this.id]) { // cost for buying xth buyable, can be an object if there are multiple currencies
                let cost = Decimal.pow(3.5,x)
                return cost.floor()
            },
            on() {
                return player.f.sacauto
            },
            speedbase() { 
                let base = new Decimal(1.7)
                return base
            },
            total() {
                let total = getBuyableAmount("f", 64)
                return total
            },
			speed() { 
                let x = tmp.f.buyables[this.id].total
                let base = tmp.f.buyables[this.id].speedbase
                return Decimal.pow(base, x).div(10).min(10);
            },
            display() { // Everything else displayed in the buyable button after the title
                if (player.tab != "f" || player.subtabs.f.mainTabs != "Autobuyers") return 
                let dim = "Automatically Sacrifice at 100x."
                if (this.speed().gte(10)) dim += "(MAXED)"
                return dim + "\n\
                Cost: " + formatWhole(tmp[this.layer].buyables[this.id].cost)+" casualty\n\
                Interval: " + formatTime(Decimal.div(1,this.speed()))
            },
            canAfford() {
                return player.f.casualty.gte(tmp[this.layer].buyables[this.id].cost) && this.speed().lt(10)},
            unlocked() { return hasMilestone("f", 13) }, 
            buy() { 
                cost = tmp[this.layer].buyables[this.id].cost
                if (tmp[this.layer].buyables[this.id].canAfford) {
                    player.f.casualty = player.f.casualty.sub(cost).max(0)	
                    player[this.layer].buyables[this.id] = player[this.layer].buyables[this.id].add(1).max(1)
                }
            },
            style: {'height':'180px', 'width':'180px',
                "background-color"() {
                    let color = "#bf8f8f"
                    if (tmp.f.buyables[64].canAfford) color = "#3d2963"
                    return color
                }
            },
        },
        71: {
			title: "Casualty Dimension 1",
			cost() { // cost for buying xth buyable, can be an object if there are multiple currencies
                let x=player.f.cd[0]
                let cost = Decimal.pow(1e5, x).mul(1e14)
                return cost.floor()
            },
            base() { 
                let base = tmp.f.cmultpd.mul(15).pow(tmp.f.cmultExp)
                return base
            },
            gain(x=player[this.layer].buyables[this.id]) {
                let gain = this.effect().mul(x)
                return gain
            },
            total() {
                let total = getBuyableAmount("f", 71)
                return total
            },
            bought() {
                let bought = player.f.cd[0]
                return bought
            },
			effect() { // Effects of owning x of the items, x is a decimal
                let x = tmp[this.layer].buyables[this.id].bought
                let base = tmp[this.layer].buyables[this.id].base
                let eff = Decimal.pow(base, x).mul(tmp.f.cDimMult)
                return eff;
            },
            display() { // Everything else displayed in the buyable button after the title
                if (player.tab != "f" || player.subtabs.f.mainTabs != "Casualty Dimensions") return 
                return "Produces casualty power.\n\
                Cost: " + format(tmp[this.layer].buyables[this.id].cost)+" casualty\n\
                Multiplier: " + format(tmp[this.layer].buyables[this.id].effect)+"x\n\
                Amount: " + formatWhole(this.total()) + "(" + formatWhole(this.bought()) + ")"
            },
            unlocked() { return hasMilestone("f", 16) }, 
            canAfford() {
                    return player.f.casualty.gte(tmp[this.layer].buyables[this.id].cost)},
            buy() { 
                cost = tmp[this.layer].buyables[this.id].cost
                if (tmp[this.layer].buyables[this.id].canAfford) {
                    if (!hasMilestone("f",19)) player.f.casualty = player.f.casualty.sub(cost).max(0)	
                    player.f.cd[0] = player.f.cd[0].add(1).max(1)
                    player[this.layer].buyables[this.id] = player[this.layer].buyables[this.id].add(1).max(1)
                }
            },
            buyMax(b) { 
                let cost = this.cost()
                let f = player.f.casualty.max(1)
                let max = f.div(1e14).log10().div(5).ceil()
                let diff = max.sub(player.f.cd[0]).min(b)
                cost = Decimal.sub(1,Decimal.pow(1e5,max)).div(-99999).mul(1e14)
                if (tmp[this.layer].buyables[this.id].canAfford) {
                    if (!hasMilestone("f",19)) player.f.casualty = player.f.casualty.sub(cost).max(0)	
                    player.f.cd[0] = player.f.cd[0].add(diff)
                    player[this.layer].buyables[this.id] = player[this.layer].buyables[this.id].add(diff)
                }
            },
            style: {'height':'180px', 'width':'180px',
                "background-color"() {
                    let color = "#bf8f8f"
                    if (tmp.f.buyables[71].canAfford) color = "#3d2963"
                    return color
                }
            },
        },
        72: {
			title: "Casualty Dimension 2",
			cost() { // cost for buying xth buyable, can be an object if there are multiple currencies
                let x=player.f.cd[1]
                let cost = Decimal.pow(1e9, x).mul(1e16)
                return cost.floor()
            },
            base() { 
                let base = tmp.f.cmultpd.mul(10).pow(tmp.f.cmultExp)
                return base
            },
            gain(x=player[this.layer].buyables[this.id]) {
                let gain = this.effect().mul(x).div(10)
                return gain
            },
            total() {
                let total = getBuyableAmount("f", 72)
                return total
            },
            bought() {
                let bought = player.f.cd[1]
                return bought
            },
			effect() { // Effects of owning x of the items, x is a decimal
                let x = tmp[this.layer].buyables[this.id].bought
                let base = tmp[this.layer].buyables[this.id].base
                let eff = Decimal.pow(base, x).mul(tmp.f.cDimMult)
                return eff;
            },
            display() { // Everything else displayed in the buyable button after the title
                if (player.tab != "f" || player.subtabs.f.mainTabs != "Casualty Dimensions") return 
                return "Produces Casualty Dimension 1.\n\
                Cost: " + format(tmp[this.layer].buyables[this.id].cost)+" casualty\n\
                Multiplier: " + format(tmp[this.layer].buyables[this.id].effect)+"x\n\
                Amount: " + formatWhole(this.total()) + "(" + formatWhole(this.bought()) + ")"
            },
            unlocked() { return hasMilestone("f", 16) }, 
            canAfford() {
                    return player.f.casualty.gte(tmp[this.layer].buyables[this.id].cost)},
            buy() { 
                cost = tmp[this.layer].buyables[this.id].cost
                if (tmp[this.layer].buyables[this.id].canAfford) {
                    if (!hasMilestone("f",19)) player.f.casualty = player.f.casualty.sub(cost).max(0)	
                    player.f.cd[1] = player.f.cd[1].add(1).max(1)
                    player[this.layer].buyables[this.id] = player[this.layer].buyables[this.id].add(1).max(1)
                }
            },
            buyMax(b) { 
                let cost = this.cost()
                let f = player.f.casualty.max(1)
                let max = f.div(1e16).log10().div(9).ceil()
                let diff = max.sub(player.f.cd[1]).min(b)
                cost = Decimal.sub(1,Decimal.pow(1e9,max)).div(-999999999).mul(1e16)
                if (tmp[this.layer].buyables[this.id].canAfford) {
                    if (!hasMilestone("f",19)) player.f.casualty = player.f.casualty.sub(cost).max(0)	
                    player.f.cd[1] = player.f.cd[1].add(diff)
                    player[this.layer].buyables[this.id] = player[this.layer].buyables[this.id].add(diff)
                }
            },
            style: {'height':'180px', 'width':'180px',
                "background-color"() {
                    let color = "#bf8f8f"
                    if (tmp.f.buyables[72].canAfford) color = "#3d2963"
                    return color
                }
            },
        },
        73: {
			title: "Casualty Dimension 3",
			cost() { // cost for buying xth buyable, can be an object if there are multiple currencies
                let x=player.f.cd[2]
                let cost = Decimal.pow(1e13, x).mul(1e29)
                return cost.floor()
            },
            base() { 
                let base = tmp.f.cmultpd.mul(4).pow(tmp.f.cmultExp)
                return base
            },
            gain(x=player[this.layer].buyables[this.id]) {
                let gain = this.effect().mul(x).div(10)
                return gain
            },
            total() {
                let total = getBuyableAmount("f", 73)
                return total
            },
            bought() {
                let bought = player.f.cd[2]
                return bought
            },
			effect() { // Effects of owning x of the items, x is a decimal
                let x = tmp[this.layer].buyables[this.id].bought
                let base = tmp[this.layer].buyables[this.id].base
                let eff = Decimal.pow(base, x).mul(tmp.f.cDimMult)
                return eff;
            },
            display() { // Everything else displayed in the buyable button after the title
                if (player.tab != "f" || player.subtabs.f.mainTabs != "Casualty Dimensions") return 
                return "Produces Casualty Dimension 2.\n\
                Cost: " + format(tmp[this.layer].buyables[this.id].cost)+" casualty\n\
                Multiplier: " + format(tmp[this.layer].buyables[this.id].effect)+"x\n\
                Amount: " + formatWhole(this.total()) + "(" + formatWhole(this.bought()) + ")"
            },
            unlocked() { return player.f.best.gte("e120000") || getBuyableAmount("f", 74).gte(1) }, 
            canAfford() {
                    return player.f.casualty.gte(tmp[this.layer].buyables[this.id].cost)},
            buy() { 
                cost = tmp[this.layer].buyables[this.id].cost
                if (tmp[this.layer].buyables[this.id].canAfford) {
                    if (!hasMilestone("f",19)) player.f.casualty = player.f.casualty.sub(cost).max(0)	
                    player.f.cd[2] = player.f.cd[2].add(1).max(1)
                    player[this.layer].buyables[this.id] = player[this.layer].buyables[this.id].add(1).max(1)
                }
            },
            buyMax(b) { 
                let cost = this.cost()
                let f = player.f.casualty.max(1)
                let max = f.div(1e29).log10().div(13).ceil()
                let diff = max.sub(player.f.cd[2]).min(b)
                cost = Decimal.sub(1,Decimal.pow(1e13,max)).div(-1e13).mul(1e29)
                if (tmp[this.layer].buyables[this.id].canAfford) {
                    if (!hasMilestone("f",19)) player.f.casualty = player.f.casualty.sub(cost).max(0)	
                    player.f.cd[2] = player.f.cd[2].add(diff)
                    player[this.layer].buyables[this.id] = player[this.layer].buyables[this.id].add(diff)
                }
            },
            style: {'height':'180px', 'width':'180px',
                "background-color"() {
                    let color = "#bf8f8f"
                    if (tmp.f.buyables[73].canAfford) color = "#3d2963"
                    return color
                }
            },
        },
        74: {
			title: "Casualty Dimension 4",
			cost() { // cost for buying xth buyable, can be an object if there are multiple currencies
                let x=player.f.cd[3]
                let cost = Decimal.pow(1e17, x).mul(1e50)
                return cost.floor()
            },
            base() { 
                let base = tmp.f.cmultpd.mul(2).pow(tmp.f.cmultExp)
                return base
            },
            gain(x=player[this.layer].buyables[this.id]) {
                let gain = this.effect().mul(x).div(10)
                return gain
            },
            total() {
                let total = getBuyableAmount("f", 74)
                return total
            },
            bought() {
                let bought = player.f.cd[3]
                return bought
            },
			effect() { // Effects of owning x of the items, x is a decimal
                let x = tmp[this.layer].buyables[this.id].bought
                let base = tmp[this.layer].buyables[this.id].base
                let eff = Decimal.pow(base, x).mul(tmp.f.cDimMult)
                return eff;
            },
            display() { // Everything else displayed in the buyable button after the title
                if (player.tab != "f" || player.subtabs.f.mainTabs != "Casualty Dimensions") return 
                return "Produces Casualty Dimension 3.\n\
                Cost: " + format(tmp[this.layer].buyables[this.id].cost)+" casualty\n\
                Multiplier: " + format(tmp[this.layer].buyables[this.id].effect)+"x\n\
                Amount: " + formatWhole(this.total()) + "(" + formatWhole(this.bought()) + ")"
            },
            unlocked() { return player.f.best.gte("e300000") || getBuyableAmount("f", 74).gte(1) }, 
            canAfford() {
                    return player.f.casualty.gte(tmp[this.layer].buyables[this.id].cost)},
            buy() { 
                cost = tmp[this.layer].buyables[this.id].cost
                if (tmp[this.layer].buyables[this.id].canAfford) {
                    if (!hasMilestone("f",19)) player.f.casualty = player.f.casualty.sub(cost).max(0)	
                    player.f.cd[3] = player.f.cd[3].add(1).max(1)
                    player[this.layer].buyables[this.id] = player[this.layer].buyables[this.id].add(1).max(1)
                }
            },
            buyMax(b) { 
                let cost = this.cost()
                let f = player.f.casualty.max(1)
                let max = f.div(1e50).log10().div(17).ceil()
                let diff = max.sub(player.f.cd[3]).min(b)
                cost = Decimal.sub(1,Decimal.pow(1e17,max)).div(-1e17).mul(1e50)
                if (tmp[this.layer].buyables[this.id].canAfford) {
                    if (!hasMilestone("f",19)) player.f.casualty = player.f.casualty.sub(cost).max(0)	
                    player.f.cd[3] = player.f.cd[3].add(diff)
                    player[this.layer].buyables[this.id] = player[this.layer].buyables[this.id].add(diff)
                }
            },
            style: {'height':'180px', 'width':'180px',
                "background-color"() {
                    let color = "#bf8f8f"
                    if (tmp.f.buyables[74].canAfford) color = "#3d2963"
                    return color
                }
            },
        },
        81: {
			title: "Casualty Dimension 5",
			cost() { // cost for buying xth buyable, can be an object if there are multiple currencies
                let x=player.f.cd[4]
                let cost = Decimal.pow(1e20, x).mul("1e460")
                return cost.floor()
            },
            base() { 
                let base = tmp.f.cmultpd.pow(tmp.f.cmultExp)
                return base
            },
            gain(x=player[this.layer].buyables[this.id]) {
                let gain = this.effect().mul(x).div(10)
                return gain
            },
            total() {
                let total = getBuyableAmount("f", 81)
                return total
            },
            bought() {
                let bought = player.f.cd[4]
                return bought
            },
			effect() { // Effects of owning x of the items, x is a decimal
                let x = tmp[this.layer].buyables[this.id].bought
                let base = tmp[this.layer].buyables[this.id].base
                let eff = Decimal.pow(base, x).mul(tmp.f.cDimMult)
                return eff;
            },
            display() { // Everything else displayed in the buyable button after the title
                if (player.tab != "f" || player.subtabs.f.mainTabs != "Casualty Dimensions") return 
                return "Produces Casualty Dimension 4.\n\
                Cost: " + format(tmp[this.layer].buyables[this.id].cost)+" casualty\n\
                Multiplier: " + format(tmp[this.layer].buyables[this.id].effect)+"x\n\
                Amount: " + formatWhole(this.total()) + "(" + formatWhole(this.bought()) + ")"
            },
            unlocked() { return player.f.best.gte("e1600000") || getBuyableAmount("f", 81).gte(1) }, 
            canAfford() {
                    return player.f.casualty.gte(tmp[this.layer].buyables[this.id].cost)},
            buy() { 
                cost = tmp[this.layer].buyables[this.id].cost
                if (tmp[this.layer].buyables[this.id].canAfford) {
                    if (!hasMilestone("f",19)) player.f.casualty = player.f.casualty.sub(cost).max(0)	
                    player.f.cd[4] = player.f.cd[4].add(1).max(1)
                    player[this.layer].buyables[this.id] = player[this.layer].buyables[this.id].add(1).max(1)
                }
            },
            buyMax(b) { 
                let cost = this.cost()
                let f = player.f.casualty.max(1)
                let max = f.div("1e460").log10().div(20).ceil()
                let diff = max.sub(player.f.cd[4]).min(b)
                cost = Decimal.sub(1,Decimal.pow(1e20,max)).div(-1e20).mul("1e460")
                if (tmp[this.layer].buyables[this.id].canAfford) {
                    if (!hasMilestone("f",19)) player.f.casualty = player.f.casualty.sub(cost).max(0)	
                    player.f.cd[4] = player.f.cd[4].add(diff)
                    player[this.layer].buyables[this.id] = player[this.layer].buyables[this.id].add(diff)
                }
            },
            style: {'height':'180px', 'width':'180px',
                "background-color"() {
                    let color = "#bf8f8f"
                    if (tmp.f.buyables[81].canAfford) color = "#3d2963"
                    return color
                }
            },
        },
        82: {
			title: "Casualty Dimension 6",
			cost() { // cost for buying xth buyable, can be an object if there are multiple currencies
                let x=player.f.cd[5]
                let cost = Decimal.pow(1e25, x).mul("1e575")
                return cost.floor()
            },
            base() { 
                let base = tmp.f.cmultpd.pow(tmp.f.cmultExp)
                return base
            },
            gain(x=player[this.layer].buyables[this.id]) {
                let gain = this.effect().mul(x).div(10)
                return gain
            },
            total() {
                let total = getBuyableAmount("f", 82)
                return total
            },
            bought() {
                let bought = player.f.cd[5]
                return bought
            },
			effect() { // Effects of owning x of the items, x is a decimal
                let x = tmp[this.layer].buyables[this.id].bought
                let base = tmp[this.layer].buyables[this.id].base
                let eff = Decimal.pow(base, x).mul(tmp.f.cDimMult)
                return eff;
            },
            display() { // Everything else displayed in the buyable button after the title
                if (player.tab != "f" || player.subtabs.f.mainTabs != "Casualty Dimensions") return 
                return "Produces Casualty Dimension 5.\n\
                Cost: " + format(tmp[this.layer].buyables[this.id].cost)+" casualty\n\
                Multiplier: " + format(tmp[this.layer].buyables[this.id].effect)+"x\n\
                Amount: " + formatWhole(this.total()) + "(" + formatWhole(this.bought()) + ")"
            },
            unlocked() { return player.f.best.gte("e2000000") || getBuyableAmount("f", 82).gte(1) }, 
            canAfford() {
                    return player.f.casualty.gte(tmp[this.layer].buyables[this.id].cost)},
            buy() { 
                cost = tmp[this.layer].buyables[this.id].cost
                if (tmp[this.layer].buyables[this.id].canAfford) {
                    if (!hasMilestone("f",19)) player.f.casualty = player.f.casualty.sub(cost).max(0)	
                    player.f.cd[5] = player.f.cd[5].add(1).max(1)
                    player[this.layer].buyables[this.id] = player[this.layer].buyables[this.id].add(1).max(1)
                }
            },
            buyMax(b) { 
                let cost = this.cost()
                let f = player.f.casualty.max(1)
                let max = f.div("1e575").log10().div(25).ceil()
                let diff = max.sub(player.f.cd[5]).min(b)
                cost = Decimal.sub(1,Decimal.pow(1e25,max)).div(-1e25).mul("1e575")
                if (tmp[this.layer].buyables[this.id].canAfford) {
                    if (!hasMilestone("f",19)) player.f.casualty = player.f.casualty.sub(cost).max(0)	
                    player.f.cd[5] = player.f.cd[5].add(diff)
                    player[this.layer].buyables[this.id] = player[this.layer].buyables[this.id].add(diff)
                }
            },
            style: {'height':'180px', 'width':'180px',
                "background-color"() {
                    let color = "#bf8f8f"
                    if (tmp.f.buyables[82].canAfford) color = "#3d2963"
                    return color
                }
            },
        },
        83: {
			title: "Casualty Dimension 7",
			cost() { // cost for buying xth buyable, can be an object if there are multiple currencies
                let x=player.f.cd[6]
                let cost = Decimal.pow(1e30, x).mul("1e790")
                return cost.floor()
            },
            base() { 
                let base = tmp.f.cmultpd.pow(tmp.f.cmultExp)
                return base
            },
            gain(x=player[this.layer].buyables[this.id]) {
                let gain = this.effect().mul(x).div(10)
                return gain
            },
            total() {
                let total = getBuyableAmount("f", 83)
                return total
            },
            bought() {
                let bought = player.f.cd[6]
                return bought
            },
			effect() { // Effects of owning x of the items, x is a decimal
                let x = tmp[this.layer].buyables[this.id].bought
                let base = tmp[this.layer].buyables[this.id].base
                let eff = Decimal.pow(base, x).mul(tmp.f.cDimMult)
                return eff;
            },
            display() { // Everything else displayed in the buyable button after the title
                if (player.tab != "f" || player.subtabs.f.mainTabs != "Casualty Dimensions") return 
                return "Produces Casualty Dimension 6.\n\
                Cost: " + format(tmp[this.layer].buyables[this.id].cost)+" casualty\n\
                Multiplier: " + format(tmp[this.layer].buyables[this.id].effect)+"x\n\
                Amount: " + formatWhole(this.total()) + "(" + formatWhole(this.bought()) + ")"
            },
            unlocked() { return player.f.best.gte("e2830000") || getBuyableAmount("f", 83).gte(1) }, 
            canAfford() {
                    return player.f.casualty.gte(tmp[this.layer].buyables[this.id].cost)},
            buy() { 
                cost = tmp[this.layer].buyables[this.id].cost
                if (tmp[this.layer].buyables[this.id].canAfford) {
                    if (!hasMilestone("f",19)) player.f.casualty = player.f.casualty.sub(cost).max(0)	
                    player.f.cd[6] = player.f.cd[6].add(1).max(1)
                    player[this.layer].buyables[this.id] = player[this.layer].buyables[this.id].add(1).max(1)
                }
            },
            buyMax(b) { 
                let cost = this.cost()
                let f = player.f.casualty.max(1)
                let max = f.div("1e790").log10().div(30).ceil()
                let diff = max.sub(player.f.cd[6]).min(b)
                cost = Decimal.sub(1,Decimal.pow(1e30,max)).div(-1e30).mul("1e790")
                if (tmp[this.layer].buyables[this.id].canAfford) {
                    if (!hasMilestone("f",19)) player.f.casualty = player.f.casualty.sub(cost).max(0)	
                    player.f.cd[6] = player.f.cd[6].add(diff)
                    player[this.layer].buyables[this.id] = player[this.layer].buyables[this.id].add(diff)
                }
            },
            style: {'height':'180px', 'width':'180px',
                "background-color"() {
                    let color = "#bf8f8f"
                    if (tmp.f.buyables[83].canAfford) color = "#3d2963"
                    return color
                }
            },
        },
        84: {
			title: "Casualty Dimension 8",
			cost() { // cost for buying xth buyable, can be an object if there are multiple currencies
                let x=player.f.cd[7]
                let cost = Decimal.pow(1e40, x).mul("1e1905")
                return cost.floor()
            },
            base() { 
                let base = tmp.f.cmultpd.pow(tmp.f.cmultExp)
                return base
            },
            gain(x=player[this.layer].buyables[this.id]) {
                let gain = this.effect().mul(x).div(10)
                return gain
            },
            total() {
                let total = getBuyableAmount("f", 84)
                return total
            },
            bought() {
                let bought = player.f.cd[7]
                return bought
            },
			effect() { // Effects of owning x of the items, x is a decimal
                let x = tmp[this.layer].buyables[this.id].bought
                let base = tmp[this.layer].buyables[this.id].base
                let eff = Decimal.pow(base, x).mul(tmp.f.cDimMult)
                return eff;
            },
            display() { // Everything else displayed in the buyable button after the title
                if (player.tab != "f" || player.subtabs.f.mainTabs != "Casualty Dimensions") return 
                return "Produces Casualty Dimension 7.\n\
                Cost: " + format(tmp[this.layer].buyables[this.id].cost)+" casualty\n\
                Multiplier: " + format(tmp[this.layer].buyables[this.id].effect)+"x\n\
                Amount: " + formatWhole(this.total()) + "(" + formatWhole(this.bought()) + ")"
            },
            unlocked() { return player.f.best.gte("e6750000") || getBuyableAmount("f", 84).gte(1) }, 
            canAfford() {
                    return player.f.casualty.gte(tmp[this.layer].buyables[this.id].cost)},
            buy() { 
                cost = tmp[this.layer].buyables[this.id].cost
                if (tmp[this.layer].buyables[this.id].canAfford) {
                    if (!hasMilestone("f",19)) player.f.casualty = player.f.casualty.sub(cost).max(0)	
                    player.f.cd[7] = player.f.cd[7].add(1).max(1)
                    player[this.layer].buyables[this.id] = player[this.layer].buyables[this.id].add(1).max(1)
                }
            },
            buyMax(b) { 
                let cost = this.cost()
                let f = player.f.casualty.max(1)
                let max = f.div("1e1905").log10().div(40).ceil()
                let diff = max.sub(player.f.cd[7]).min(b)
                cost = Decimal.sub(1,Decimal.pow(1e40,max)).div(-1e40).mul("1e1905")
                if (tmp[this.layer].buyables[this.id].canAfford) {
                    if (!hasMilestone("f",19)) player.f.casualty = player.f.casualty.sub(cost).max(0)	
                    player.f.cd[7] = player.f.cd[7].add(diff)
                    player[this.layer].buyables[this.id] = player[this.layer].buyables[this.id].add(diff)
                }
            },
            style: {'height':'180px', 'width':'180px',
                "background-color"() {
                    let color = "#bf8f8f"
                    if (tmp.f.buyables[84].canAfford) color = "#3d2963"
                    return color
                }
            },
        },
        91: {
			title: "Casual Replicate Multiplier",
			cost(x=player[this.layer].buyables[this.id]) { // cost for buying xth buyable, can be an object if there are multiple currencies
                let cost = Decimal.pow(1e25, x).mul("1e470")
                return cost.floor()
            },
            total() {
                let total = getBuyableAmount("f", 91)
                return total
            },
			base() { // Effects of owning x of the items, x is a decimal
                let x = this.total().div(20).add(1).max(1)
                return x;
            },
            effect() {
                let eff = this.base()
                if (hasFUpg(183)) eff = eff.pow(getFUpgEff(183))
                return eff
            },
            max() {
                let max = new Decimal(100)
                if (hasFUpg(183)) max = Decimal.tetrate(10,1.79e308)
                return max
            },
            display() { // Everything else displayed in the buyable button after the title
                let dis = "Increase the replicate multiplier."
                if (player.tab != "f" || player.subtabs.f.mainTabs != "Casuals") return 
                if (this.total().gte(this.max())) dis += " (MAXED)"
                return dis + "\n\
                Cost: " + format(tmp[this.layer].buyables[this.id].cost)+" casualty\n\
                Multiplier: " + format(tmp[this.layer].buyables[this.id].effect)+"x\n\
                Amount: " + formatWhole(this.total())
            },
            unlocked() { return hasMilestone("f",17) }, 
            canAfford() {
                    return player.f.casualty.gte(tmp[this.layer].buyables[this.id].cost) && this.total().lt(this.max())},
            buy() { 
                cost = tmp[this.layer].buyables[this.id].cost
                if (tmp[this.layer].buyables[this.id].canAfford) {
                    if (!hasFUpg(183)) player.f.casualty = player.f.casualty.sub(cost).max(0)	
                    player[this.layer].buyables[this.id] = player[this.layer].buyables[this.id].add(1).max(1)
                }
            },
            buyMax() { 
                let cost = this.cost()
                let f = player.f.casualty.max(1)
                let max = f.div("e470").log10().div(25).ceil()
                let diff = max.sub(this.total())
                cost = Decimal.sub(1,Decimal.pow(1e25,diff)).div(-1e25).mul(cost)
                if (tmp[this.layer].buyables[this.id].canAfford) {
                    if (!hasFUpg(183)) player.f.casualty = player.f.casualty.sub(cost).max(0)	
                    player[this.layer].buyables[this.id] = player[this.layer].buyables[this.id].add(diff)
                }
            },
            style: {'height':'180px', 'width':'180px',
                "background-color"() {
                    let color = "#bf8f8f"
                    if (tmp.f.buyables[91].canAfford) color = "#3d2963"
                    return color
                }
            },
        },
        92: {
			title: "Casual Replicate Interval",
			cost(x=player[this.layer].buyables[this.id]) { // cost for buying xth buyable, can be an object if there are multiple currencies
                let cost = Decimal.pow(1e15, x).mul("1e475")
                if (x.gte(44)) cost = Decimal.pow(1e15,Decimal.pow(1.1,x.sub(44))).mul("e1120")
                return cost.floor()
            },
            max() {
                let max = new Decimal(0.02)
                if (hasFUpg(133)) max = max.div(20)
                if (hasFUpg(182)) max = Decimal.tetrate(10,1.79e308).pow(-1)
                if (hasMilestone("ct",0)) max = max.div(10)
                return max
            },
            total() {
                let total = getBuyableAmount("f", 92)
                return total
            },
            effect() {
                let x = this.total()
                let eff = Decimal.pow(0.9,x)
                if (hasFUpg(131)) eff = eff.div(getFUpgEff(131))
                if (hasFUpg(132)) eff = eff.div(getFUpgEff(132))
                if (hasMilestone("ct",0)) eff = eff.div(10)
                if (hasUpgrade("Up",73)) eff = eff.div(tmp.Up.upgrades[73].effect)
                return eff.max(this.max())
            },
			interval() { // Effects of owning x of the items, x is a decimal
                let eff = this.effect()
                return eff.mul(this.scale());
            },
            scale() {
                let scale = decimalOne
                let base = new Decimal(1.2)
                if (hasFUpg(184)) base = getFUpgEff(184)
                if (player.f.casuals.gte(Decimal.pow(10,tmp.f.int).mul(1.8))) scale = scale.mul(Decimal.pow(base,player.f.casuals.log10().sub(tmp.f.int).div(tmp.f.int))).mul(10)
                return scale
            },
            display() { // Everything else displayed in the buyable button after the title
                let dis = "Reduce the replicate interval."
                if (player.tab != "f" || player.subtabs.f.mainTabs != "Casuals") return 
                if (this.effect().lte(this.max())) dis += " (MAXED)"
                return dis + "\n\
                Cost: " + format(tmp[this.layer].buyables[this.id].cost)+" casualty\n\
                Interval: " + formatTimeLong(tmp[this.layer].buyables[this.id].interval)+"\n\
                Amount: " + formatWhole(this.total())
            },
            unlocked() { return hasMilestone("f",17) }, 
            canAfford() {
                    return player.f.casualty.gte(tmp[this.layer].buyables[this.id].cost) && this.effect().gt(this.max()) },
            buy() { 
                cost = tmp[this.layer].buyables[this.id].cost
                if (tmp[this.layer].buyables[this.id].canAfford) {
                    player.f.casualty = player.f.casualty.sub(cost).max(0)	
                    player[this.layer].buyables[this.id] = player[this.layer].buyables[this.id].add(1).max(1)
                }
            },
            buyMax() { 
                let cost = this.cost() // log1.1(log10(cost/e1120)/15)+44 =
                let f = player.f.casualty.max(1).max(10)
                let max = f.div("e470").log10().div(15).ceil().min(44)
                if (max.gte(44)) max = f.div("e1120").max(10).log10().div(15).log(1.1).add(45).floor()
                let diff = max.sub(this.total())
                cost = Decimal.sub(1,Decimal.pow(1e15,diff)).div(-1e15).mul(cost)
                if (tmp[this.layer].buyables[this.id].canAfford) {
                    if (!hasFUpg(182)) player.f.casualty = player.f.casualty.sub(cost).max(0)	
                    player[this.layer].buyables[this.id] = player[this.layer].buyables[this.id].add(diff)
                }
            },
            style: {'height':'180px', 'width':'180px',
                "background-color"() {
                    let color = "#bf8f8f"
                    if (tmp.f.buyables[92].canAfford) color = "#3d2963"
                    return color
                }
            },
        },
        93: {
			title() {
                let x=player[this.layer].buyables[this.id]
                let dis = ""
                if (x.gte(600)) dis = "Distant "
                if (x.gte(100000)) dis = "Social Distant "
                dis += "Casual Replicated Boosts"
                return dis
            },
			cost(x=player[this.layer].buyables[this.id]) { // cost for buying xth buyable, can be an object if there are multiple currencies
                let cost = Decimal.pow(1e25, x).mul(Decimal.pow(1e5,(x.pow(2).add(x).div(2)))).mul("1e750")
                let s = x.sub(100)
                if (x.gte(1e5)) x = Decimal.pow(1.0001,x.sub(1e5)).mul(1e5)
                if (x.gte(100)) cost = Decimal.pow("e775", s).mul(Decimal.pow(1e55,(s.pow(2).add(s).div(2)))).mul("e28500")
                if (x.gte(600)) cost = Decimal.pow("e775",x.sub(600).pow(3)).mul("e7304750")
                return cost.floor()
            },
            total() {
                let total = getBuyableAmount("f", 93)
                return total
            },
			effect() { // Effects of owning x of the items, x is a decimal
                let x = this.total()
                let eff = x
                return eff;
            },
            display() { // Everything else displayed in the buyable button after the title
                let dis = "Increase the max Replicated Boosts."
                if (player.tab != "f" || player.subtabs.f.mainTabs != "Casuals") return 
                return dis + "\n\
                Cost: " + format(tmp[this.layer].buyables[this.id].cost)+" casualty\n\
                Max: " + formatWhole(tmp[this.layer].buyables[this.id].effect)+"\n\
                Amount: " + formatWhole(this.total())
            },
            unlocked() { return hasMilestone("f",17) }, 
            canAfford() {
                    return player.f.casualty.gte(tmp[this.layer].buyables[this.id].cost) },
            buy() { 
                cost = tmp[this.layer].buyables[this.id].cost
                if (tmp[this.layer].buyables[this.id].canAfford) {
                    if (!hasMilestone("ct",20)) player.f.casualty = player.f.casualty.sub(cost).max(0)	
                    player[this.layer].buyables[this.id] = player[this.layer].buyables[this.id].add(1).max(1)
                }
            },
            buyMax() { 
                let f = player.f.casualty.max(1)
                let max = f.log10().mul(8).sub(5395).mul(5).pow(0.5).sub(55).div(10).floor().add(1).max(1).min(100)
                if (max.gte(100)) max = f.log10().mul(440).sub(9963975).pow(0.5).sub(1605).div(110).floor().add(101).min(600)
                if (max.gte(600)) max = Decimal.log10(f.div("e7304750")).div(775).pow(Decimal.pow(3,-1)).floor().add(601)
                if (max.gte(1e5)) max = max.div(1e5).log(1.0001).add(100001).floor()
                let diff = max.sub(player.f.buyables[93])
                if (tmp[this.layer].buyables[this.id].canAfford) {
                    player[this.layer].buyables[this.id] = player[this.layer].buyables[this.id].add(diff)
                }
            },
            style: {'height':'180px', 'width':'180px',
                "background-color"() {
                    let color = "#bf8f8f"
                    if (tmp.f.buyables[93].canAfford) color = "#3d2963"
                    return color
                }
            },
        },
        101: {
			title: "Virus Gain",
			cost(x=player[this.layer].buyables[this.id]) { // cost for buying xth buyable, can be an object if there are multiple currencies
                let cost = Decimal.pow(10, x.pow(1.2)).mul(1e45)
                return cost.floor()
            },
            base() { 
                let base = decimalTen
                if (hasFUpg(177)) base = base.add(getFUpgEff(177))
                if (hasFUpg(186)) base = base.add(getFUpgEff(186))
                return base
            },
            extra() {
                let extra = decimalZero
                return extra
            },
            total() {
                let total = getBuyableAmount("f", 101).add(tmp[this.layer].buyables[this.id].extra)
                return total
            },
			effect() { // Effects of owning x of the items, x is a decimal
                let x = tmp[this.layer].buyables[this.id].total
                let base = tmp[this.layer].buyables[this.id].base
                return Decimal.pow(base, x);
            },
			display() { // Everything else displayed in the buyable button after the title
                let extra = ""
                if (player.tab != "f" || player.subtabs.f.mainTabs != "Casual Virus") return 
                return "Multiply Casual Virus gain by "+format(this.base())+".\n\
                Cost: " + format(tmp[this.layer].buyables[this.id].cost)+" casual viruses\n\
                Effect: " + format(tmp[this.layer].buyables[this.id].effect)+"x\n\
                Amount: " + formatWhole(getBuyableAmount("f",101)) + extra
            },
            unlocked() { return hasMilestone("f", 21) }, 
            canAfford() {
                    return player.f.virus.gte(tmp[this.layer].buyables[this.id].cost)},
            buy() { 
                cost = tmp[this.layer].buyables[this.id].cost
                if (tmp[this.layer].buyables[this.id].canAfford) {
                    if (!hasMilestone("e",0)) player.f.virus = player.f.virus.sub(cost).max(0)	
                    player[this.layer].buyables[this.id] = player[this.layer].buyables[this.id].add(1).max(1)
                }
            },
            buyMax(max) {
                let c = player.f.virus
                let target = Decimal.log10(c.div(1e45)).pow(Decimal.pow(1.2,-1))
                target = target.ceil()
                let cost = Decimal.pow(10, target.sub(1).pow(1.2)).mul(1e45)
                let diff = target.sub(player.f.buyables[101])
                if (tmp[this.layer].buyables[this.id].canAfford) {
                    if (!hasMilestone("e",0)) player.f.virus = player.f.virus.sub(cost).max(0)
                    if (diff.gt(max)) diff = max
                    player.f.buyables[101] = player.f.buyables[101].add(diff)
                }
            },
            style: {'height':'180px', 'width':'180px',
                "background-color"() {
                    let color = "#bf8f8f"
                    if (tmp.f.buyables[101].canAfford) color = "#3d2963"
                    return color
                }
            },
        },
        102: {
			title: "Virus Exponent",
			cost(x=player[this.layer].buyables[this.id]) { // cost for buying xth buyable, can be an object if there are multiple currencies
                let cost = Decimal.pow(30, x.pow(1.3)).mul(1e55)
                return cost.floor()
            },
            base() { 
                let base = new Decimal(0.15)
                if (hasFUpg(187)) base = base.add(getFUpgEff(187))
                return base
            },
            extra() {
                let extra = decimalZero
                return extra
            },
            total() {
                let total = getBuyableAmount("f", 102).add(tmp[this.layer].buyables[this.id].extra)
                return total
            },
			effect() { // Effects of owning x of the items, x is a decimal
                let x = tmp[this.layer].buyables[this.id].total
                let base = tmp[this.layer].buyables[this.id].base
                let eff = Decimal.mul(base, x)
                let exp = new Decimal(0.2)
                if (hasUpgrade("e",76)) exp = exp.add(0.35)
                if (eff.gte(250)) eff = eff.div(250).pow(exp).mul(250)
                return eff;
            },
			display() { // Everything else displayed in the buyable button after the title
                let extra = ""
                if (player.tab != "f" || player.subtabs.f.mainTabs != "Casual Virus") return 
                let dis =  format(tmp[this.layer].buyables[this.id].effect)
                if (this.effect().gte(250)) dis += " (softcapped)"
                return "Increase Casual Virus gain exponent by "+format(this.base()) + ".\n\
                Cost: " + format(tmp[this.layer].buyables[this.id].cost)+" casual viruses\n\
                Effect: +" + dis +"\n\
                Amount: " + formatWhole(getBuyableAmount("f",102)) + extra
            },
            unlocked() { return hasFUpg(173) }, 
            canAfford() {
                    return player.f.virus.gte(tmp[this.layer].buyables[this.id].cost)},
            buy() { 
                cost = tmp[this.layer].buyables[this.id].cost
                if (tmp[this.layer].buyables[this.id].canAfford) {
                    if (!hasMilestone("e",0)) player.f.virus = player.f.virus.sub(cost).max(0)	
                    player[this.layer].buyables[this.id] = player[this.layer].buyables[this.id].add(1).max(1)
                }
            },
            buyMax(max) {
                let c = player.f.virus
                let target = Decimal.log10(c.div(1e55)).div(Decimal.log10(30)).pow(Decimal.pow(1.3,-1))
                target = target.ceil()
                let cost = Decimal.pow(30, target.sub(1).pow(1.3)).mul(1e55)
                let diff = target.sub(player.f.buyables[102])
                if (tmp[this.layer].buyables[this.id].canAfford) {
                    if (!hasMilestone("e",0)) player.f.virus = player.f.virus.sub(cost).max(0)
                    if (diff.gt(max)) diff = max
                    player.f.buyables[102] = player.f.buyables[102].add(diff)
                }
            },
            style: {'height':'180px', 'width':'180px',
                "background-color"() {
                    let color = "#bf8f8f"
                    if (tmp.f.buyables[102].canAfford) color = "#3d2963"
                    return color
                }
            },
        },
        103: {
			title: "Self Booster",
			cost(x=player[this.layer].buyables[this.id]) { // cost for buying xth buyable, can be an object if there are multiple currencies
                let cost = Decimal.pow(this.scalebase(), x.pow(1.5)).mul(4e72)
                return cost.floor()
            },
            scalebase() {
                let base = new Decimal(1e6)
                if (hasUpgrade("e",34)) base = base.div(upgradeEffect("e",34))
                return base
            },
            base() { 
                let base = player.f.virus.add(10).max(10)
                base = base.log10().add(10).max(10)
                base = base.log10().div(10)
                return base
            },
            extra() {
                let extra = decimalZero
                return extra
            },
            total() {
                let total = getBuyableAmount("f", 103).add(tmp[this.layer].buyables[this.id].extra)
                return total
            },
			effect() { // Effects of owning x of the items, x is a decimal
                let x = tmp[this.layer].buyables[this.id].total
                let base = tmp[this.layer].buyables[this.id].base
                let s = new Decimal(100)
                if (hasUpgrade("e",34)) s = s.add(400)
                if (hasUpgrade("e",56)) s = s.add(1000)
                if (x.gte(s) && !hasUpgrade("e",154)) x = x.div(s).pow(0.3).mul(s)
                return Decimal.mul(base, x).add(1).max(1);
            },
			display() { // Everything else displayed in the buyable button after the title
                let extra = ""
                if (player.tab != "f" || player.subtabs.f.mainTabs != "Casual Virus") return 
                let dis = format(tmp[this.layer].buyables[this.id].effect)
                let s = new Decimal(100)
                if (hasUpgrade("e",34)) s = s.add(400)
                if (hasUpgrade("e",56)) s = s.add(1000)
                if (this.total().gte(s) && !hasUpgrade("e",154)) dis += " (softcapped)"
                return "Raise 'Self Casual Boost' to (1+"+format(this.base())+"x) (based on Casual Viruses).\n\
                Cost: " + format(tmp[this.layer].buyables[this.id].cost)+" casual viruses\n\
                Effect: ^" + dis +"\n\
                Amount: " + formatWhole(getBuyableAmount("f",103)) + extra
            },
            unlocked() { return hasFUpg(176) }, 
            canAfford() {
                    return player.f.virus.gte(tmp[this.layer].buyables[this.id].cost)},
            buy() { 
                cost = tmp[this.layer].buyables[this.id].cost
                if (tmp[this.layer].buyables[this.id].canAfford) {
                    if (!hasMilestone("e",0)) player.f.virus = player.f.virus.sub(cost).max(0)	
                    player[this.layer].buyables[this.id] = player[this.layer].buyables[this.id].add(1).max(1)
                }
            },
            buyMax(max) {
                let c = player.f.virus
                let target = Decimal.log10(c.div(4e72)).div(Decimal.log10(this.scalebase())).pow(Decimal.pow(1.5,-1))
                target = target.ceil()
                let cost = Decimal.pow(this.scalebase(), target.sub(1).pow(1.5)).mul(4e72)
                let diff = target.sub(player.f.buyables[103])
                if (tmp[this.layer].buyables[this.id].canAfford) {
                    if (!hasMilestone("e",0)) player.f.virus = player.f.virus.sub(cost).max(0)
                    if (diff.gt(max)) diff = max
                    player.f.buyables[103] = player.f.buyables[103].add(diff)
                }
            },
            style: {'height':'180px', 'width':'180px',
                "background-color"() {
                    let color = "#bf8f8f"
                    if (tmp.f.buyables[103].canAfford) color = "#3d2963"
                    return color
                }
            },
        },
    },
    upgrades: {
        rows: 18,
        cols: 7,
        11: {
            title: "Lethality",
            description: "Symptoms boost severity after softcap at reduced effect.",
            cost: decimalFour,
            effect() {
                let eff = Decimal.pow(10,tmp.s.effbase.pow(player.s.points).log10().pow(0.75))
                return eff
            },
            effectDisplay() {
                return format(getFUpgEff(11)) + "x"
            }
        },
        12: {
            title: "Deadliness",
            description: "Deaths boost fatality gain.",
            cost: new Decimal(25),
            effect() {
                let eff = player.d.points.add(10).max(10)
                eff = eff.log10().pow(0.2)
                return eff
            },
            effectDisplay() {
                return format(getFUpgEff(12)) + "x"
            },
            unlocked() {
                return hasFUpg(11)
            }
        },
        13: {
            title: "Mortality",
            description: "'Asymptomatic' reward is applied after softcap at reduced effect.",
            cost: new Decimal(200),
            effect() {
                let eff = challengeEffect("s", 11)
                eff = eff.pow(0.2)
                if (eff.gte("e5e12")) eff = Decimal.pow(10,eff.div("e5e12").log10().pow(0.9)).mul("e5e12")
                if (eff.gte("ee19")) eff = Decimal.pow(10,eff.div("ee19").log10().pow(0.9)).mul("ee19")
                if (eff.gte("ee24")) eff = Decimal.pow(10,eff.div("ee24").log10().pow(0.88)).mul("ee24")
                if (eff.gte("ee45")) eff = Decimal.pow(10,eff.div("ee45").log10().pow(0.85)).mul("ee45")
                if (eff.gte("ee200")) eff = Decimal.pow(10,eff.div("ee200").log10().pow(0.8)).mul("ee200")
                return eff
            },
            effectDisplay() {
                let dis = format(getFUpgEff(13)) + "x"
                if (this.effect().gte("e5e12")) dis += " (softcapped)"
                return dis
            },
            unlocked() {
                return hasFUpg(12)
            }
        },
        14: {
            title: "Fatally",
            description: "Cases boost fatality gain.",
            cost: new Decimal(500),
            effect() {
                let eff = player.points.add(10).max(10)
                eff = eff.log10().pow(0.075)
                if (hasFUpg(143)) eff = eff.tetrate(getFUpgEff(143))
                if (eff.gte(Decimal.pow(10,1e8))) eff = Decimal.pow(10,eff.div(Decimal.pow(10,1e8)).log10().pow(0.8)).mul(Decimal.pow(10,1e8))
                if (eff.gte("ee9")) eff = eff.log10().mul(10).pow(1e8)
                return eff
            },
            effectDisplay() {
                let dis = format(getFUpgEff(14)) + "x"
                if (this.effect().gte(Decimal.pow(10,1e8))) dis += " (softcapped)"
                return dis
            },
            unlocked() {
                return hasFUpg(13)
            }
        },
        15: {
            title: "Fatalness",
            description: "Fatality 1st effect is applied after softcap and is stronger based on deaths.",
            cost: new Decimal(2500),
            effect() {
                let eff = player.d.points.add(10).max(10)
                eff = eff.log10().add(10).max(10)
                eff = eff.log10().pow(2.5)
                return eff
            },
            effectDisplay() {
                return "^"+format(getFUpgEff(15))
            },
            unlocked() {
                return hasFUpg(14)
            }
        },
        21: {
            title: "Severely",
            description: "Fatality boosts severity gain exponent and unlock 3 more symptom buyables.",
            cost: new Decimal(5000),
            effect() {
                let eff = player.f.points.add(10).max(10)
                eff = eff.log10().add(10).max(10)
                eff = eff.log10().pow(0.25)
                return eff
            },
            effectDisplay() {
                return "^"+format(getFUpgEff(21))
            },
            unlocked() {
                return hasFUpg(15)
            }
        },
        22: {
            title: "Severer",
            description: "Severity boosts fatality gain.",
            cost: new Decimal(8000),
            effect() {
                let eff = player.s.severity.add(10).max(10)
                eff = eff.pow("3e-7")
                if (eff.gte(1e30)) eff = Decimal.pow(10,eff.div(1e30).log10().pow(0.4)).mul(1e30)
                if (eff.gte("e40000")) eff = Decimal.pow(10,eff.div("e40000").log10().pow(0.8)).mul("e40000")
                if (eff.gte("e100000")) eff = eff.log10().pow(2e4)
                return eff
            },
            effectDisplay() {
                let dis = format(getFUpgEff(22))+"x"
                if (getFUpgEff(22).gte(1e30)) dis += " (softcapped)"
                return dis
            },
            unlocked() {
                return hasFUpg(21)
            }
        },
        23: {
            title: "Deadlier",
            description: "Fatality boosts death gain.",
            cost: new Decimal(30000),
            effect() {
                let eff = player.f.points.add(1).max(1)
                eff = Decimal.pow(10,eff.log10().pow(1.75)).pow(15)
                return eff
            },
            effectDisplay() {
                return format(getFUpgEff(23))+"x"
            },
            unlocked() {
                return hasFUpg(22)
            }
        },
        24: {
            title: "Infectious",
            description: "Infectivity boosts fatality gain.",
            cost: new Decimal(55555),
            effect() {
                let eff = player.i.points.add(1).max(1)
                eff = Decimal.pow(10,eff.log10().pow(0.2)).pow(0.005)
                if (eff.gte(Decimal.pow(10,1e3))) eff = Decimal.pow(10,eff.div(Decimal.pow(10,1e3)).log10().pow(0.7)).mul(Decimal.pow(10,1e3))
                if (eff.gte("e30000")) eff = Decimal.pow(10,eff.div("e30000").log10().pow(0.8)).mul("e30000")
                if (eff.gte("e100000")) eff = eff.log10().pow(2e4)
                return eff
            },
            effectDisplay() {
                let dis = format(getFUpgEff(24))+"x"
                if (getFUpgEff(24).gte(Decimal.pow(10,1e3))) dis += " (softcapped)"
                return dis
            },
            unlocked() {
                return hasFUpg(23)
            }
        },
        25: {
            title: "More Fatal",
            description: "Add 1 to base fatality gain exponent and autobuy death buyables 100 per second.",
            cost: new Decimal(6e6),
            unlocked() {
                return hasFUpg(24)
            }
        },
        31: {
            title: "Fataler",
            description: "Infectivity boosts 'Fatal'.",
            cost: new Decimal(1e8),
            effect() {
                let eff = player.i.points.add(10).max(10)
                eff = eff.log10().pow(0.13)
                if (eff.gte(Decimal.pow(10,1e20))) eff = eff.div(Decimal.pow(10,1e20)).log10().pow(0.8).pow10().mul(Decimal.pow(10,1e20))
                if (eff.gte("ee24")) eff = eff.div("ee24").log10().pow(0.8).pow10().mul("ee24")
                return eff
            },
            effectDisplay() {
                return "^"+format(getFUpgEff(31))
            },
            unlocked() {
                return hasFUpg(25)
            }
        },
        32: {
            title: "Fatalest",
            description: "Cases add to the fatality exponent.",
            cost: new Decimal(1e9),
            effect() {
                let eff = player.points.add(10).max(10)
                eff = eff.log10().add(10).max(10)
                eff = eff.log10().pow(0.175)
                return eff
            },
            effectDisplay() {
                return "+"+format(getFUpgEff(32))
            },
            unlocked() {
                return hasFUpg(31)
            }
        },
        33: {
            title: "Fatal Infection",
            description: "Fatality power boosts 'Infection'.",
            cost: new Decimal(3e13),
            effect() {
                let eff = player.f.p.max(0).add(10).max(10)
                eff = eff.log10().pow(0.75)
                return eff
            },
            effectDisplay() {
                return "^"+format(getFUpgEff(33))
            },
            unlocked() {
                return hasMilestone("f", 6)
            }
        },
        34: {
            title: "Powerful Fatalities",
            description: "Fatality boosts fatality power gain.",
            cost: new Decimal(2e14),
            effect() {
                let eff = player.f.points.add(1).max(1)
                eff = eff.pow(0.07)
                if (eff.gte("e15000")) eff = eff.div("e15000").pow(0.2).mul("e15000")
                if (eff.gte("ee50")) eff = Decimal.pow(10,eff.div("ee50").log10().pow(0.88)).mul("ee50")
                return eff
            },
            effectDisplay() {
                let dis = format(getFUpgEff(34))+"x"
                if (getFUpgEff(34).gte("e15000")) dis += " (softcapped)"
                return dis
            },
            unlocked() {
                return hasFUpg(33)
            }
        },
        35: {
            title: "Death Dimension",
            description: "Deaths boost fatality dimensions.",
            cost: new Decimal(4e16),
            effect() {
                let eff = player.d.points.add(10).max(10)
                eff = eff.log10().pow(0.13)
                return eff
            },
            effectDisplay() {
                return format(getFUpgEff(35))+"x"
            },
            unlocked() {
                return hasFUpg(34)
            }
        },
        41: {
            title: "Case Dimension",
            description: "Cases boost fatality dimensions.",
            cost: new Decimal(1e23),
            effect() {
                let eff = player.points.add(10).max(10)
                eff = eff.log10().add(10).max(10)
                eff = eff.log10()
                return eff
            },
            effectDisplay() {
                return format(getFUpgEff(41))+"x"
            },
            unlocked() {
                return hasFUpg(35)
            }
        },
        42: {
            title: "Powerful Power",
            description: "Fatality power boosts fatality exponent.",
            cost: new Decimal(3.5e35),
            effect() {
                let eff = player.f.p.add(10).max(10)
                eff = eff.log10().pow(0.2)
                return eff
            },
            effectDisplay() {
                return "+"+format(getFUpgEff(42))
            },
            unlocked() {
                return hasFUpg(41)
            }
        },
        43: {
            title: "Powerful Cases",
            description: "Fatality power boosts cases gain.",
            cost: new Decimal(4e40),
            effect() {
                let eff = player.f.p.add(10).max(10)
                eff = eff.log10().pow(0.14)
                if (eff.gte(Decimal.pow(10,1e24))) eff = eff.log10().mul(10).pow(4e22)
                return eff
            },
            effectDisplay() {
                return "^"+format(getFUpgEff(43))
            },
            unlocked() {
                return hasFUpg(42)
            }
        },
        44: {
            title: "Fatal Fatalities",
            description: "Fatality boosts cases gain.",
            cost: new Decimal(5.05e50),
            effect() {
                let eff = player.f.points.add(10).max(10)
                eff = eff.log10().pow(0.2)
                if (eff.gte(Decimal.pow(10,1e24))) eff = eff.log10().mul(10).pow(4e22)
                return eff
            },
            effectDisplay() {
                return "^"+format(getFUpgEff(44))
            },
            unlocked() {
                return hasFUpg(43)
            }
        },
        45: {
            title: "Deadly Power",
            description: "Fatality power boosts death gain.",
            cost: new Decimal(6.06e60),
            effect() {
                let eff = player.f.p.add(1).max(1)
                eff = eff.pow(1000)
                return eff
            },
            effectDisplay() {
                return format(getFUpgEff(45))+"x"
            },
            unlocked() {
                return hasFUpg(44)
            }
        },
        51: {
            title: "Fatal Deaths",
            description: "Deaths add to the fatality exponent.",
            cost: new Decimal(7.07e70),
            effect() {
                let eff = player.d.points.add(1).max(1)
                eff = eff.log10().pow(0.197)
                if (eff.gte(1e6)) eff = eff.log10().add(4).pow(6)
                if (eff.gte(1e10)) eff = eff.log10().pow(10)
                return eff
            },
            effectDisplay() {
                return "+"+format(getFUpgEff(51))
            },
            unlocked() {
                return hasFUpg(45)
            }
        },
        52: {
            title: "Severity Dimension",
            description: "Severity boosts fatality dimensions.",
            cost: new Decimal(1.62e162),
            effect() {
                let eff = player.s.severity.add(10).max(10)
                eff = eff.log10().pow(0.6)
                return eff
            },
            effectDisplay() {
                return format(getFUpgEff(52))+"x"
            },
            unlocked() {
                return hasFUpg(51)
            }
        },
        53: {
            title: "Infected Dimension",
            description: "Infectivity increases multiplier per dimension.",
            cost: new Decimal(2.06e206),
            effect() {
                let eff = player.i.points.add(10).max(10)
                eff = eff.log10().add(10).max(10)
                eff = eff.log10().pow(0.1).div(2)
                return eff
            },
            effectDisplay() {
                return "+"+format(getFUpgEff(53))
            },
            unlocked() {
                return hasFUpg(52)
            }
        },
        54: {
            title: "Uncoated Fatalities",
            description: "Fatality boosts uncoaters 1st effect.",
            cost: new Decimal(2.626e262),
            effect() {
                let eff = player.f.points.add(10).max(10)
                eff = eff.log10().pow(2.35)
                return eff
            },
            effectDisplay() {
                return "^"+format(getFUpgEff(54))
            },
            unlocked() {
                return hasFUpg(53)
            }
        },
        55: {
            title: "Uncoated Dimension",
            description: "Uncoaters boost fatality dimensions.",
            cost: new Decimal(2.75e275),
            effect() {
                let eff = player.u.points.add(1).max(1)
                eff = eff.pow(1.7)
                return eff
            },
            effectDisplay() {
                return format(getFUpgEff(55))+"x"
            },
            unlocked() {
                return hasFUpg(54)
            }
        },
        61: {
            title: "Replicated Dimension",
            description: "Replicators boost fatality dimensions.",
            cost: Decimal.pow(10,353).mul(3.535),
            effect() {
                let eff = player.r.points.add(1).max(1).pow(0.75)
                return eff
            },
            effectDisplay() {
                return format(getFUpgEff(61))+"x"
            },
            unlocked() {
                return hasFUpg(55)
            }
        },
        62: {
            title: "Replicated Power",
            description: "Replicators boost fatality power effect.",
            cost: Decimal.pow(10,505).mul(5.05),
            effect() {
                let eff = player.r.points.add(10).max(10).log10().div(7.45)
                if (eff.gte(1.2)) eff = eff.div(1.1).pow(0.5).mul(1.2)
                return eff.max(1)
            },
            effectDisplay() {
                return "^"+format(getFUpgEff(62))
            },
            unlocked() {
                return hasFUpg(61)
            }
        },
        63: {
            title: "Multiplied Fatalities",
            description: "Fatality adds to the Dimension Multiplier base.",
            cost: Decimal.pow(10,911).mul(9.111),
            effect() {
                let eff = player.f.points.add(10).max(10)
                eff = eff.log10().pow(0.05).div(50)
                return eff
            },
            effectDisplay() {
                return "+"+format(getFUpgEff(63))
            },
            unlocked() {
                return hasFUpg(62)
            }
        },
        64: {
            title: "Multiplied Cases",
            description: "Cases add to the Dimension Multiplier base.",
            cost: Decimal.pow(10,1158).mul(1.158),
            effect() {
                let eff = player.points.add(10).max(10)
                eff = eff.log10().pow(0.07).div(930)
                if (eff.gte(0.115)) eff = eff.div(0.115).pow(0.4).mul(0.115)
                if (eff.gte(0.3)) eff = eff.div(0.3).pow(0.1).mul(0.3)
                return eff.min(Decimal.pow(10,1e16))
            },
            effectDisplay() {
                return "+"+format(getFUpgEff(64))
            },
            unlocked() {
                return hasFUpg(63)
            }
        },
        65: {
            title: "Scaling Reduction",
            description: "Reduce the Dimension and Dimension Boost cost scaling by 1.",
            cost: Decimal.pow(10,1515).mul(1.515),
            unlocked() {
                return hasFUpg(64)
            }
        },
        71: {
            title: "8 Dimension Cases",
            description: "Fatality Dimension 8 gives 2 free 'Cases Boost'.",
            cost: Decimal.pow(10,1731).mul(1.731),
            effect() {
                let eff = getBuyableAmount("f",24).mul(2)
                if (eff.gte(1e5)) eff = eff.div(1e5).pow(0.33).mul(1e5)
                if (eff.gte(5e11) && inChallenge("ct",32)) eff = eff.div(5e11).pow(0.33).mul(5e11)
                if (eff.gte(1e60) && inChallenge("ct",32)) eff = eff.div(1e60).pow(0.75).mul(1e60)
                if (eff.gte(1e183) && inChallenge("ct",32)) eff = eff.div(1e183).pow(0.4).mul(1e183)
                if (eff.gte("e415") && inChallenge("ct",32)) eff = eff.log10().div(415).pow(0.7).mul(415).pow10()
                if (eff.gte("e967") && inChallenge("ct",32)) eff = eff.log10().div(967).pow(0.6).mul(967).pow10()
                if (eff.gte(Decimal.pow(10,2e5))) eff = eff.log10().div(2).pow(4e4)
                return eff.floor()
            },
            effectDisplay() {
                let dis = "+"+formatWhole(getFUpgEff(71))
                if (this.effect().gte(1e5)) dis += " (softcapped)"
                return dis
            },
            unlocked() {
                return hasFUpg(65)
            }
        },
        72: {
            title: "Boosted Boosts",
            description: "Multiply the Dimension Boost base by 2.",
            cost: Decimal.pow(10,2092).mul(2.092),
            unlocked() {
                return hasFUpg(71)
            }
        },
        73: {
            title: "BULK",
            description: "Reduce the Dimension cost scaling by 1 and autobuyers buy 1,000x more and 2x faster.",
            cost: Decimal.pow(10,2888).mul(2.888),
            unlocked() {
                return hasFUpg(72)
            }
        },
        74: {
            title: "Boost Scaling",
            description: "Reduce the Dimension Boost cost scaling by 0.5.",
            cost: Decimal.pow(10,3222).mul(3.222),
            unlocked() {
                return hasFUpg(73)
            }
        },
        75: {
            title: "Boost Boosters",
            description: "Multiply Dimension Boost base by 5 and Multiplier Boost is 1.125x stronger.",
            cost: Decimal.pow(10,4134).mul(4.134),
            unlocked() {
                return hasFUpg(74)
            }
        },
        81: {
            title: "Virus Dimension",
            description: "VP boosts fatality dimensions.",
            cost: decimalOne,
            currencyDisplayName: "casualty",
            currencyInternalName: "casualty",
            currencyLayer: "f",
            effect() {
                let eff = player.v.points.add(10).max(10)
                eff = eff.log10().pow(0.5)
                return eff
            },
            effectDisplay() {
                return format(getFUpgEff(81))+"x"
            },
            unlocked() {
                return hasMilestone("f",12)
            },
            style: {
                "background-color"() {
                    if (!hasFUpg(81)) {
                    let color = "#bf8f8f"
                    if (player.f.casualty.gte(1)) color = "#3d2963"
                    return color
                    }
                }
            }
        },
        82: {
            title: "Stronger Dimensions",
            description: "Increase the multiplier per Dimension by +0.3.",
            cost: decimalOne,
            currencyDisplayName: "casualty",
            currencyInternalName: "casualty",
            currencyLayer: "f",
            unlocked() {
                return hasMilestone("f",12)
            },
            style: {
                "background-color"() {
                    if (!hasFUpg(82)) {
                    let color = "#bf8f8f"
                    if (player.f.casualty.gte(1)) color = "#3d2963"
                    return color
                    }
                }
            }
        },
        91: {
            title: "Casualty 18",
            description: "Total casualty boosts Fatality Dimension 1 and 8.",
            cost: decimalOne,
            currencyDisplayName: "casualty",
            currencyInternalName: "casualty",
            currencyLayer: "f",
            effect() {
                let eff = player.f.casualtyTotal.add(1).max(1)
                eff = eff.pow(15)
                return eff.min(Decimal.pow(10,1e25))
            },
            effectDisplay() {
                return format(getFUpgEff(91))+"x"
            },
            unlocked() {
                return hasFUpg(81)
            },
            style: {
                "background-color"() {
                    if (!hasFUpg(91)) {
                    let color = "#bf8f8f"
                    if (player.f.casualty.gte(1)) color = "#3d2963"
                    return color
                    }
                }
            }
        },
        92: {
            title: "Casualty 27",
            description: "Total casualty boosts Fatality Dimension 2 and 7.",
            cost: decimalOne,
            currencyDisplayName: "casualty",
            currencyInternalName: "casualty",
            currencyLayer: "f",
            effect() {
                let eff = player.f.casualtyTotal.add(1).max(1)
                eff = eff.pow(15)
                return eff.min(Decimal.pow(10,1e25))
            },
            effectDisplay() {
                return format(getFUpgEff(92))+"x"
            },
            unlocked() {
                return hasFUpg(82)
            },
            style: {
                "background-color"() {
                    if (!hasFUpg(92)) {
                    let color = "#bf8f8f"
                    if (player.f.casualty.gte(1)) color = "#3d2963"
                    return color
                    }
                }
            }
        },
        101: {
            title: "Casualty 36",
            description: "Total casualty boosts Fatality Dimension 3 and 6.",
            cost: decimalOne,
            currencyDisplayName: "casualty",
            currencyInternalName: "casualty",
            currencyLayer: "f",
            effect() {
                let eff = player.f.casualtyTotal.add(1).max(1)
                eff = eff.pow(15)
                return eff.min(Decimal.pow(10,1e25))
            },
            effectDisplay() {
                return format(getFUpgEff(101))+"x"
            },
            unlocked() {
                return hasFUpg(91)
            },
            style: {
                "background-color"() {
                    if (!hasFUpg(101)) {
                    let color = "#bf8f8f"
                    if (player.f.casualty.gte(1)) color = "#3d2963"
                    return color
                    }
                }
            }
        },
        102: {
            title: "Casualty 45",
            description: "Total casualty boosts Fatality Dimension 4 and 5.",
            cost: decimalOne,
            currencyDisplayName: "casualty",
            currencyInternalName: "casualty",
            currencyLayer: "f",
            effect() {
                let eff = player.f.casualtyTotal.add(1).max(1)
                eff = eff.pow(15)
                return eff.min(Decimal.pow(10,1e25))
            },
            effectDisplay() {
                return format(getFUpgEff(92))+"x"
            },
            unlocked() {
                return hasFUpg(92)
            },
            style: {
                "background-color"() {
                    if (!hasFUpg(102)) {
                    let color = "#bf8f8f"
                    if (player.f.casualty.gte(1)) color = "#3d2963"
                    return color
                    }
                }
            }
        },
        111: {
            title: "Scaled Dimension",
            description: "Reduce the Dimension, and Multiplier Boost scaling by 1.",
            cost: decimalThree,
            currencyDisplayName: "casualty",
            currencyInternalName: "casualty",
            currencyLayer: "f",
            unlocked() {
                return hasFUpg(101)
            },
            style: {
                "background-color"() {
                    if (!hasFUpg(111)) {
                    let color = "#bf8f8f"
                    if (player.f.casualty.gte(3)) color = "#3d2963"
                    return color
                    }
                }
            }
        },
        112: {
            title: "Stronger Multipliers",
            description: "Multiplier Boosts are 1.3x stronger.",
            cost: decimalThree,
            currencyDisplayName: "casualty",
            currencyInternalName: "casualty",
            currencyLayer: "f",
            unlocked() {
                return hasFUpg(102)
            },
            style: {
                "background-color"() {
                    if (!hasFUpg(112)) {
                    let color = "#bf8f8f"
                    if (player.f.casualty.gte(3)) color = "#3d2963"
                    return color
                    }
                }
            }
        },
        83: {
            title: "Sacrificed Fatality",
            description: "Unlock Sacrifice.",
            cost: decimalFive,
            currencyDisplayName: "casualty",
            currencyInternalName: "casualty",
            currencyLayer: "f",
            unlocked() {
                return hasMilestone("f",12)
            },
            style: {
                "background-color"() {
                    if (!hasFUpg(83)) {
                    let color = "#bf8f8f"
                    if (player.f.casualty.gte(5)) color = "#3d2963"
                    return color
                    }
                }
            }
        },
        93: {
            title: "Dimension 55555",
            description: "Multiply Dimension Boost base by 5.",
            cost: new Decimal(7),
            currencyDisplayName: "casualty",
            currencyInternalName: "casualty",
            currencyLayer: "f",
            unlocked() {
                return hasFUpg(83)
            },
            style: {
                "background-color"() {
                    if (!hasFUpg(93)) {
                    let color = "#bf8f8f"
                    if (player.f.casualty.gte(7)) color = "#3d2963"
                    return color
                    }
                }
            }
        },
        103: {
            title: "Casualty Boost",
            description: "Casualty boosts Fatality Dimensions.",
            cost: decimalTen,
            currencyDisplayName: "casualty",
            currencyInternalName: "casualty",
            currencyLayer: "f",
            effect() {
                let eff = player.f.casualty.add(1).max(1)
                eff = eff.pow(20)
                return eff.min(Decimal.pow(10,1e25))
            },
            effectDisplay() {
                return format(getFUpgEff(103))+"x"
            },
            unlocked() {
                return hasFUpg(93)
            },
            style: {
                "background-color"() {
                    if (!hasFUpg(103)) {
                    let color = "#bf8f8f"
                    if (player.f.casualty.gte(10)) color = "#3d2963"
                    return color
                    }
                }
            }
        },
        113: {
            title: "Casualty Auto Gain",
            description: "Gain 50% of best casualty/min.",
            cost: new Decimal(15),
            currencyDisplayName: "casualty",
            currencyInternalName: "casualty",
            currencyLayer: "f",
            effect() {
                let eff = player.f.cpm.mul(0.5)
                return eff
            },
            effectDisplay() {
                let dis = format(getFUpgEff(113))+"/s"
                if (getFUpgEff(113).lt(10)) dis = format(getFUpgEff(113).mul(60))+"/min"
                return dis
            },
            unlocked() {
                return hasFUpg(103)
            },
            style: {
                "background-color"() {
                    if (!hasFUpg(113)) {
                    let color = "#bf8f8f"
                    if (player.f.casualty.gte(15)) color = "#3d2963"
                    return color
                    }
                }
            }
        },
        84: {
            title: "Scaled",
            description: "You start with 2 Dimension Shifts, Reduce Dimension scaling by 1, Dimension Boost scaling by 0.5.",
            cost: new Decimal(30),
            currencyDisplayName: "casualty",
            currencyInternalName: "casualty",
            currencyLayer: "f",
            unlocked() {
                return hasMilestone("f",12)
            },
            style: {
                "background-color"() {
                    if (!hasFUpg(84)) {
                    let color = "#bf8f8f"
                    if (player.f.casualty.gte(30)) color = "#3d2963"
                    return color
                    }
                }
            }
        },
        94: {
            title: "Powerful Casualties",
            description: "Fatality power boosts casualty gain.",
            cost: new Decimal(110),
            currencyDisplayName: "casualty",
            currencyInternalName: "casualty",
            currencyLayer: "f",
            effect() {
                let eff = player.f.p.add(10).max(10)
                eff = eff.log10().pow(0.2)
                return eff
            },
            effectDisplay() {
                return format(getFUpgEff(94))+"x"
            },
            unlocked() {
                return hasFUpg(84)
            },
            style: {
                "background-color"() {
                    if (!hasFUpg(94)) {
                    let color = "#bf8f8f"
                    if (player.f.casualty.gte(110)) color = "#3d2963"
                    return color
                    }
                }
            }
        },
        104: {
            title: "Casual Cases",
            description: "Cases boost casualty gain.",
            cost: new Decimal(2000),
            currencyDisplayName: "casualty",
            currencyInternalName: "casualty",
            currencyLayer: "f",
            effect() {
                let eff = player.points.add(10).max(10)
                eff = eff.log10().pow(0.02)
                return eff
            },
            effectDisplay() {
                return format(getFUpgEff(104))+"x"
            },
            unlocked() {
                return hasFUpg(94)
            },
            style: {
                "background-color"() {
                    if (!hasFUpg(104)) {
                    let color = "#bf8f8f"
                    if (player.f.casualty.gte(2000)) color = "#3d2963"
                    return color
                    }
                }
            }
        },
        114: {
            title: "Severe Casualties",
            description: "Severity boosts casualty gain.",
            cost: new Decimal(15e3),
            currencyDisplayName: "casualty",
            currencyInternalName: "casualty",
            currencyLayer: "f",
            effect() {
                let eff = player.s.severity.add(10).max(10)
                eff = eff.log10().pow(0.1)
                return eff
            },
            effectDisplay() {
                return format(getFUpgEff(114))+"x"
            },
            unlocked() {
                return hasFUpg(104)
            },
            style: {
                "background-color"() {
                    if (!hasFUpg(114)) {
                    let color = "#bf8f8f"
                    if (player.f.casualty.gte(15e3)) color = "#3d2963"
                    return color
                    }
                }
            }
        },
        85: {
            title: "Deadly Casualties",
            description: "Deaths boost casualty gain.",
            cost: new Decimal(5e6),
            currencyDisplayName: "casualty",
            currencyInternalName: "casualty",
            currencyLayer: "f",
            effect() {
                let eff = player.d.points.add(10).max(10)
                eff = eff.log10().pow(0.15)
                return eff
            },
            effectDisplay() {
                return format(getFUpgEff(85))+"x"
            },
            unlocked() {
                return hasFUpg(114)
            },
            style: {
                "background-color"() {
                    if (!hasFUpg(85)) {
                    let color = "#bf8f8f"
                    if (player.f.casualty.gte(5e6)) color = "#3d2963"
                    return color
                    }
                }
            }
        },
        95: {
            title: "Casual Casualties",
            description: "Casualty boosts cases gain.",
            cost: new Decimal(3e9),
            currencyDisplayName: "casualty",
            currencyInternalName: "casualty",
            currencyLayer: "f",
            effect() {
                let eff = player.f.casualty.add(10).max(10)
                eff = eff.log10().add(10).max(10)
                eff = eff.log10().pow(5)
                return eff
            },
            effectDisplay() {
                return "^"+format(getFUpgEff(95))
            },
            unlocked() {
                return hasFUpg(85)
            },
            style: {
                "background-color"() {
                    if (!hasFUpg(95)) {
                    let color = "#bf8f8f"
                    if (player.f.casualty.gte(3e9)) color = "#3d2963"
                    return color
                    }
                }
            }
        },
        105: {
            title: "Casual Multipliers",
            description: "Casualty boosts Multiplier Boosts.",
            cost: new Decimal(8e9),
            currencyDisplayName: "casualty",
            currencyInternalName: "casualty",
            currencyLayer: "f",
            effect() {
                let eff = player.f.casualty.add(10).max(10)
                eff = eff.log10().add(10).max(10)
                eff = eff.log10().pow(1.2)
                if (eff.gte(1.7)) eff = eff.div(1.7).pow(0.3).mul(1.7)
                return eff
            },
            effectDisplay() {
                let dis = format(getFUpgEff(105))+"x"
                if (getFUpgEff(105).gte(1.7)) dis += " (softcapped)"
                return dis
            },
            unlocked() {
                return hasFUpg(95)
            },
            style: {
                "background-color"() {
                    if (!hasFUpg(105)) {
                    let color = "#bf8f8f"
                    if (player.f.casualty.gte(8e9)) color = "#3d2963"
                    return color
                    }
                }
            }
        },
        115: {
            title: "Casual Scaling",
            description: "Reduce the Dimension, and Multiplier Boost scaling by 1.",
            cost: new Decimal(1e11),
            currencyDisplayName: "casualty",
            currencyInternalName: "casualty",
            currencyLayer: "f",
            unlocked() {
                return hasFUpg(105)
            },
            style: {
                "background-color"() {
                    if (!hasFUpg(115)) {
                    let color = "#bf8f8f"
                    if (player.f.casualty.gte(1e11)) color = "#3d2963"
                    return color
                    }
                }
            }
        },
        121: {
            title: "Stronger Casualties",
            description: "Multiplier Boosts are 1.35x stronger.",
            cost: new Decimal(2e19),
            currencyDisplayName: "casualty",
            currencyInternalName: "casualty",
            currencyLayer: "f",
            unlocked() {
                return hasFUpg(115)
            },
            style: {
                "background-color"() {
                    if (!hasFUpg(121)) {
                    let color = "#bf8f8f"
                    if (player.f.casualty.gte(2e19)) color = "#3d2963"
                    return color
                    }
                }
            }
        },
        122: {
            title: "Casual Boosts",
            description: "Casualty boosts Dimension Boost base, Reduce Dimension scaling by 1, Dimension Boost scaling by 0.5.",
            cost: new Decimal(2.828e28),
            currencyDisplayName: "casualty",
            currencyInternalName: "casualty",
            currencyLayer: "f",
            effect() {
                let eff = player.f.casualty.add(10).max(10)
                eff = eff.log10()
                return eff
            },
            effectDisplay() {
                return format(getFUpgEff(122))+"x"
            },
            unlocked() {
                return hasFUpg(121)
            },
            style: {
                "background-color"() {
                    if (!hasFUpg(122)) {
                    let color = "#bf8f8f"
                    if (player.f.casualty.gte(2.828e28)) color = "#3d2963"
                    return color
                    }
                }
            }
        },
        123: {
            title: "Case-ual Boosts",
            description: "Casualty gives free 'Cases Boost' and buyable autobuyers buy ^2 more.",
            cost: new Decimal(4.141e41),
            currencyDisplayName: "casualty",
            currencyInternalName: "casualty",
            currencyLayer: "f",
            effect() {
                let eff = player.f.casualty.add(10).max(10)
                eff = eff.log10().pow(0.3).mul(400)
                if (eff.gte(2.5e8) && inChallenge("ct",32)) eff = eff.div(2.5e8).pow(0.15).mul(2.5e8)
                if (eff.gte(1e183) && inChallenge("ct",32)) eff = eff.div(1e183).pow(0.4).mul(1e183)
                if (eff.gte("e415") && inChallenge("ct",32)) eff = eff.log10().div(415).pow(0.7).mul(415).pow10()
                if (eff.gte("e967") && inChallenge("ct",32)) eff = eff.log10().div(967).pow(0.6).mul(967).pow10()
                if (eff.gte(Decimal.pow(10,2e5))) eff = eff.log10().div(2).pow(4e4)
                return eff.floor()
            },
            effectDisplay() {
                return "+"+formatWhole(getFUpgEff(123))
            },
            unlocked() {
                return hasFUpg(122)
            },
            style: {
                "background-color"() {
                    if (!hasFUpg(123)) {
                    let color = "#bf8f8f"
                    if (player.f.casualty.gte(4.141e41)) color = "#3d2963"
                    return color
                    }
                }
            }
        },
        124: {
            title: "Fatal Casualties",
            description: "Casualty boosts fatality effect.",
            cost: new Decimal(9.393e93),
            currencyDisplayName: "casualty",
            currencyInternalName: "casualty",
            currencyLayer: "f",
            effect() {
                let eff = player.f.casualty.add(10).max(10)
                eff = eff.log10().mul(50)
                return eff
            },
            effectDisplay() {
                return "^"+format(getFUpgEff(124))
            },
            unlocked() {
                return hasFUpg(123)
            },
            style: {
                "background-color"() {
                    if (!hasFUpg(124)) {
                    let color = "#bf8f8f"
                    if (player.f.casualty.gte(9.393e93)) color = "#3d2963"
                    return color
                    }
                }
            }
        },
        125: {
            title: "Case PoWeR",
            description: "Casualty power boosts cases gain.",
            cost: Decimal.pow(10,369).mul(3.69),
            currencyDisplayName: "casualty",
            currencyInternalName: "casualty",
            currencyLayer: "f",
            effect() {
                let eff = player.f.cp.add(10).max(10)
                eff = eff.log10().add(10).max(10)
                eff = eff.log10().pow(5)
                return eff
            },
            effectDisplay() {
                return "^"+format(getFUpgEff(125))
            },
            unlocked() {
                return hasFUpg(124)
            },
            style: {
                "background-color"() {
                    if (!hasFUpg(125)) {
                    let color = "#bf8f8f"
                    if (player.f.casualty.gte("3.69e369")) color = "#3d2963"
                    return color
                    }
                }
            }
        },
        131: {
            title: "Casual Replication",
            description: "Casualty reduces replicate interval.",
            cost: Decimal.pow(10,500).mul(5),
            currencyDisplayName: "casualty",
            currencyInternalName: "casualty",
            currencyLayer: "f",
            effect() {
                let eff = player.f.casualty.add(10).max(10)
                eff = eff.log10().add(10).max(10)
                eff = eff.log10()
                return eff
            },
            effectDisplay() {
                return format(getFUpgEff(131))+"x"
            },
            unlocked() {
                return hasMilestone("f",17)
            },
            style: {
                "background-color"() {
                    if (!hasFUpg(131)) {
                    let color = "#bf8f8f"
                    if (player.f.casualty.gte("5e500")) color = "#3d2963"
                    return color
                    }
                }
            }
        },
        132: {
            title: "Replicated Replication",
            description: "Replicators reduce interval and boost Multiplier Boosts.",
            cost: Decimal.pow(10,606).mul(6.06),
            currencyDisplayName: "casualty",
            currencyInternalName: "casualty",
            currencyLayer: "f",
            effect() {
                let eff = player.r.points.add(10).max(10)
                eff = eff.log10().add(10).max(10)
                eff = eff.log10().pow(3)
                return eff
            },
            effect2() {
                let eff = player.r.points.add(10).max(10)
                eff = eff.log10().add(10).max(10)
                eff = eff.log10().pow(0.5)
                return eff
            },
            effectDisplay() {
                return "Interval:" + format(this.effect())+"x, Boosts:" + format(this.effect2())+"x"
            },
            unlocked() {
                return hasFUpg(131)
            },
            style: {
                "background-color"() {
                    if (!hasFUpg(132)) {
                    let color = "#bf8f8f"
                    if (player.f.casualty.gte("6.06e606")) color = "#3d2963"
                    return color
                    }
                }
            }
        },
        133: {
            title: "Distance",
            description: "Divide the max interval by 20 and Distant scaling starts 20 later.",
            cost: Decimal.pow(10,792).mul(7.92),
            currencyDisplayName: "casualty",
            currencyInternalName: "casualty",
            currencyLayer: "f",
            unlocked() {
                return hasFUpg(132)
            },
            style: {
                "background-color"() {
                    if (!hasFUpg(133)) {
                    let color = "#bf8f8f"
                    if (player.f.casualty.gte(Decimal.pow(10,792).mul(7.92))) color = "#3d2963"
                    return color
                    }
                }
            }
        },
        134: {
            title: "Replicated Scaling",
            description: "Reduce the Dimension and Dimension Boost scaling by 0.5.",
            cost: Decimal.pow(10,1107).mul(1.107),
            currencyDisplayName: "casualty",
            currencyInternalName: "casualty",
            currencyLayer: "f",
            unlocked() {
                return hasFUpg(133)
            },
            style: {
                "background-color"() {
                    if (!hasFUpg(134)) {
                    let color = "#bf8f8f"
                    if (player.f.casualty.gte(Decimal.pow(10,1107).mul(1.107))) color = "#3d2963"
                    return color
                    }
                }
            }
        },
        135: {
            title: "Casual Casual",
            description: "Increase the Casualty Multiplier base by +0.1.",
            cost: Decimal.pow(10,2100).mul(2.1),
            currencyDisplayName: "casualty",
            currencyInternalName: "casualty",
            currencyLayer: "f",
            unlocked() {
                return hasFUpg(134)
            },
            style: {
                "background-color"() {
                    if (!hasFUpg(135)) {
                    let color = "#bf8f8f"
                    if (player.f.casualty.gte(Decimal.pow(10,2100).mul(2.1))) color = "#3d2963"
                    return color
                    }
                }
            }
        },
        141: {
            title: "Cases MultiBoost",
            description: "Multiplier Boosts increase 'Cases Boost' base by +5e-7.",
            cost: new Decimal("2.395e2395"),
            currencyDisplayName: "casualty",
            currencyInternalName: "casualty",
            currencyLayer: "f",
            effect() {
                let eff = getBuyableAmount("f",33).div(2e6)
                if (eff.gte(0.003)) eff = eff.div(0.003).pow(0.25).mul(0.003)
                return eff
            },
            effectDisplay() {
                let dis = "+"+format(getFUpgEff(141))
                if (getFUpgEff(141).gte(0.003)) dis += " (softcapped)"
                return dis
            },
            unlocked() {
                return hasFUpg(135)
            },
            style: {
                "background-color"() {
                    if (!hasFUpg(141)) {
                    let color = "#bf8f8f"
                    if (player.f.casualty.gte("2.395e2395")) color = "#3d2963"
                    return color
                    }
                }
            }
        },
        142: {
            title: "Case Scaling",
            description: "Casualty reduces 'Cases Boost' scaling.",
            cost: new Decimal("2.787e2787"),
            currencyDisplayName: "casualty",
            currencyInternalName: "casualty",
            currencyLayer: "f",
            effect() {
                let eff = player.f.casualty.add(10).max(10)
                eff = eff.log10().add(10).max(10)
                eff = eff.log10().add(10).max(10)
                eff = eff.log10().pow(0.03)
                return eff.min(1.006)
            },
            effectDisplay() {
                return format(getFUpgEff(142))+"x"
            },
            unlocked() {
                return hasFUpg(141)
            },
            style: {
                "background-color"() {
                    if (!hasFUpg(142)) {
                    let color = "#bf8f8f"
                    if (player.f.casualty.gte("2.787e2787")) color = "#3d2963"
                    return color
                    }
                }
            }
        },
        143: {
            title: "Fatal Synergy",
            description: "Cases and 'Fatally' boost each other, buyable autobuyers buy ^10 more.",
            cost: new Decimal("3.958e3958"),
            currencyDisplayName: "casualty",
            currencyInternalName: "casualty",
            currencyLayer: "f",
            effect() {
                let p = player.points.add(1).max(1)
                let eff = slog(p).pow(0.47)
                return eff.min(2)
            },
            effect2() {
                let eff = getFUpgEff(14).add(10).max(10)
                eff = eff.log10().pow(0.15)
                if (eff.gte(Decimal.pow(10,1e24))) eff = eff.log10().mul(10).pow(4e22)
                return eff
            },
            effectDisplay() {
                let dis = "Fatally: ^^"+format(tmp.f.upgrades[143].effect)
                if (tmp.f.upgrades[143].effect.gte(2)) dis += " (hardcapped)"
                return dis + ", Cases: ^" + format(this.effect2())
            },
            unlocked() {
                return hasFUpg(142)
            },
            style: {
                "background-color"() {
                    if (!hasFUpg(143)) {
                    let color = "#bf8f8f"
                    if (player.f.casualty.gte("3.958e3958")) color = "#3d2963"
                    return color
                    }
                }
            }
        },
        144: {
            title: "Fatal Cases",
            description: "Fatality boosts cases exponent.",
            cost: new Decimal("5.75e5750"),
            currencyDisplayName: "casualty",
            currencyInternalName: "casualty",
            currencyLayer: "f",
            effect() {
                let eff = player.f.points.add(10).max(10)
                eff = eff.log10().add(10).max(10)
                eff = eff.log10().add(10).max(10)
                eff = eff.log10().pow(0.07)
                return eff
            },
            effectDisplay() {
                return "^"+format(getFUpgEff(144))
            },
            unlocked() {
                return hasFUpg(143)
            },
            style: {
                "background-color"() {
                    if (!hasFUpg(144)) {
                    let color = "#bf8f8f"
                    if (player.f.casualty.gte("5.75e5750")) color = "#3d2963"
                    return color
                    }
                }
            }
        },
        145: {
            title: "Distant Fatalities",
            description: "Fatality makes Distant scaling start later.",
            cost: new Decimal("7.272e7272"),
            currencyDisplayName: "casualty",
            currencyInternalName: "casualty",
            currencyLayer: "f",
            effect() {
                let eff = player.f.points.add(10).max(10)
                eff = eff.log10().pow(0.2355)
                if (eff.gte(1000)) eff = eff.div(1e3).pow(0.3).mul(1e3)
                return eff
            },
            effectDisplay() {
                return "+"+format(getFUpgEff(145))
            },
            unlocked() {
                return hasFUpg(144)
            },
            style: {
                "background-color"() {
                    if (!hasFUpg(145)) {
                    let color = "#bf8f8f"
                    if (player.f.casualty.gte("7.272e7272")) color = "#3d2963"
                    return color
                    }
                }
            }
        },
        151: {
            title: "MultiVirus",
            description: "Casual viruses add to Casualty Multiplier base.",
            cost: decimalOne,
            currencyDisplayName: "casual virus",
            currencyInternalName: "virus",
            currencyLayer: "f",
            effect() {
                let eff = player.f.virus.add(10).max(10)
                eff = eff.log10().pow(0.2).div(15)
                return eff
            },
            effectDisplay() {
                return "+"+format(getFUpgEff(151))
            },
            unlocked() {
                return hasMilestone("f",20)
            },
            style: {
                "background-color"() {
                    if (!hasFUpg(151)) {
                    let color = "#bf8f8f"
                    if (player.f.virus.gte(1)) color = "#3d2963"
                    return color
                    }
                }
            }
        },
        152: {
            title: "Boosted Virus",
            description: "Casual viruses add to 'Cases Boost' base.",
            cost: new Decimal(22650),
            currencyDisplayName: "casual viruses",
            currencyInternalName: "virus",
            currencyLayer: "f",
            effect() {
                let eff = player.f.virus.add(10).max(10)
                eff = eff.log10().add(10).max(10)
                eff = eff.log10().pow(0.5).div(7e3)
                return eff
            },
            effectDisplay() {
                return "+"+format(getFUpgEff(152))
            },
            unlocked() {
                return hasFUpg(151)
            },
            style: {
                "background-color"() {
                    if (!hasFUpg(152)) {
                    let color = "#bf8f8f"
                    if (player.f.virus.gte(22650)) color = "#3d2963"
                    return color
                    }
                }
            }
        },
        153: {
            title: "Casual Vimension",
            description: "Casual viruses boost Casualty Dimensions.",
            cost: new Decimal(220300),
            currencyDisplayName: "casual viruses",
            currencyInternalName: "virus",
            currencyLayer: "f",
            effect() {
                let eff = player.f.virus.add(1).max(1)
                eff = eff.pow(17)
                return eff
            },
            effectDisplay() {
                return format(getFUpgEff(153))+"x"
            },
            unlocked() {
                return hasFUpg(152)
            },
            style: {
                "background-color"() {
                    if (!hasFUpg(153)) {
                    let color = "#bf8f8f"
                    if (player.f.virus.gte(220300)) color = "#3d2963"
                    return color
                    }
                }
            }
        },
        154: {
            title: "Scaled Virus",
            description: "Casual viruses reduce Dimension scaling.",
            cost: new Decimal(675200),
            currencyDisplayName: "casual viruses",
            currencyInternalName: "virus",
            currencyLayer: "f",
            effect() {
                let eff = player.f.virus.add(10).max(10)
                eff = eff.log10().pow(0.08).div(13)
                return eff.min(0.3)
            },
            effectDisplay() {
                return "-"+format(getFUpgEff(154))
            },
            unlocked() {
                return hasFUpg(153)
            },
            style: {
                "background-color"() {
                    if (!hasFUpg(154)) {
                    let color = "#bf8f8f"
                    if (player.f.virus.gte(675200)) color = "#3d2963"
                    return color
                    }
                }
            }
        },
        155: {
            title: "Case-ual Virus",
            description: "Cases boost casual virus gain.",
            cost: new Decimal(1926500),
            currencyDisplayName: "casual viruses",
            currencyInternalName: "virus",
            currencyLayer: "f",
            effect() {
                let eff = player.points.add(10).max(10)
                eff = eff.log10().pow(0.03)
                if (eff.gte(Decimal.pow(10,3e9))) eff = Decimal.pow(10,eff.div(Decimal.pow(10,3e9)).log10().pow(0.85)).mul(Decimal.pow(10,3e9))
                if (eff.gte(Decimal.pow(10,1.5e15))) eff = Decimal.pow(10,eff.div(Decimal.pow(10,1.5e15)).log10().pow(0.82)).mul(Decimal.pow(10,1.5e15))
                if (eff.gte(Decimal.pow(10,1.8e18))) eff = Decimal.pow(10,eff.div(Decimal.pow(10,1.8e18)).log10().pow(0.78)).mul(Decimal.pow(10,1.8e18))
                if (eff.gte(Decimal.pow(10,1e20))) eff = eff.log10().pow(5e18)
                return eff
            },
            effectDisplay() {
                let dis = format(getFUpgEff(155))+"x"
                if (getFUpgEff(155).gte(Decimal.pow(10,3e9))) dis += " (softcapped)" 
                return dis
            },
            unlocked() {
                return hasFUpg(154)
            },
            style: {
                "background-color"() {
                    if (!hasFUpg(155)) {
                    let color = "#bf8f8f"
                    if (player.f.virus.gte(1926500)) color = "#3d2963"
                    return color
                    }
                }
            }
        },
        156: {
            title: "Case-ual Upgrades",
            description: "Raise cases to ^1.2 per Casual Virus upgrade.",
            cost: new Decimal(2.599e9),
            currencyDisplayName: "casual viruses",
            currencyInternalName: "virus",
            currencyLayer: "f",
            effect() {
                let eff = player.f.upgrades.length-70
                eff = Decimal.pow(1.2,eff)
                return eff.max(1)
            },
            effectDisplay() {
                return "^"+format(getFUpgEff(156))
            },
            unlocked() {
                return hasFUpg(155)
            },
            style: {
                "background-color"() {
                    if (!hasFUpg(156)) {
                    let color = "#bf8f8f"
                    if (player.f.virus.gte(2.599e9)) color = "#3d2963"
                    return color
                    }
                }
            }
        },
        157: {
            title: "Self Casual Boost",
            description: "Casual viruses boost itself and cases gain.",
            cost: new Decimal(4.0874e9),
            currencyDisplayName: "casual viruses",
            currencyInternalName: "virus",
            currencyLayer: "f",
            effect() {
                let eff = player.f.virus.add(10).max(10)
                eff = eff.log10().pow(4)
                eff = eff.pow(tmp.f.buyables[103].effect)
                return eff.max(1)
            },
            effect2() {
                let eff = player.f.virus.add(10).max(10)
                eff = eff.log10().add(10).max(10)
                eff = eff.log10().pow(4)
                eff = eff.pow(tmp.f.buyables[103].effect)
                if (eff.gte(Decimal.pow(10,Decimal.pow(10,1e46)))) eff = eff.log10().log10().mul(1e4).pow(2e44).pow10()
                return eff.max(1)
            },
            effectDisplay() {
                return format(tmp.f.upgrades[157].effect)+"x, ^"+format(tmp.f.upgrades[157].effect2)
            },
            unlocked() {
                return hasFUpg(156)
            },
            style: {
                "background-color"() {
                    if (!hasFUpg(157)) {
                    let color = "#bf8f8f"
                    if (player.f.virus.gte(4.0874e9)) color = "#3d2963"
                    return color
                    }
                }
            }
        },
        161: {
            title: "Powerful Viruses",
            description: "Casual viruses boost fatality power effect.",
            cost: new Decimal(8.2995e14),
            currencyDisplayName: "casual viruses",
            currencyInternalName: "virus",
            currencyLayer: "f",
            effect() {
                let eff = player.f.virus.add(10).max(10)
                eff = eff.log10().pow(0.6)
                return eff.max(1)
            },
            effectDisplay() {
                return "^"+format(getFUpgEff(161))
            },
            unlocked() {
                return hasFUpg(157)
            },
            style: {
                "background-color"() {
                    if (!hasFUpg(161)) {
                    let color = "#bf8f8f"
                    if (player.f.virus.gte(8.2995e14)) color = "#3d2963"
                    return color
                    }
                }
            }
        },
        162: {
            title: "Fatal Virus",
            description: "Fatality boosts casual virus gain.",
            cost: new Decimal(1.4627e15),
            currencyDisplayName: "casual viruses",
            currencyInternalName: "virus",
            currencyLayer: "f",
            effect() {
                let eff = player.f.points.add(10).max(10)
                eff = eff.log10().pow(0.6)
                return eff.max(1)
            },
            effectDisplay() {
                return format(getFUpgEff(162))+'x'
            },
            unlocked() {
                return hasFUpg(161)
            },
            style: {
                "background-color"() {
                    if (!hasFUpg(162)) {
                    let color = "#bf8f8f"
                    if (player.f.virus.gte(1.4627e15)) color = "#3d2963"
                    return color
                    }
                }
            }
        },
        163: {
            title: "Virus Virus",
            description: "Add 1 to base casual virus gain exponent.",
            cost: new Decimal(6.2435e20),
            currencyDisplayName: "casual viruses",
            currencyInternalName: "virus",
            currencyLayer: "f",
            unlocked() {
                return hasFUpg(162)
            },
            style: {
                "background-color"() {
                    if (!hasFUpg(163)) {
                    let color = "#bf8f8f"
                    if (player.f.virus.gte(6.2435e20)) color = "#3d2963"
                    return color
                    }
                }
            }
        },
        164: {
            title: "Infected Casual",
            description: "Infectivity adds to casual virus exponent.",
            cost: new Decimal(1.0085e26),
            currencyDisplayName: "casual viruses",
            currencyInternalName: "virus",
            currencyLayer: "f",
            effect() {
                let eff = player.i.points.add(10).max(10)
                eff = eff.log10().add(10).max(10)
                eff = eff.log10().pow(0.3).div(4)
                return eff
            },
            effectDisplay() {
                return "+"+format(getFUpgEff(164))
            },
            unlocked() {
                return hasFUpg(163)
            },
            style: {
                "background-color"() {
                    if (!hasFUpg(164)) {
                    let color = "#bf8f8f"
                    if (player.f.virus.gte(1.0085e26)) color = "#3d2963"
                    return color
                    }
                }
            }
        },
        165: {
            title: "Severe Casual",
            description: "Severity adds to casual virus exponent.",
            cost: new Decimal(3.0174e31),
            currencyDisplayName: "casual viruses",
            currencyInternalName: "virus",
            currencyLayer: "f",
            effect() {
                let eff = player.s.severity.add(10).max(10)
                eff = eff.log10().add(10).max(10)
                eff = eff.log10().pow(0.4).div(4)
                if (eff.gte(1e20)) eff = eff.div(1e20).pow(0.2).mul(1e20)
                return eff
            },
            effectDisplay() {
                return "+"+format(getFUpgEff(165))
            },
            unlocked() {
                return hasFUpg(164)
            },
            style: {
                "background-color"() {
                    if (!hasFUpg(165)) {
                    let color = "#bf8f8f"
                    if (player.f.virus.gte(3.0174e31)) color = "#3d2963"
                    return color
                    }
                }
            }
        },
        166: {
            title: "Replicated Casual",
            description: "Replicators add to casual virus exponent.",
            cost: new Decimal(2.7224e37),
            currencyDisplayName: "casual viruses",
            currencyInternalName: "virus",
            currencyLayer: "f",
            effect() {
                let eff = player.r.points.add(10).max(10)
                eff = eff.log10().pow(0.25).div(2)
                return eff
            },
            effectDisplay() {
                return "+"+format(getFUpgEff(166))
            },
            unlocked() {
                return hasFUpg(165)
            },
            style: {
                "background-color"() {
                    if (!hasFUpg(166)) {
                    let color = "#bf8f8f"
                    if (player.f.virus.gte(2.7224e37)) color = "#3d2963"
                    return color
                    }
                }
            }
        },
        167: {
            title: "Powerful Casuals",
            description: "Casual virus boosts casualty power effect.",
            cost: new Decimal(2.1969e44),
            currencyDisplayName: "casual viruses",
            currencyInternalName: "virus",
            currencyLayer: "f",
            effect() {
                let eff = player.f.virus.add(10).max(10)
                let exp = 0.403425
                if (inChallenge("ct",32)) exp = 0.05
                eff = eff.log10().pow(exp)
                return eff
            },
            effectDisplay() {
                return "^"+format(getFUpgEff(167))
            },
            unlocked() {
                return hasFUpg(166)
            },
            style: {
                "background-color"() {
                    if (!hasFUpg(167)) {
                    let color = "#bf8f8f"
                    if (player.f.virus.gte(2.1969e44)) color = "#3d2963"
                    return color
                    }
                }
            }
        },
        171: {
            title: "Fatal Casual",
            description: "Casual viruses boost fatality gain.",
            cost: new Decimal(3.111e48),
            currencyDisplayName: "casual viruses",
            currencyInternalName: "virus",
            currencyLayer: "f",
            effect() {
                let eff = player.f.virus.add(10).max(10)
                eff = eff.log10().add(10).max(10)
                eff = eff.log10().pow(0.3)
                return eff
            },
            effectDisplay() {
                return "^"+format(getFUpgEff(171))
            },
            unlocked() {
                return hasFUpg(167)
            },
            style: {
                "background-color"() {
                    if (!hasFUpg(171)) {
                    let color = "#bf8f8f"
                    if (player.f.virus.gte(3.111e48)) color = "#3d2963"
                    return color
                    }
                }
            }
        },
        172: {
            title: "Casual MultiVoost",
            description: "Casual viruses boost Multiplier Boosts.",
            cost: new Decimal(1.2197e53),
            currencyDisplayName: "casual viruses",
            currencyInternalName: "virus",
            currencyLayer: "f",
            effect() {
                let eff = player.f.virus.add(10).max(10)
                let exp = 2 
                if (inChallenge("ct",32) && player.f.virus.gte(1)) exp = 0.3
                eff = eff.log10().add(10).max(10)
                eff = eff.log10().pow(exp)
                return eff
            },
            effectDisplay() {
                return format(getFUpgEff(172))+"x"
            },
            unlocked() {
                return hasFUpg(171)
            },
            style: {
                "background-color"() {
                    if (!hasFUpg(172)) {
                    let color = "#bf8f8f"
                    if (player.f.virus.gte(1.2197e53)) color = "#3d2963"
                    return color
                    }
                }
            }
        },
        173: {
            title: "Case-ual Multipliers",
            description: "Cases add to Casualty Multiplier base and unlock a buyable.",
            cost: new Decimal(5.98e54),
            currencyDisplayName: "casual viruses",
            currencyInternalName: "virus",
            currencyLayer: "f",
            effect() {
                let eff = player.points.add(10).max(10)
                eff = eff.log10().add(10).max(10)
                eff = eff.log10().pow(0.1).div(10)
                return eff
            },
            effectDisplay() {
                return "+"+format(getFUpgEff(173))
            },
            unlocked() {
                return hasFUpg(172)
            },
            style: {
                "background-color"() {
                    if (!hasFUpg(173)) {
                    let color = "#bf8f8f"
                    if (player.f.virus.gte(5.98e54)) color = "#3d2963"
                    return color
                    }
                }
            }
        },
        174: {
            title: "Infected Softcaps",
            description: "Cases make 'Cases Boost' softcap start later.",
            cost: new Decimal(6.196e60),
            currencyDisplayName: "casual viruses",
            currencyInternalName: "virus",
            currencyLayer: "f",
            effect() {
                let eff = player.points.add(10).max(10)
                eff = eff.log10().add(10).max(10)
                eff = eff.log10().pow(0.3).mul(100)
                return eff.floor()
            },
            effectDisplay() {
                return "+"+formatWhole(getFUpgEff(174))
            },
            unlocked() {
                return hasFUpg(173)
            },
            style: {
                "background-color"() {
                    if (!hasFUpg(174)) {
                    let color = "#bf8f8f"
                    if (player.f.virus.gte(6.196e60)) color = "#3d2963"
                    return color
                    }
                }
            }
        },
        175: {
            title: "Casual Softcaps",
            description: "Casual viruses make 'Cases Boost' softcap start later.",
            cost: new Decimal(1.533e66),
            currencyDisplayName: "casual viruses",
            currencyInternalName: "virus",
            currencyLayer: "f",
            effect() {
                let eff = player.f.virus.add(10).max(10)
                eff = eff.log10().add(10).max(10)
                eff = eff.log10().pow(1.5).mul(200)
                return eff.floor()
            },
            effectDisplay() {
                return "+"+formatWhole(getFUpgEff(175))
            },
            unlocked() {
                return hasFUpg(174)
            },
            style: {
                "background-color"() {
                    if (!hasFUpg(175)) {
                    let color = "#bf8f8f"
                    if (player.f.virus.gte(1.533e66)) color = "#3d2963"
                    return color
                    }
                }
            }
        },
        176: {
            title: "Exponent Exponent",
            description: "Casual viruses boost cases exponent and unlock a buyable.",
            cost: new Decimal(7.316e69),
            currencyDisplayName: "casual viruses",
            currencyInternalName: "virus",
            currencyLayer: "f",
            effect() {
                let eff = player.f.virus.add(10).max(10)
                eff = eff.log10().add(10).max(10)
                eff = eff.log10().pow(0.03)
                return eff
            },
            effectDisplay() {
                return "^"+format(getFUpgEff(176))
            },
            unlocked() {
                return hasFUpg(175)
            },
            style: {
                "background-color"() {
                    if (!hasFUpg(176)) {
                    let color = "#bf8f8f"
                    if (player.f.virus.gte(7.316e69)) color = "#3d2963"
                    return color
                    }
                }
            }
        },
        177: {
            title: "Casualer Virus",
            description: "Casualty adds to 'Virus Gain' base.",
            cost: new Decimal(1.02e88),
            currencyDisplayName: "casual viruses",
            currencyInternalName: "virus",
            currencyLayer: "f",
            effect() {
                let eff = player.f.casualty.add(10).max(10)
                eff = eff.log10().pow(0.1)
                return eff
            },
            effectDisplay() {
                return "+"+format(getFUpgEff(177))
            },
            unlocked() {
                return hasFUpg(176)
            },
            style: {
                "background-color"() {
                    if (!hasFUpg(177)) {
                    let color = "#bf8f8f"
                    if (player.f.virus.gte(1.02e88)) color = "#3d2963"
                    return color
                    }
                }
            }
        },
        181: {
            title: "Unlimited Casuals",
            description: "Remove cas. lim.,its form. is better,it boosts CV gain,RBs reset nothing.",
            cost: new Decimal(6.1248e150),
            currencyDisplayName: "casual viruses",
            currencyInternalName: "virus",
            currencyLayer: "f",
            effect() {
                let eff = player.f.casuals.add(1).max(1)
                eff = Decimal.pow(10,eff.log10().pow(0.305))
                if (hasUpgrade("e",24)) eff = eff.pow(upgradeEffect("e",24))
                return eff
            },
            effectDisplay() {
                return format(getFUpgEff(181))+"x"
            },
            unlocked() {
                return hasFUpg(177)
            },
            style: {
                "background-color"() {
                    if (!hasFUpg(181)) {
                    let color = "#bf8f8f"
                    if (player.f.virus.gte(6.1248e150)) color = "#3d2963"
                    return color
                    }
                }
            }
        },
        182: {
            title: "Unlimited Interval",
            description: "Remove the interval limit, and unlock autobuy interval.",
            cost: new Decimal(2.15e215),
            currencyDisplayName: "casual viruses",
            currencyInternalName: "virus",
            currencyLayer: "f",
            unlocked() {
                return hasFUpg(181)
            },
            style: {
                "background-color"() {
                    if (!hasFUpg(182)) {
                    let color = "#bf8f8f"
                    if (player.f.virus.gte(2.15e215)) color = "#3d2963"
                    return color
                    }
                }
            }
        },
        183: {
            title: "Unlimited Multiplier",
            description: "Remove the rep mult limit,unlock auto mult, and it boosts itself.",
            cost: new Decimal(2.48e248),
            currencyDisplayName: "casual viruses",
            currencyInternalName: "virus",
            currencyLayer: "f",
            effect() {
                let eff = tmp.f.buyables[91].base
                eff = eff.log10().pow(4.5).add(1).max(1)
                if (hasUpgrade("e",24)) eff = eff.pow(upgradeEffect("e",24))
                return eff
            },
            effectDisplay() {
                return "^"+format(getFUpgEff(183))
            },
            unlocked() {
                return hasFUpg(182)
            },
            style: {
                "background-color"() {
                    if (!hasFUpg(183)) {
                    let color = "#bf8f8f"
                    if (player.f.virus.gte(2.48e248)) color = "#3d2963"
                    return color
                    }
                }
            }
        },
        184: {
            title: "Faster Replication",
            description: "Casual viruses slow interval scaling.",
            cost: new Decimal(2.56e256),
            currencyDisplayName: "casual viruses",
            currencyInternalName: "virus",
            currencyLayer: "f",
            effect() {
                let eff = player.f.virus.add(1).max(1)
                let exp = 0.5
                if (inChallenge("ct",32)) exp = 0.07
                eff = eff.log10().pow(exp).div(10).add(1).max(1)
                eff = Decimal.div(0.2,eff).add(1).max(1)
                return eff.max(1.001)
            },
            effectDisplay() {
                return "1.2x → "+format(getFUpgEff(184)) +'x'
            },
            unlocked() {
                return hasFUpg(183)
            },
            style: {
                "background-color"() {
                    if (!hasFUpg(184)) {
                    let color = "#bf8f8f"
                    if (player.f.virus.gte(2.56e256)) color = "#3d2963"
                    return color
                    }
                }
            }
        },
        185: {
            title: "Slow Scaling",
            description: "Cases reduce Dimension scaling and Distant scaling.",
            cost: new Decimal(1e286),
            currencyDisplayName: "casual viruses",
            currencyInternalName: "virus",
            currencyLayer: "f",
            effect() {
                let eff = player.points.add(10).max(10)
                eff = eff.log10().add(10).max(10)
                eff = eff.log10().pow(0.1).div(7)
                return eff.min(0.4)
            },
            effect2() {
                let eff = player.points.add(10).max(10)
                eff = eff.log10().add(10).max(10)
                eff = eff.log10().pow(0.15)
                return eff
            },
            effectDisplay() {
                return "-"+format(tmp.f.upgrades[185].effect) + ", "+format(tmp.f.upgrades[185].effect2)+"x"
            },
            unlocked() {
                return hasFUpg(184)
            },
            style: {
                "background-color"() {
                    if (!hasFUpg(185)) {
                    let color = "#bf8f8f"
                    if (player.f.virus.gte(1e286)) color = "#3d2963"
                    return color
                    }
                }
            }
        },
        186: {
            title: "Casualest Virus",
            description: "Each 'Virus Gain' adds 0.05 to its base.",
            cost: new Decimal(1.5e304),
            currencyDisplayName: "casual viruses",
            currencyInternalName: "virus",
            currencyLayer: "f",
            effect() {
                let eff = tmp.f.buyables[101].total.div(20)
                return eff
            },
            effectDisplay() {
                return "+"+format(getFUpgEff(186))
            },
            unlocked() {
                return hasFUpg(185)
            },
            style: {
                "background-color"() {
                    if (!hasFUpg(186)) {
                    let color = "#bf8f8f"
                    if (player.f.virus.gte(1.5e304)) color = "#3d2963"
                    return color
                    }
                }
            }
        },
        187: {
            title: "More Exponenter",
            description: "Each SB adds 0.0033 to VE base and autobuy buyables once per second.",
            cost: new Decimal("e367"),
            currencyDisplayName: "casual viruses",
            currencyInternalName: "virus",
            currencyLayer: "f",
            effect() {
                let eff = tmp.f.buyables[103].total.mul(0.0033)
                return eff
            },
            effectDisplay() {
                return "+"+format(getFUpgEff(187))
            },
            unlocked() {
                return hasFUpg(186)
            },
            style: {
                "background-color"() {
                    if (!hasFUpg(187)) {
                    let color = "#bf8f8f"
                    if (player.f.virus.gte("e367")) color = "#3d2963"
                    return color
                    }
                }
            }
        },
    },
    challenges: { 
        rows: 6,
        cols: 2,
        11: {
            name: "Fatality Challenge 1",
            currencyDisplayName: "fatality",
            currencyInternalName: "points",
            currencyLayer: "f",
            challengeDescription: function() {
                let c11 = "Fatality power/1.8e308."
                if (inChallenge("f", 11)) c11 = c11 + " (In Challenge)"
                if (challengeCompletions("f", 11) == 1) c11 = c11 + " (Completed)"
                return c11
            },
            goal(){
                return new Decimal(Decimal.pow(10,5095).mul(5))
            },
            rewardDescription: "Unlock Fatality Dimension 1,2,3 Autobuyer.",
            onStart(testInput=false) { 
                if (testInput) {
                    startCChallenge(11)
                }
            },
            onComplete() {
                player.f.casualty = player.f.casualty.add(tmp.f.buyables[34].effect)
                player.f.casualtyTotal = player.f.casualtyTotal.add(tmp.f.buyables[34].effect)
            },
            unlocked(){
                return hasMilestone("f", 12)
            }
        },
        12: {
            name: "Fatality Challenge 2",
            currencyDisplayName: "fatality",
            currencyInternalName: "points",
            currencyLayer: "f",
            challengeDescription: function() {
                let c11 = "Multiplier per Fatality Dimension is 1."
                if (inChallenge("f", 12)) c11 = c11 + " (In Challenge)"
                if (challengeCompletions("f", 12) == 1) c11 = c11 + " (Completed)"
                return c11
            },
            goal(){
                return new Decimal(Decimal.pow(10,5095).mul(5))
            },
            rewardDescription: "Unlock Fatality Dimension 4,5,6 Autobuyer.",
            onStart(testInput=false) { 
                if (testInput) {
                    startCChallenge(12)
                }
            },
            onComplete() {
                player.f.casualty = player.f.casualty.add(tmp.f.buyables[34].effect)
                player.f.casualtyTotal = player.f.casualtyTotal.add(tmp.f.buyables[34].effect)
            },
            unlocked(){
                return hasMilestone("f", 12)
            }
        },
        21: {
            name: "Fatality Challenge 3",
            currencyDisplayName: "fatality",
            currencyInternalName: "points",
            currencyLayer: "f",
            challengeDescription: function() {
                let c11 = "Dimension cost scaling is 100x."
                if (inChallenge("f", 21)) c11 = c11 + " (In Challenge)"
                if (challengeCompletions("f", 21) == 1) c11 = c11 + " (Completed)"
                return c11
            },
            goal(){
                return new Decimal(Decimal.pow(10,5095).mul(5))
            },
            rewardDescription: "Unlock Fatality Dimension 7,8, Multiplier Autobuyer.",
            onStart(testInput=false) { 
                if (testInput) {
                    startCChallenge(21)
                }
            },
            onComplete() {
                player.f.casualty = player.f.casualty.add(tmp.f.buyables[34].effect)
                player.f.casualtyTotal = player.f.casualtyTotal.add(tmp.f.buyables[34].effect)
            },
            unlocked(){
                return hasMilestone("f", 12)
            }
        },
        22: {
            name: "Fatality Challenge 4",
            currencyDisplayName: "fatality",
            currencyInternalName: "points",
            currencyLayer: "f",
            challengeDescription: function() {
                let c11 = "You can't buy Dimension Boosts. Multiplier Boosts cost Fatality Dimension 6 and they are 1.5x stronger."
                if (inChallenge("f", 22)) c11 = c11 + " (In Challenge)"
                if (challengeCompletions("f", 22) == 1) c11 = c11 + " (Completed)"
                return c11
            },
            goal(){
                return new Decimal(Decimal.pow(10,5095).mul(5))
            },
            rewardDescription: "Unlock Dimension and Multiplier Boost Autobuyer.",
            onStart(testInput=false) { 
                if (testInput) {
                    startCChallenge(22)
                }
            },
            onComplete() {
                player.f.casualty = player.f.casualty.add(tmp.f.buyables[34].effect)
                player.f.casualtyTotal = player.f.casualtyTotal.add(tmp.f.buyables[34].effect)
            },
            unlocked(){
                return hasMilestone("f", 12)
            }
        },
        31: {
            name: "Casualty Challenge 1",
            currencyDisplayName: "fatality",
            currencyInternalName: "points",
            currencyLayer: "f",
            countsAs: [11,12,21,22],
            challengeDescription: function() {
                let c11 = "All Fatality Challenges are applied at once. You can't gain deaths. Fatality gain is gain from "+format("e10,450")+" deaths"
                if (inChallenge("f", 31)) c11 = c11 + " (In Challenge)"
                if (challengeCompletions("f", 31) == 1) c11 = c11 + " (Completed)"
                return c11
            },
            goal(){
                return new Decimal("e26000")
            },
            rewardDescription() {
                let des =  "Casualty boosts Casualty Dimensions."
                return des
            },
            rewardEffect() {
                 let c12 = player.f.casualty.add(10).max(10)
                 c12 = c12.log10().pow(1.5)
                 return c12
            },
            rewardDisplay() {return format(this.rewardEffect()) + 'x'},
            onStart(testInput=false) { 
                if (testInput) {
                    startCChallenge(31)
                }
            },
            onComplete() {
                player.f.casualty = player.f.casualty.add(tmp.f.buyables[34].effect)
                player.f.casualtyTotal = player.f.casualtyTotal.add(tmp.f.buyables[34].effect)
            },
            unlocked(){
                return player.f.best.gte("1e155000")
            },
            buttonColor: '#3d2963'
        },
        32: {
            name: "Casualty Challenge 2",
            currencyDisplayName: "fatality",
            currencyInternalName: "points",
            currencyLayer: "f",
            challengeDescription: function() {
                let c11 = "Multiplier Boosts are useless."
                if (inChallenge("f", 32)) c11 = c11 + " (In Challenge)"
                if (challengeCompletions("f", 32) == 1) c11 = c11 + " (Completed)"
                return c11
            },
            goal(){
                return new Decimal("e61000")
            },
            rewardDescription() {
                let des =  "More powerful Sacrifice."
                return des
            },
            onStart(testInput=false) { 
                if (testInput) {
                    startCChallenge(32)
                }
            },
            onComplete() {
                player.f.casualty = player.f.casualty.add(tmp.f.buyables[34].effect)
                player.f.casualtyTotal = player.f.casualtyTotal.add(tmp.f.buyables[34].effect)
            },
            unlocked(){
                return player.f.best.gte("1e177000")
            },
            buttonColor: '#3d2963'
        },
        41: {
            name: "Casualty Challenge 3",
            currencyDisplayName: "fatality",
            currencyInternalName: "points",
            currencyLayer: "f",
            challengeDescription: function() {
                let c11 = "Dimension scaling is 1.8e308x"
                if (inChallenge("f", 41)) c11 = c11 + " (In Challenge)"
                if (challengeCompletions("f", 41) == 1) c11 = c11 + " (Completed)"
                return c11
            },
            goal(){
                return new Decimal("e175500")
            },
            rewardDescription() {
                let des =  "Reduce the Dimension scaling by 1."
                return des
            },
            onStart(testInput=false) { 
                if (testInput) {
                    startCChallenge(41)
                }
            },
            onComplete() {
                player.f.casualty = player.f.casualty.add(tmp.f.buyables[34].effect)
                player.f.casualtyTotal = player.f.casualtyTotal.add(tmp.f.buyables[34].effect)
            },
            unlocked(){
                return player.f.best.gte("1e350000")
            },
            buttonColor: '#3d2963'
        },
        42: {
            name: "Casualty Challenge 4",
            currencyDisplayName: "fatality",
            currencyInternalName: "points",
            currencyLayer: "f",
            challengeDescription: function() {
                let c11 = "Fatality gain is ^0.1."
                if (inChallenge("f", 42)) c11 = c11 + " (In Challenge)"
                if (challengeCompletions("f", 42) == 1) c11 = c11 + " (Completed)"
                return c11
            },
            goal(){
                return new Decimal("e20000")
            },
            rewardDescription() {
                let des =  "Fatality gain is ^1.05 and casualty power effect is ^1.5."
                return des
            },
            onStart(testInput=false) { 
                if (testInput) {
                    startCChallenge(42)
                }
            },
            onComplete() {
                player.f.casualty = player.f.casualty.add(tmp.f.buyables[34].effect)
                player.f.casualtyTotal = player.f.casualtyTotal.add(tmp.f.buyables[34].effect)
            },
            unlocked(){
                return player.f.best.gte("1e410000")
            },
            buttonColor: '#3d2963'
        },
        51: {
            name: "Casualty Challenge 5",
            currencyDisplayName: "fatality",
            currencyInternalName: "points",
            currencyLayer: "f",
            challengeDescription: function() {
                let c11 = "Fatality gain exp is ^0.75."
                if (inChallenge("f", 51)) c11 = c11 + " (In Challenge)"
                if (challengeCompletions("f", 51) == 1) c11 = c11 + " (Completed)"
                return c11
            },
            goal(){
                return new Decimal("e11850")
            },
            rewardDescription() {
                let des =  "Multiplier Boosts are 1.2x stronger."
                return des
            },
            onStart(testInput=false) { 
                if (testInput) {
                    startCChallenge(51)
                }
            },
            onComplete() {
                player.f.casualty = player.f.casualty.add(tmp.f.buyables[34].effect)
                player.f.casualtyTotal = player.f.casualtyTotal.add(tmp.f.buyables[34].effect)
            },
            unlocked(){
                return player.f.best.gte("1e550000")
            },
            buttonColor: '#3d2963'
        },
        52: {
            name: "Casualty Challenge 6",
            currencyDisplayName: "fatality",
            currencyInternalName: "points",
            currencyLayer: "f",
            challengeDescription: function() {
                let c11 = "Fatality power is useless."
                if (inChallenge("f", 52)) c11 = c11 + " (In Challenge)"
                if (challengeCompletions("f", 52) == 1) c11 = c11 + " (Completed)"
                return c11
            },
            goal(){
                return new Decimal("e130000")
            },
            rewardDescription() {
                let des =  "Fatality Dimension Multiplier boosts Casualty Dimensions."
                return des
            },
            rewardEffect() {
                let c12 = tmp.f.buyables[31].effect
                c12 = c12.pow(2e-4)
                return c12
           },
           rewardDisplay() {return format(this.rewardEffect()) + 'x'},
            onStart(testInput=false) { 
                if (testInput) {
                    startCChallenge(52)
                }
            },
            onComplete() {
                player.f.casualty = player.f.casualty.add(tmp.f.buyables[34].effect)
                player.f.casualtyTotal = player.f.casualtyTotal.add(tmp.f.buyables[34].effect)
            },
            unlocked(){
                return player.f.best.gte("1e720000")
            },
            buttonColor: '#3d2963'
        },
        61: {
            name: "Casualty Challenge 7",
            currencyDisplayName: "fatality",
            currencyInternalName: "points",
            currencyLayer: "f",
            countsAs: [12],
            challengeDescription: function() {
                let c11 = "Dimension Boosts are the only thing that boosts dimensions."
                if (inChallenge("f", 61)) c11 = c11 + " (In Challenge)"
                if (challengeCompletions("f", 61) == 1) c11 = c11 + " (Completed)"
                return c11
            },
            goal(){
                return new Decimal("e157630")
            },
            rewardDescription() {
                let des =  "Fatality boosts Dimension Boosts."
                return des
            },
            rewardEffect() {
                let c12 = player.f.points.add(10).max(10)
                c12 = c12.log10().pow(0.7)
                return c12
           },
           rewardDisplay() {return format(this.rewardEffect()) + 'x'},
            onStart(testInput=false) { 
                if (testInput) {
                    startCChallenge(61)
                }
            },
            onComplete() {
                player.f.casualty = player.f.casualty.add(tmp.f.buyables[34].effect)
                player.f.casualtyTotal = player.f.casualtyTotal.add(tmp.f.buyables[34].effect)
            },
            unlocked(){
                return player.f.best.gte("1e800000")
            },
            buttonColor: '#3d2963'
        },
        62: {
            name: "Casualty Challenge 8",
            currencyDisplayName: "fatality",
            currencyInternalName: "points",
            currencyLayer: "f",
            countsAs: [12],
            challengeDescription: function() {
                let c11 = "Casualty power is the only thing that boosts dimensions."
                if (inChallenge("f", 62)) c11 = c11 + " (In Challenge)"
                if (challengeCompletions("f", 62) == 1) c11 = c11 + " (Completed)"
                return c11
            },
            goal(){
                return new Decimal("e360000")
            },
            rewardDescription() {
                let des =  "Fatality boosts casualty power effect."
                return des
            },
            rewardEffect() {
                let c12 = player.f.points.add(10).max(10)
                c12 = c12.log10().add(10).max(10)
                c12 = c12.log10().pow(0.1)
                return c12
           },
           rewardDisplay() {return "^"+format(this.rewardEffect())},
           onStart(testInput=false) { 
                if (testInput) {
                    startCChallenge(62)
                }
            },
            onComplete() {
                player.f.casualty = player.f.casualty.add(tmp.f.buyables[34].effect)
                player.f.casualtyTotal = player.f.casualtyTotal.add(tmp.f.buyables[34].effect)
            },
            unlocked(){
                return player.f.best.gte("1e1137000")
            },
            buttonColor: '#3d2963'
        },
    },
    bars: {
        NextCD: {
            direction: RIGHT,
            width: 700,
            height: 30,
            fillStyle: {'background-color' : "#3d2963"},
            req() {
                let req =tmp.f.buyables[84].unlocked ? new Decimal("10")
                :tmp.f.buyables[83].unlocked ? new Decimal("e6750000")
                :tmp.f.buyables[82].unlocked ? new Decimal("e2830000")
                :tmp.f.buyables[81].unlocked ? new Decimal("e2000000")  
                :tmp.f.buyables[74].unlocked ? new Decimal("e1600000") 
                :tmp.f.buyables[73].unlocked ? new Decimal("e300000")
                :new Decimal("e120000")
                return req
            },
            display() {
                let f = player.f.points.add(1).max(1)
                let r = "Get " + format(this.req()) + " fatality to unlock a new Dimension. (" + format(f.log10().div(this.req().log10()).mul(100).min(100)) + "%)"
                if (tmp.f.buyables[84].unlocked ) r = "All Dimensions Unlocked"
                return r
            },
            progress() { 
                let f = player.f.points.add(1).max(1)
                let p = tmp.f.buyables[84].unlocked ? 1 :f.log10().div(this.req().log10())
                return p
            },
        },
        NextCC: {
            direction: RIGHT,
            width: 700,
            height: 30,
            fillStyle: {'background-color' : "#3d2963"},
            req() {
                let req = tmp.f.challenges[62].unlocked ? new Decimal("10")
                :tmp.f.challenges[61].unlocked ? new Decimal("e1137000") 
                :tmp.f.challenges[52].unlocked ? new Decimal("e800000") 
                :tmp.f.challenges[51].unlocked ? new Decimal("e720000")
                :tmp.f.challenges[42].unlocked ? new Decimal("e550000") 
                :tmp.f.challenges[41].unlocked ? new Decimal("e410000")
                :tmp.f.challenges[32].unlocked ? new Decimal("e350000") 
                :tmp.f.challenges[31].unlocked ? new Decimal("e177000") 
                :new Decimal("e155000")
                return req
            },
            display() {
                let f = player.f.points.add(1).max(1)
                let r = "Get " + format(this.req()) + " fatality to unlock a new Challenge. (" + format(f.log10().div(this.req().log10()).mul(100).min(100)) + "%)"
                if (tmp.f.challenges[62].unlocked) r = "All Challenges Unlocked"
                return r
            },
            progress() { 
                let f = player.f.points.add(1).max(1)
                let p = tmp.f.challenges[62].unlocked ? 1 : f.log10().div(this.req().log10())
                return p
            },
        },
    }
})
