addLayer("stat", {
    name: "Statistics", // This is optional, only used in a few places, If absent it just uses the layer id.
    symbol: "ST", // This appears on the layer's node. Default is the id with the first letter capitalized
    position: 0, // Horizontal position within a row. By default it uses the layer id and sorts in alphabetical order
    startData() { return {
        unlocked: true,
        points: decimalZero,
    }},
    tooltip() {
      return "Statistics"
    },
    color: "#FFFFFF",
    requires: decimalZero, // Can be a function that takes requirement increases into account
    resource: "points", // Name of prestige currency
    type: "none", // normal: cost to gain currency depends on amount gained. static: cost depends on how much you already have
    exponent: 0.5, // Prestige currency exponent
    row: "side", // Row the layer is in on the tree (0 is the first row)
    layerShown() { return true },
    tabFormat: {
        "Main": {
        content:[
            "blank",
        ["raw-html", 
            function () {
                if (player.tab == "stat") {
                let a = "You have "+formatWhole(player.points)+" cases.<br><br>"
                let b = "You have "+formatWhole(player.v.points)+" virus points.<br><br>"
                let c = player.i.unlocked?"You have "+formatWhole(player.i.points)+" infectivity.<br><br>":""
                let d = player.r.unlocked?"You have "+formatWhole(player.r.points)+" replicators.<br><br>":""
                let e = player.u.unlocked?"You have "+formatWhole(player.u.points)+" uncoaters.<br><br>":""
                let f = player.s.unlocked?"You have "+formatWhole(player.s.points)+" symptoms.<br><br>":""
                let g = player.s.unlocked?"You have "+formatWhole(player.s.severity)+" severity.<br><br>":""
                let h = player.d.unlocked?"You have "+formatWhole(player.d.points)+" deaths.<br><br>":""
                let h2 = player.f.unlocked?"You have "+formatWhole(player.f.points)+" fatality.<br><br>":""
                let h3 = player.e.unlocked?"You have "+formatWhole(player.e.points)+" infecters.<br><br>":""
                let h4 = player.ct.unlocked?"You have "+formatWhole(player.ct.points)+" CTNA.<br><br>":""
                let i = "'Infection' base:"+format(tmp.v.upgrades[12].base)+"<br><br>"
                let j = player.r.unlocked?"Replicator base:"+format(tmp.r.effbase)+"<br><br>":""
                let k = player.u.unlocked?"Uncoater base:"+format(tmp.u.effbase)+"<br><br>":""
                let l = player.s.unlocked?"Symptom base:"+format(tmp.s.effbase)+"<br><br>":""
                let m = player.e.unlocked?"Infecter base:"+format(tmp.e.effbase)+"<br><br>":""
                let n = hasSUpg(31) || player.d.unlocked?"'Smell Loss' autobuy:"+formatWhole(tmp.s.bulk)+"/" + format(1/tmp.s.speed)+"s (" + format(Decimal.mul(tmp.s.bulk,tmp.s.speed)) + "/s)<br><br>":""
                let o = hasFUpg(25)?"'More Fatal' autobuy:"+formatWhole(tmp.d.bulk)+"/" + format(1/tmp.d.speed)+"s (" + format(Decimal.mul(tmp.d.bulk,tmp.d.speed)) + "/s)<br><br>":""
                let p = hasFUpg(187)?"'More Exponenter' autobuy:"+formatWhole(tmp.f.bulk)+"/" + format(1/tmp.f.speed)+"s (" + format(Decimal.mul(tmp.f.bulk,tmp.f.speed)) + "/s)<br><br>":""
                let q = player.d.buyables[13].gte(2500)?"'Cases Boost' softcap start:"+format(tmp.d.buyables[13].scStart)+"<br><br>":""
                let r = hasMilestone("f",6)?"Multiplier per Fatality Dimension:"+format(tmp.f.multpd)+"<br><br>":""
                let s = player.f.total.gte(Decimal.pow(10,1e3))?"Fatality Dimension Scaling:"+format(tmp.f.DimScaling)+"<br><br>":""
                let t = player.f.total.gte(Decimal.pow(10,420).mul(6.969))?"Fatality Dimension Boost Scaling:"+format(tmp.f.buyables[32].scale)+"<br><br>":""
                let u = player.f.buyables[33].gte(100)?"Distant Multiplier Boost Scaling Start:"+format(tmp.f.buyables[33].distantStart)+"<br><br>":""
                let v = player.f.buyables[33].gte(10000)?"Social Distant Multiplier Boost Scaling Start:"+format(tmp.f.buyables[33].sStart)+"<br><br>":""
                let w = player.e.rna.gte(Decimal.pow(10,1e3))?"Immunity exponent:"+format(tmp.e.iexp)+"<br><br>":""
                let x = hasUpgrade("ct",22)?"After log exponent:"+format(tmp.e.crme)+"<br><br>":""
                let y = hasUpgrade("ct",145)?"Green Exponent:"+format(tmp.ct.getGreenExp)+"<br><br>":""
                let z = hasUpgrade("ct",166)?"Anti-Vaxxer Base:"+format(tmp.ct.getVaxxerBase.b1)+"<br><br>":""
                let aa = hasUpgrade("ct",166)?"Anti-Vaxxer Cost Base:"+format(tmp.ct.getVaxcostBase)+"<br><br>":""
                let ab = hasUpgrade("ct",194)?"Anti-Capped CTNA Effect slog:"+format(tmp.ct.getAntiCapCTNA)+"<br><br>":""
                let ab2 = hasUpgrade("ct",194)?"Anti-Capped CTNA Total Effect slog:"+format(tmp.ct.aCapCtna)+"<br><br>":""
                let ac = player.e.points.gte(tet10(40))?"Social Distant Infecter scaling start:"+format(tet10(tmp.e.scStart))+"<br><br>":""
                let ad = player.ct.buyables[181].gte(298)?"Distant UI Gain scaling start:"+format(tmp.ct.buyables[181].start)+"<br><br>":""
                let ae = player.ct.buyables[181].gte(298)?"Distant UI Gain scaling base:"+format(tmp.ct.buyables[181].dbase,(tmp.ct.buyables[181].dbase.lt(1.001)?5:tmp.ct.buyables[181].dbase.lt(1.01)?4:3))+"<br><br>":""
                let af = player.ct.buyables[181].gte(1e4)?"Social Distant UI Gain scaling start:"+format(tmp.ct.buyables[181].sstart)+"<br><br>":""
                let ag = player.e.points.gte(tet10(2e7))?"Quarantined Infecter scaling start:"+format(tet10(tmp.e.qStart))+"<br><br>":""
                return a+b+c+d+e+f+g+h+h2+h3+h4+i+j+k+l+m+n+o+p+q+r+s+t+u+v+w+x+y+z+aa+ab+ab2+ac+ad+ae+af+ag
                }
            }],
            ]
        },
        "Cases Representation": { // From AD NG+++
            content:[
            "blank",
            ["raw-html", 
            function () {
                if (player.tab == "stat") { 
                let x = player.points.max(1e-111)
                let a = "You have "+format(x)+" cases.<br><br>"
                let p = 6.187e34**3*1e-21
                let height = slog(x).floor().div(100)
                let digits = x.log10().floor().add(1).div(3)
                let years = digits.div(31556952)
                let unis = years.div(13.78e9) 
                let size = formatSize(Decimal.div(1e-21,x.min(p)).root(3))
                let b = "If every case were the size of SARS-VoC-3, and SARS-VoC-3 is "+size+" in diameter, you would have enough to make a SARS-CoV-2 virus."
                if (height.gte(8.8e26)) b = "If every 10 in the cases power tower were 1 centimeter tall, the power tower would be "+formatSize(height) + " tall."
                else if (height.gte(1.71)) b = "If every 10 in the cases power tower were 1 centimeter tall, the power tower would be "+formatSize(height) + " tall (" + heightComp(height) + ")."
                else if (x.gte(tet10(100))) b = "If every 10 in the cases power tower were 1 centimeter tall, the power tower would be "+formatSize(height) + " tall (" + format(height.div(0.0171)) + "% of your height)."
                else if (years.gte(1e40)) b = "The time needed to finish writing your full cases amount at a rate of 3 digits per second would span " + formatTimeLong(digits)+"."
                else if (years.gte(1e9)) {
                    b = "The time needed to finish writing your full cases amount at a rate of 3 digits per second would span "
                    if (unis.lt(1)) b+= format(unis.mul(100)) + "% of the age of the universe."
                    else b+= format(unis) + " times the age of the universe."
                }
                else if (years.gte(2022)) b = "If you wanted to finish writing out your cases amount at a rate of 3 digits per second, you would need to start it in " + eventsTime(years)
                else if (x.gte(Decimal.pow(10,750739887.08))) {b = "If you wrote 3 digits of your cases amount every second since you were born, you would "
                    if (years.gte(79.3)) b += "be a ghost for " + format(years.sub(79.3).div(years).mul(100)) + "% of the session."
	                else b += "waste " + format(years.div(0.793)) + "% of your projected average lifespan."
                }
                else if (x.gte("ee5")) b = "If you wrote 3 digits per second, it would take "+formatTime(digits)+" to write down your cases."
                else if (x.gte(p)) b = "If every case were the size of SARS-VoC-3, and SARS-VoC-3 is 1 Planck Length in diameter, you would have enough to make "+formatComp(x.mul(2.2108845e-105))
                return a+b
                }
            }],
            ],
        },
        "Booster Vaccine Stats": {
            content:[
            "blank",
            ["raw-html", 
            function () {
                if (player.tab == "stat") { 
                    let base = getPointBase()
                    let bmult = getBaseGain()
                    let exp = getGainpowSlog()
                    let cexp = tmp.ct.getBoosterExp
                    let bgain = slog(base).mul(bmult)
                    let bexp = bgain.pow(exp)
                    let bslog = slogadd(bexp,tmp.ct.getBoosterSlog)
                    let mult = getGainMultSlog().div(1e9)
                    let cap = tmp.uv.slogCap
                let a = "Base cases gain: "+format(base)+" cases/s.<br><br>"
                let b = "Base cases gain in 'Booster Vaccine' ("+format(bmult)+"x): "+format(bgain)+" cases/s.<br><br>"
                let c = "Base cases gain in 'Booster Vaccine' with exponents (^"+format(exp)+"):"+format(bexp)+" cases/s.<br><br>"
                let d = "Base cases gain in 'Booster Vaccine' with exponents and slog adders (+"+format(tmp.ct.getBoosterSlog)+"): "+format(bslog.min(mult.pow(cap).max("ee10")))+" (caps at "+format(mult.pow(cap).max("ee10"))+") cases/s.<br><br>"
                let e = "Cases gain multiplier after slog: "+format(mult)+"x.<br><br>"
                let f = "Total cases gain: "+format(bslog.min(mult.pow(cap).max("ee10")).mul(mult))+" cases/s.<br><br>"
                let g = "Total cases gain with exponents (^"+format(cexp)+"): "+format(bslog.min(mult.pow(cap).max("ee10")).mul(mult).pow(cexp))+" cases/s.<br><br>"
                let h = "Base gain cap exponent (After slog mult<sup>exp</sup>): "+format(cap)+".<br><br>"
                return a+b+c+d+e+f+g+h
                }
            }],
            ],
            unlocked() {return inChallenge("ct",32) == true}
        },
    },
})
