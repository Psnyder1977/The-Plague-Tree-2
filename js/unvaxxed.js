addLayer("uv", {
    name: "Unvaxxed Layers", // This is optional, only used in a few places, If absent it just uses the layer id.
    symbol: "Un", // This appears on the layer's node. Default is the id with the first letter capitalized
    position: 3, // Horizontal position within a row. By default it uses the layer id and sorts in alphabetical order
    startData() { return {
        unlocked: true,
        points: decimalZero,
        tree: "normal",
        uvUnlocked: false,
        virus: decimalZero,
        virusBest: decimalZero,
        virusTotal: decimalZero,
        bestPer: decimalZero,
        uvReset: decimalZero,
        uvTime: 0,
        bestTime: 1.79769e308,
        times: decimalZero,
        mutPercent: 3,
        mutPer: 1,
        tmutPercent: 3,
        tmutPer: 1,
        cool: 0,
        autosetting: 0,
        autoreset: false,
        m20: false,
        m24: false,
        m25: false,
        m26: false,
        m27: false,
        m28: false,
        m29: false,
    }},
    update(diff) {
        if (hasUpgrade("uv",81) && player.uv.autoreset && player.uv.cool == 0) {
            let x = player.uv.autosetting%2
            let auto = tmp.uv.clickables[31].gain.gte(player.uv.uvReset) && x == 0
            auto = auto || player.ct.resetTime >= player.uv.uvTime && x == 1
            if (tmp.uv.clickables[31].canClick && auto) {
                layers.uv.clickables[31].onClick()
                player.uv.cool = tmp.uv.buyables[33].effect.toNumber()
            }
        }
        player.uv.cool = Math.max(player.uv.cool-diff,0)
    },
    tooltip() {
        let dis = "Unvaxxed Layers"
        if (player.uv.uvUnlocked) {
            dis = formatWhole(player.uv.virus) + " UnBoosted "+pluralize(player.uv.virus,'Virus','Viruses',true) 
            if (inChallenge("ct",32)) {
                dis += " (+"+formatWhole(tmp.uv.clickables[31].gain)+" on reset)"
            }
        }
        if (inChallenge("ct",32)) {
            if ((tmp.e.clickables[31].canClick || tmp.e.clickables[32].canClick ) && !player.Us.automut) dis += " (You can mutate!)"
        }
      return dis
    },
    shouldNotify() {
        return inChallenge("ct",32) && (((tmp.e.clickables[31].canClick || tmp.e.clickables[32].canClick ) && !player.Us.automut) || tmp.uv.clickables[21].canClick || tmp.uv.buyables[11].canAfford)
    },
    color: "#153d63",
    nodeStyle() {return {
        "background": "radial-gradient(#383434, #153d63)" ,
    }},
    requires: decimalZero, // Can be a function that takes requirement increases into account
    resource: "Unvaxxed Layers", // Name of prestige currency
    resourceSingular: "Unvaxxed Layer",
    type: "none", // normal: cost to gain currency depends on amount gained. static: cost depends on how much you already have
    exponent: 0.5, // Prestige currency exponent
    row: "side", // Row the layer is in on the tree (0 is the first row)
    layerShown() { return player.ct.bestCases.gt(0) || hasUpgrade("ct",314) },
    effLayers() {
        let x = player.uv.points.add(tmp.uv.buyables[103].effect)
        if (hasUpgrade("uv",22)) x = x.add(upgradeEffect("uv",22))
        if (hasUpgrade("uv",23)) x = x.add(upgradeEffect("uv",23))
        return x
    },
    slogCap () {
        let x = decimalFive
        if (hasUpgrade("ct",492)) x = x.add(1)
        if (hasMilestone("ct",17)) x = x.mul(tmp.Uu.milestones[17].effect)
        return x
    },
    virusEffExp() {
        let eff = decimalFour
        if (hasMilestone("uv",8)) eff = eff.add(1)
        if (hasUpgrade("uv",65)) eff = eff.add(tmp.uv.upgrades[65].effect)
        if (hasAchievement("a",271) && player.points.gte(tet10(6))) eff = eff.add(player.a.points.div(10))
        if (hasUpgrade("uv",104)) eff = eff.mul(tmp.uv.upgrades[104].effect2)
        if (inChallenge("Ud",12)) eff = decimalZero
        return eff
    },
    virusEffDil() {
        let eff = decimalOne
        if (hasUpgrade("uv",56)) eff = eff.add(0.5)
        if (hasUpgrade("uv",72)) eff = eff.add(0.2)
        if (hasUpgrade("uv",73)) eff = eff.add(0.2)
        if (hasUpgrade("uv",76)) eff = eff.add(0.3)
        if (hasUpgrade("Us",112)) eff = eff.add(0.5)
        if (hasUpgrade("Us",125)) eff = eff.add(0.3)
        if (hasUpgrade("Us",132)) eff = eff.add(0.1)
        if (hasUpgrade("uv",93)) eff = eff.add(0.1)
        if (hasUpgrade("Ud",23)) eff = eff.add(0.1)
        if (hasUpgrade("Ud",24)) eff = eff.add(0.1)
        if (hasUpgrade("Ud",63)) eff = eff.add(0.3)
        if (hasUpgrade("Ud",64)) eff = eff.add(0.6)
        if (hasUpgrade("Ud",65)) eff = eff.add(0.6)
        if (hasUpgrade("Ud",71)) eff = eff.add(0.116)
        if (hasUpgrade("Ud",152)) eff = eff.add(0.5)
        if (hasUpgrade("uv",102)) eff = eff.add(0.1)
        if (hasUpgrade("uv",103)) eff = eff.add(0.15)
        if (hasUpgrade("uv",112)) eff = eff.add(tmp.uv.buyables[102].effect)
        if (hasMilestone("Ud",8)) eff = eff.add(0.2)
        if (hasMilestone("Ud",36)) eff = eff.add(0.5)
        if (hasMilestone("Ud",52)) {
            if (player.ct.LaBas.gte("3e725")) eff = eff.add(0.1)
            if (player.ct.LaBas.gte("3e737")) eff = eff.add(0.1)
            if (player.ct.LaBas.gte("3e747")) eff = eff.add(0.1)
        }
        if (hasUpgrade("uv",106) && player.Ud.mutants.gte("5e974")) eff = eff.add(0.5)
        if (hasMilestone("uv",25) && player.Ud.points.gte("e935")) eff = eff.add(0.3)
        if (hasMilestone("uv",26) && player.ct.points.gte(1e37)) eff = eff.add(0.3)
        if (hasMilestone("uv",33) && player.ct.points.gte("e2553700")) eff = eff.add(0.2)
        if (hasMilestone("uv",28) && player.uv.virusTotal.gte(1e98)) eff = eff.add(0.2)
        if (hasMilestone("uv",28) && player.uv.virusTotal.gte(1e101)) eff = eff.add(0.2)
        if (hasMilestone("uv",28) && player.uv.virusTotal.gte(1e105)) eff = eff.add(0.2)
        if (hasMilestone("uv",31) && player.uv.virusTotal.gte(1e150)) eff = eff.add(0.134)
        if (hasMilestone("uv",32) && player.uv.virusTotal.gte(1e161)) eff = eff.add(0.2)
        return eff
    },
    virusEff() {
        let exp = tmp.uv.virusEffExp
        let dil = tmp.uv.virusEffDil
        let eff = player.uv.virus.max(player.uv.virusBest.div(3))
        eff = eff.add(1).mul(10).log10().pow(dil).sub(1).mul(exp).pow10()
        return eff
    },
    microtabs: {
        upg: {
            "Upgrades": {
                content: [
                    function () {if (player.tab == "uv" && player.subtabs.uv.mainTabs == "UnBoosted Viruses" && player.subtabs.uv.upg == "Upgrades") return ["upgrades",[5,6,7,8,9,10]]},
                ],
            },
            "Upgrades2": {
                content: [
                    function () {if (player.tab == "uv" && player.subtabs.uv.mainTabs == "UnBoosted Viruses" && player.subtabs.uv.upg == "Upgrades2") return ["upgrades",[11,12,13,14,15,16]]},
                ],
                unlocked() {return hasUpgrade("uv",106)}
            },
            "Upgrades3": {
                content: [
                    function () {if (player.tab == "uv" && player.subtabs.uv.mainTabs == "UnBoosted Viruses" && player.subtabs.uv.upg == "Upgrades3") return ["upgrades",[17,18]]},
                ],
                unlocked() {return false}
            },
            "Cooldown Upgrades": {
                content: [
                    function () {if (player.tab == "uv" && player.subtabs.uv.mainTabs == "UnBoosted Viruses" && player.subtabs.uv.upg == "Cooldown Upgrades") return ["buyables",[2,3,4,5]]},
                ],
                unlocked() {return true}
            },
        },
    },
    tabFormat: {
        "Main": {
        content:[
             ["display-text", 
                function() {
                    let a = "You have unlocked "+layerText("h2", "uv", formatWhole(player.uv.points))+" Unvaxxed "+pluralize(player.uv.points,'Layer','Layers',true)+" ("+layerText("h2", "uv", format(tmp.uv.effLayers))+" effective)<br><br>"
                    let b = inChallenge("ct",32)?"":"<h2>Start 'Booster Vaccine' to unlock this tab.</h2>"
                    return a+b
                }
                ],
            ["bar","prog"], ["bar","un"],
            "blank",
            ["clickables",[1,2]],
            ["buyables",[1]],
            ]
        },
        "Upgrades": {
            content:[
                ["display-text", 
                function() {
                    let a = "You have unlocked "+layerText("h2", "uv", formatWhole(player.uv.points))+" Unvaxxed "+pluralize(player.uv.points,'Layer','Layers',true)+" ("+layerText("h2", "uv", format(tmp.uv.effLayers))+" effective)<br><br>"
                    return a
                }
                ],
            ["upgrades",[1,2,3,4]]
            ],
        },
        "UnBoosted Viruses": {
            content:[
                ["display-text", 
                function() {
                    let a = "You have "+layerText("h2", "uv", formatWhole(player.uv.virus))+" UnBoosted "+pluralize(player.uv.virus,'Virus','Viruses',true)+", which "+pluralize(player.uv.virus,'boosts','boost',true)+" UV to US unvaxxed resource gain by "+layerText("h2", "uv", format(tmp.uv.virusEff))+" (hold shift to see)<br><br>"
                    let b = shiftDown?"Based on max(UnBoosted Viruses, Best UBV/3)<br>Boosts unvaxxed virus, unvaxxed infectivity, unvaxxed replicator, unvaxxed prion, unvaxxed uncoater, unvaxxed severity, unvaxxed pathogen, unvaxxed replicant, all protein, PrP, PrPSc, PrPres, uncoating power, uncoated enzyme, unvaxxed tRNA gain":""
                    return a+b
                }
                ],
            ["clickables",[3]],
            ["display-text", 
                function() {
                    let x = ["UnBoosted Viruses", "seconds"]
                    if (hasUpgrade("uv",81)) return "Reset at x "+x[player.uv.autosetting%x.length]+" (type in Scientific, xFy = yptx)"
                }
            ], //1.9e4949035 = 19 covid
            function() { //e18578774880 = 1 태연
                let x = ["uvReset","uvTime"]
                if (hasUpgrade("uv",81)) return [
                    "text-input",x[player.uv.autosetting%x.length], {
                    color: 'var(--color)',
                    'text-shadow':'0px 0px 10px',
                    width: "600px",
                    "font-size": "24px",
                    border: "2px solid #ffffff17",
                    background: "var(--background)",
                }
                ]
            },
            ["clickables",[4]],
            "blank",
            ["display-text", 
                function() {
                    let best = "Your best UnBoosted Viruses is "+formatWhole(player.uv.virusBest)+"<br>"
                    let total = "You have made a total of "+formatWhole(player.uv.virusTotal)+" UnBoosted "+pluralize(player.uv.virusTotal,'Virus','Viruses',true)+"<br>"
                    let times = "You have reset "+formatWhole(player.uv.times)+pluralize(player.uv.times,' time',' times',true)+"<br>"
                    let time = "Reset time: "+formatTime(player.ct.resetTime)+"<br>"
                    let gainps = player.uv.bestPer
                    let bes = ""
                    if (gainps.lt(1/60)) bes += format(gainps.mul(3600)) + "/hr"
                    else if (gainps.lt(1)) bes += format(gainps.mul(60)) + "/min"
                    else bes += format(gainps) + "/s"
                    let bestps = "Your best UnBoosted Viruses/hr is "+bes+"<br>"
                    let besttime = "Your best reset time is "+formatTime(player.uv.bestTime)+"<br>"
                    let a = "Gain formula: "+format(tmp.uv.clickables[31].gainbase)+"<sup>(slog10(x)-4)<sup>"+format(tmp.uv.clickables[31].gainexp)+"</sup>-1</sup>*"+format(tmp.uv.clickables[31].gainmult)+"<br>"
                    let b = "Effect formula: 10<sup>(log10(10(x+1))<sup>"+format(tmp.uv.virusEffDil)+"</sup>-1)*"+format(tmp.uv.virusEffExp)+"</sup><br>"
                    return best+total+times+time+bestps+besttime+a+b
                }
                ],
                ["microtabs", "upg"],
            ],
            unlocked() { return player.uv.uvUnlocked }
        },
        "Milestones": {
            content:[
                ["display-text", 
                function() {
                    let a = "You have "+layerText("h2", "uv", formatWhole(player.uv.virus))+" UnBoosted "+pluralize(player.uv.virus,'Virus','Viruses',true)+", which "+pluralize(player.uv.virus,'boosts','boost',true)+" unvaxxed resource gain by "+layerText("h2", "uv", format(tmp.uv.virusEff))+" (hold shift to see)<br><br>"
                    let b = shiftDown?"Boosts unvaxxed virus, unvaxxed infectivity, unvaxxed replicator, unvaxxed prion, unvaxxed uncoater, unvaxxed severity, unvaxxed pathogen, unvaxxed replicant, all protein, PrP, PrPSc, PrPres, uncoating power, uncoated enzyme, unvaxxed tRNA gain":""
                    return a+b
                }
                ],
            "milestones"
            ],
            unlocked() { return player.uv.uvUnlocked }
        },
        "Buyables": {
            content:[
                ["display-text", 
                function() {
                    let a = "You have "+layerText("h2", "uv", formatWhole(player.uv.virus))+" UnBoosted "+pluralize(player.uv.virus,'Virus','Viruses',true)+", which "+pluralize(player.uv.virus,'boosts','boost',true)+" unvaxxed resource gain by "+layerText("h2", "uv", format(tmp.uv.virusEff))+" (hold shift to see)<br><br>"
                    let b = shiftDown?"Boosts unvaxxed virus, unvaxxed infectivity, unvaxxed replicator, unvaxxed prion, unvaxxed uncoater, unvaxxed severity, unvaxxed pathogen, unvaxxed replicant, all protein, PrP, PrPSc, PrPres, uncoating power, uncoated enzyme, unvaxxed tRNA gain":""
                    return a+b
                }
                ],
                ["buyables",[10,11]],
            ],
            unlocked() { return hasUpgrade("uv",83) }
        },
    },
    bars: {
        prog: {
            direction: RIGHT,
            width: 700,
            height: 30,
            fillStyle: {'background-color' : "#153d63"},
            display() {
                let f = player.f.points.add(1).max(1)
                let r = "'Booster Vaccine' progress: " + format(player.points)+"/"+format(tet10(Decimal.pow(2,1024).log10()))+" ("+ format(this.progress().mul(100))+"%)"
                return r
            },
            progress() { 
                let p = slog(player.points).div(Decimal.pow(2,1024).log10()).min(1)
                return p
            },
            unlocked() { return inChallenge("ct",32) }, 
        },
        un: {
            direction: RIGHT,
            width: 700,
            height: 30,
            fillStyle: {'background-color' : "#153d63"},
            display() {
                let f = player.f.points.add(1).max(1)
                let gain = tmp.uv.clickables[31].gain
                let prev = tmp.uv.bars.un.prev
                let nx = gain.add(1)
                if (gain.gte(1e3)) nx = gain.log10().floor().add(1).pow10()
                if (gain.gte(1e308)) nx = Decimal.pow(2,1024)
                if (gain.gte(Decimal.pow(2,1024))) nx = Decimal.pow(2,Decimal.pow(2,gain.log(2).log(2).floor().add(1)))
                let next = layers.uv.bars.un.next(nx)
                let prog = this.progress().mul(100)
                let r = "UnBoosted Viruses unlock progress: " + format(player.points)+"/"+format(tet10(5))+" ("+ format(prog)+"%)"
                if (player.uv.uvUnlocked) {
                    if (gain.gt(0)) {
                        r = "Percentage from " +formatWhole(prev)+ " to " + formatWhole(nx) + " UnBoosted Viruses ("+format(next)+"): " + format(prog)+"%"
                        
                    }
                    else r = "Percentage to UnBoosted Viruses ("+format(player.points)+"/"+format(next)+"): " + format(prog)+"%"
                }
                return r
            },
            next(x) {
                x = new Decimal(x)
                let exp = tmp.uv.clickables[31].gainexp
                let mult = tmp.uv.clickables[31].gainmult
                let base = tmp.uv.clickables[31].gainbase
                let next = tet10(x.div(mult).max(1).log(base).add(1).root(exp).add(4))
                return next
            },
            prev() { 
                let gain = tmp.uv.clickables[31].gain
                let nx = gain.add(1)
                if (gain.gte(1e3)) nx = gain.log10().floor().add(1).pow10()
                if (gain.gte(1e308)) nx = Decimal.pow(2,1024)
                if (gain.gte(Decimal.pow(2,1024))) nx = Decimal.pow(2,Decimal.pow(2,gain.log(2).log(2).floor().add(1)))
                let prev = nx.sub(1)
                if (gain.gte(1e3)) prev = nx.div(10)
                if (gain.gte(1e308)) prev = new Decimal(1e308)
                if (gain.gte(Decimal.pow(2,1024))) prev = nx.root(2)
                return prev
            },
            progress() { 
                let gain = tmp.uv.clickables[31].gain
                let prev = tmp.uv.bars.un.prev
                let nx = gain.add(1)
                if (gain.gte(1e3)) nx = gain.log10().floor().add(1).pow10()
                if (gain.gte(1e308)) nx = Decimal.pow(2,1024)
                if (gain.gte(Decimal.pow(2,1024))) nx = Decimal.pow(2,Decimal.pow(2,gain.log(2).log(2).floor().add(1)))
                let slogcases = slog(player.points)
                let slognext = slog(layers.uv.bars.un.next(nx))
                let slogprev = slog(layers.uv.bars.un.next(prev))
                let p = slogcases.div(5)
                if (player.uv.uvUnlocked && gain.gt(0)) p = slogcases.sub(slogprev).div(slognext.sub(slogprev))
                return p.min(1)
            },
            unlocked() { return inChallenge("ct",32) && player.uv.points.gte(6)}, 
        },
    },
    milestones: {
        0: {
            requirementDescription() {return "1 Total UnBoosted Virus (1)"},
            effectDescription() {return "Keep 1st 4 rows of Main US upgrades, 1st 11 and 16th US milestones, 'UnRecover' cooldown is "+formatTime(30)+"."},
            done() { return player.uv.virusTotal.gte(1) }
        },
        1: {
            requirementDescription() {return "2 Total UnBoosted Viruses (2)"},
            effectDescription() {return "Keep 1st row of Unvaxxed tRNA upgrades, 1st 17 US milestones, 'UnRecover' cooldown is "+formatTime(25)+"."},
            done() { return player.uv.virusTotal.gte(2) }
        },
        2: {
            requirementDescription() {return "3 Total UnBoosted Viruses (3)"},
            effectDescription() {return "Keep 2nd row of Unvaxxed tRNA upgrades and 1st 19 US milestones."},
            done() { return player.uv.virusTotal.gte(3) }
        },
        3: {
            requirementDescription() {return "4 Total UnBoosted Viruses (4)"},
            effectDescription() {return "Buy max Unvaxxed tRNA buyables except 'tRNA Formula'."},
            done() { return player.uv.virusTotal.gte(4) }
        },
        4: {
            requirementDescription() {return "10 Total UnBoosted Viruses (5)"},
            effectDescription() {return "Keep 1st 22 US milestones, 'UnRecover' cooldown is "+formatTime(20)+"."},
            done() { return player.uv.virusTotal.gte(10) }
        },
        5: {
            requirementDescription() {return formatTime(600)+" Best Reset Time (6)"},
            effect() {
                let eff = new Decimal(600/Math.max(player.uv.bestTime,1)).add(1)
                return eff
            },
            effectDescription() {return "Best reset time boosts UnBoosted Virus gain, 'UnRetRNA' cooldown is "+formatTime(50)+".<br>Currently: "+format(tmp.uv.milestones[5].effect)+'x'},
            done() { return player.uv.bestTime<=600 }
        },
        6: {
            requirementDescription() {return formatTime(300)+" Best Reset Time (7)"},
            effectDescription() {return "Unlock 'Max All' unvaxxed tRNA buyables, 'UnRecover' cooldown is "+formatTime(15)+"."},
            done() { return player.uv.bestTime<=300 }
        },
        7: {
            requirementDescription() {return "100 Total UnBoosted Viruses (8)"},
            effectDescription() {return "'UnRetRNA' cooldown is "+formatTime(40)+"."},
            done() { return player.uv.virusTotal.gte(100) }
        },
        8: {
            requirementDescription() {return formatTime(180)+" Best Reset Time (9)"},
            effectDescription() {return "You can mutate in US, UnBoosted Virus effect exp+1, 'UnRetRNA' cooldown is "+formatTime(30)+"."},
            done() { return player.uv.bestTime<=180 }
        },
        9: {
            requirementDescription() {return "1,000 Total UnBoosted Viruses (10)"},
            effectDescription() {return "Keep US milestone 23, 'UnRetRNA' cooldown is "+formatTime(25)+""},
            done() { return player.uv.virusTotal.gte(1000) }
        },
        10: {
            requirementDescription() {return formatTime(60)+" Best Reset Time (11)"},
            toggles: [["Us","autotrna"]],
            effectDescription() {return "Autoclick 'Max All' tRNA buyables, 'UnRetRNA' cooldown is "+formatTime(20)+"."},
            done() { return player.uv.bestTime<=60 }
        },
        11: {
            requirementDescription() {return formatTime(30)+" Best Reset Time (12)"},
            toggles: [["Us","autoupg"]],
            effectDescription() {return "Autobuy US upgrades, 'UnRetRNA' cooldown is "+formatTime(18)+".<br>Currently: "+formatTime(player.Us.upgCool)},
            done() { return player.uv.bestTime<=30 }
        },
        12: {
            requirementDescription() {return "1,000,000 Total UnBoosted Viruses (13)"},
            effect() {
                let eff = tmp.ct.timeSpeed.pow(0.3)
                if (hasAchievement("a",265)) eff = eff.pow(10/3)
                return eff
            },
            effectDescription() {return "Time speed boosts base anti-distance gain.<br>Currently: "+format(tmp.uv.milestones[12].effect)+'x'},
            done() { return player.uv.virusTotal.gte(1e6) }
        },
        13: {
            requirementDescription() {return "10,000,000 Total UnBoosted Viruses (14)"},
            effectDescription() {return "UnBoosted Virus gain exponent+0.5."},
            done() { return player.uv.virusTotal.gte(1e7) }
        },
        14: {
            requirementDescription() {return formatTime(10)+" Best Reset Time (15)"},
            toggles: [["Us","automut"]],
            effectDescription() {return "Autobuy mRNA Mutations, you can change percent of max mRNA Mutation attempts, UnBoosted Virus gain*5 at "+format("eee26e18")+" cases, MMNA effect^1.5 at "+format(1e120)+" MMNA, 'CytoMult' and 'GuanBase' are set to best Cytosine and Guanine effect, 'UnRetRNA' cooldown is "+formatTime(17)+".<br>Currently: "+formatTime(player.Us.mutCool)},
            done() { return player.uv.bestTime<=10 }
        },
        15: {
            requirementDescription() {return format(1e12)+" Total UnBoosted Viruses (16)"},
            effectDescription() {return "Anti-Distance gain dilation+0.001, 'AdBases' eff^1.3, Anti-Vax type base gain is dilated^1.5, buy max 'Antiest-Booster Gain'."},
            done() { return player.uv.virusTotal.gte(1e12) }
        },
        16: {
            requirementDescription() {return formatTime(5)+" Best Reset Time (17)"},
            toggles: [["Us","autotmut"]],
            effect() {
                let eff = player.Us.trna
                let e = eff.add(10).log10().div(1e4).max(1).pow(0.2).div(2).min(1)
                return e
            },
            effectDescription() {return "Autobuy tRNA Mutations, you can change percent of max tRNA Mutation attempts, unvaxxed severity effect is based on best, boosted recovery reductions at x tRNA start instantly, raise boosted recovery gain to x (min 0.5, increases with more tRNA starting at "+format("e1e4")+", max 1), 'UnRetRNA' cooldown is "+formatTime(16)+".<br>Currently: ^"+format(tmp.uv.milestones[16].effect)+", "+formatTime(player.Us.tmutCool)},
            done() { return player.uv.bestTime<=5 }
        },
        17: {
            requirementDescription() {return format(1e15)+" Total UnBoosted Viruses (18)"},
            effectDescription() {return "Anti-Distance gain dilation+0.001, 'AdBases' eff^1.1, Anti-Vax type base gain is dilated^1.1."},
            done() { return player.uv.virusTotal.gte(1e15) }
        },
        18: {
            requirementDescription() {return formatTime(4)+" Best Reset Time (19)"},
            effectDescription() {return "Mutated rRNA buyables cost nothing, 'UnRetRNA' cooldown is "+formatTime(15)+"."},
            done() { return player.uv.bestTime<=4 }
        },
        19: {
            requirementDescription() {return formatTime(3)+" Best Reset Time (20)"},
            effectDescription() {return "You can buy max mutated rRNA buyables, 'UnRetRNA' cooldown is "+formatTime(14)+"."},
            done() { return player.uv.bestTime<=3 }
        },
        20: {
            requirementDescription() {return "Reset for "+format(1e20)+" UnBoosted Viruses in "+formatTime(60)+" (21)"},
            toggles: [["Us","autorrna"]],
            effectDescription() {return "Autoclick 'Max All' mutated rRNA buyables, UnBoosted Virus gain base is "+format(202320242025)+",'UnRetRNA' cooldown is "+formatTime(13)+"."},
            done() { return player.uv.m20 }
        },
        21: {
            requirementDescription() {return format(1e32)+" Total UnBoosted Viruses (22)"},
            effectDescription() {return "Anti-Distance gain dilation+0.001, 'Distance Divider' exponent+0.005, time speed*3.2."},
            done() { return player.uv.virusTotal.gte(1e32) }
        },
        22: {
            requirementDescription() {return format(5e35)+" Total UnBoosted Viruses (23)"},
            effectDescription() {return "Anti-Distance gain dilation+0.001, start with "+formatTimeLong(435e15)+" Adverse Vaxxer reset time."},
            done() { return player.uv.virusTotal.gte(5e35) }
        },
        23: {
            requirementDescription() {return " 7 Unlocked Unvaxxed Layers (24)"},
            toggles: [["ct","autoaest"]],
            effectDescription() {return "Autobuy 'Antiest-Booster Gain'."},
            done() { return player.uv.points.gte(7) }
        },
        24: {
            requirementDescription() {return "Reset for "+format(1e50)+" UnBoosted Viruses in "+formatTime(780)+" (25)"},
            effectDescription() {return "Keep 1st 3 UD milestones, UD and CTNA gain*3, gain 0.5% of unvaxxed death gain per second."},
            done() { return player.uv.m24 }
        },
        25: {
            requirementDescription() {return "Reset for "+format(1e64)+" UnBoosted Viruses in "+formatTime(600)+" (26)"},
            effectDescription() {return "Keep 1st 6 UD milestones, 1st 2 rows of UD upgrades, UD and CTNA gain*3 and again at "+format(1e71)+" Total UnBoosted Viruses, UnBoosted Virus effect dilation+0.3 at "+format("e935")+" UD."},
            done() { return player.uv.m25 }
        },
        26: {
            requirementDescription() {return "Reset for "+format(6969e66)+" UnBoosted Viruses in "+formatTime(696.969)+" (27)"},
            effectDescription() {return "Start with 50% of longest Adverse Vaxxer reset time, keep 1st 8 UD milestones, UD and CTNA gain*3 and again at "+format(1e74)+"/"+format(1e77)+"/"+format(1e80)+" Total UnBoosted Viruses, UnBoosted Virus effect dilation+0.3 at "+format(1e37)+" CTNA."},
            done() { return player.uv.m26 }
        },
        27: {
            requirementDescription() {return "Reset for "+format(1e69)+" UnBoosted Viruses in "+formatTime(260.696)+" without 'Deadly Exponent' (28)"},
            effectDescription() {return "Unlock 'Max All' unvaxxed death buyables, UB11 is stronger at +37 effect."},
            done() { return player.uv.m27 }
        },
        28: {
            requirementDescription() {return "Reset for "+format(1e80)+" UnBoosted Viruses in "+formatTime(90)+" (29)"},
            toggles: [["Ud","auto"]],
            effectDescription() {return "Autobuy UD buyables, keep 3rd row UD upgrades, 1st 12 and 16th UD milestones, UnBoosted Virus effect dilation+0.2 at "+format(1e98)+"/"+format(1e101)+"/"+format(1e105)+" Total UnBoosted Viruses, UB11 is stronger at +109 effect."},
            done() { return player.uv.m28 }
        },
        29: {
            requirementDescription() {return "Reset for "+format(1e101)+" UnBoosted Viruses in "+formatTime(120)+" (30)"},
            effectDescription() {return "Keep 4th row UD upgrades, 1st 18 and 23rd UD milestones."},
            done() { return player.uv.m29 }
        },
        30: {
            requirementDescription() {return format(1e130)+" Total UnBoosted Viruses (31)"},
            toggles: [["Ud","autoupg"]],
            effectDescription() {return "Keep UD challenges and 40 challenge points, autobuy UD upgrades.<br>Currently: "+formatTime(player.Ud.upgCool)},
            done() { return player.uv.virusTotal.gte(1e130) }
        },
        31: {
            requirementDescription() {return format(1e147)+" Total UnBoosted Viruses (32)"},
            effectDescription() {return "Unlock 'Max All' deadly mutation reward power buyables, UnBoosted Virus effect dilation+0.134 at "+format(1e150)+" Total UnBoosted Viruses."},
            done() { return player.uv.virusTotal.gte(1e147) }
        },
        32: {
            requirementDescription() {return format(1e158)+" Total UnBoosted Viruses (33)"},
            toggles: [["Ud","autorw"]],
            effectDescription() {return "Autoclick 'Max All' deadly mutation buyables, keep 28th and 30th UD milestones. UnBoosted Virus effect dilation+0.2 at "+format(1e161)+" Total UnBoosted Viruses."},
            done() { return player.uv.virusTotal.gte(1e158) }
        },
        33: {
            requirementDescription() {return format(1e165)+" Total UnBoosted Viruses (34)"},
            effect() {
                let eff = Decimal.add(player.ct.resetTime/3,1).pow(0.4)
                return eff
            },
            effectDescription() {return "Reset time boosts UBV resets gain, unlock time setting in auto-reset, UBV effect dilation+0.2 at "+format("e2553700")+" CTNA, 'UnRetRNA' cooldown is "+formatTime(10.1)+".<br>Currently: "+format(tmp.uv.milestones[33].effect)+"x"},
            done() { return player.uv.virusTotal.gte(1e165) }
        },
        34: {
            requirementDescription() {return format(202e200)+" Total UnBoosted Viruses (35)"},
            effectDescription() {return "Start with 40 Deadly Mutations and 8 'Deadly Reward' buyables, double Deadlier Mutant gain."},
            done() { return player.uv.virusTotal.gte(202e200) }
        },
        35: {
            requirementDescription() {return "1 Deadlier Mutant in "+formatTime(180)+" (36)"},
            effectDescription() {return "Double Deadlier Mutant gain and triple it at "+format(1e210)+" total UnBoosted Viruses."},
            done() { return player.Ud.dmutants.gte(1) && player.ct.resetTime<=180 }
        },
        36: {
            requirementDescription() {return format(1e220)+" Total UnBoosted Viruses (37)"},
            effectDescription() {return "Start with 50 Deadly Mutations, 1st 34 and 41th UD milestones, and 9 'Deadly Reward' buyables, double LaBas and Deadlier Mutant gain and triple it at "+format(1e224)+" total UnBoosted Viruses."},
            done() { return player.uv.virusTotal.gte(1e220) }
        },
        37: {
            requirementDescription() {return format(1e231)+" Total UnBoosted Viruses (38)"},
            effectDescription() {return "Buy max Deadlier Mutant buyables, double LaBas and Deadlier Mutant gain and triple it at "+format(1e234)+" total UnBoosted Viruses."},
            done() { return player.uv.virusTotal.gte(1e231) }
        },
        38: {
            requirementDescription() {return format(1e248)+" Total UnBoosted Viruses (39)"},
            effectDescription() {return "'Max All' buys Deadlier Mutant buyables, Deadly Crow tick interval is halved and again at "+(format(1e264))+" total UnBoosted Viruses."},
            done() { return player.uv.virusTotal.gte(1e248) }
        },
        39: {
            requirementDescription() {return format(1e270)+" Total UnBoosted Viruses (40)"},
            effectDescription() {return "Start with 100 Deadly Mutations and 10 'Deadly Reward' buyables."},
            done() { return player.uv.virusTotal.gte(1e270) }
        },
        40: {
            requirementDescription() {return format(1e30)+" Deadly Crows in "+formatTime(600)+" (41)"},
            effectDescription() {return "'Max All' buys 'Deadly Mutation' and 'Deadly Reward'."},
            done() { return player.Ud.crows.gte(1e30) && player.ct.resetTime<=600 }
        },
        41: {
            requirementDescription() {return format(1e279)+" Total UnBoosted Viruses (42)"},
            effectDescription() {return "'Anti-Base Mult' base after 100 is raised to 5."},
            done() { return player.uv.virusTotal.gte(1e279) }
        },
        42: {
            requirementDescription() {return format(1e291)+" Total UnBoosted Viruses (43)"},
            effectDescription() {return "Social Distant UI Gain is 1.1x weaker, time speed*2.91, dilate 'AdBooster' to 1.1, raise 'AdVaxxed Boost' to 1.5. Raise Anti-Distance effects to 1.035 at "+distShort(3535e32*88e25)+" Anti-Distance."},
            done() { return player.uv.virusTotal.gte(1e291) }
        },
        43: {
            requirementDescription() {return format(295e293)+" Total UnBoosted Viruses (44)"},
            effectDescription() {return "Raise Anti-Distance effects to 1.0295."},
            done() { return player.uv.virusTotal.gte(295e293) }
        },
        44: {
            requirementDescription() {return format("eeeee13115")+" Cases in 'Booster Vaccine' (45)"},
            effect() {
                let eff = slog(player.ct.bestCases.max(10)).div(6).max(1).log10().div(3).add(1).pow(2)
                return eff
            },
            effectDescription() {return "Best cases in 'Booster Vaccine' boost Anti-Distance effects. Reduce 'Anti-Booster Gain' cost exponent by 0.02/0.01/0.01 at "+format(1e302)+"/"+format("e312")+"/"+format("e329")+" total UnBoosted Viruses.<br>Currently: ^"+format(tmp.uv.milestones[44].effect)},
            done() { return player.points.gte("eeeee13115") && inChallenge("ct",32) }
        },
        45: {
            requirementDescription() {return format("e335")+" Total UnBoosted Viruses (46)"},
            effectDescription() {return "Raise Anti-Distance effects to 1.00335 and multiply time speed by 3.35."},
            done() { return player.uv.virusTotal.gte("e335") }
        },
        46: {
            requirementDescription() {return format("e353")+" Total UnBoosted Viruses (47)"},
            effectDescription() {return "Raise Anti-Distance effects to 1.00353 and multiply time speed by 3.53."},
            done() { return player.uv.virusTotal.gte("e353") }
        },
        47: {
            requirementDescription() {return format("e400")+" Total UnBoosted Viruses (48)"},
            effectDescription() {return "Multiply AnTNA gain by 40."},
            done() { return player.uv.virusTotal.gte("e400") }
        },
        48: {
            requirementDescription() {return format("415e413")+" Total UnBoosted Viruses (49)"},
            effectDescription() {return "Multiply AnTNA gain by 4.15 and increase 'AnTNA Base' base by 0.0415."},
            done() { return player.uv.virusTotal.gte("415e413") }
        },
        49: {
            requirementDescription() {return format("e440")+" Total UnBoosted Viruses (50)"},
            effectDescription() {return "Raise base 'Anti-Capped' CTNA slog to 1.2 and multiply AnTNA gain by 5."},
            done() { return player.uv.virusTotal.gte("e440") }
        },
        50: {
            requirementDescription() {return format("455e453")+" Total UnBoosted Viruses (51)"},
            effectDescription() {return "Reduce 'Antiest-Booster Gain' cost exponent by 0.05. Add 0.15 to 'AnTNA 9' exponent."},
            done() { return player.uv.virusTotal.gte("455e453") }
        },
        51: {
            requirementDescription() {return "200,000 Deadly CrowBirds in "+formatTime(888)+" (52)"},
            toggles: [["Ud","autocrow"]],
            effectDescription() {return "Autoclick 'Max All' Deadly Crow buyables and add 0.1 to 'AnTNA 9' exponent. Reduce 'Antiest-Booster Gain' cost exponent by 0.02 and multiply AnTNA gain by 5.2."},
            done() { return player.Ud.crowBirds.gte(2e5) && player.ct.resetTime<=888 }
        },
        52: {
            requirementDescription() {return format("e477")+" Total UnBoosted Viruses (53)"},
            effectDescription() {return "Multiply Deadly Crow birth and death rate by 4.77. Add 0.05 to 'AnTNA 9' (and 'AnTNA 6' at "+format("481e479")+" Total UBV) exponent."},
            done() { return player.uv.virusTotal.gte("e477") }
        },
        53: {
            requirementDescription() {return format("e488")+" Total UnBoosted Viruses (54)"},
            effectDescription() {return "Add 0.25 to base AnTNA gain and 'AnTNA 2' exponent."},
            done() { return player.uv.virusTotal.gte("e488") }
        },
        54: {
            requirementDescription() {return format("e505")+" Total UnBoosted Viruses (55)"},
            effectDescription() {return "Add 0.25 to base AnTNA gain and 'AnTNA 2' exponent. Multiply AnT-Black Hole mass gain by 5.05 (*5.14 at "+format("e514")+" Total UBV)."},
            done() { return player.uv.virusTotal.gte("e505") }
        },
        55: {
            requirementDescription() {return format("e545")+" Total UnBoosted Viruses (56)"},
            effectDescription() {return "'Max All' buys 2nd row Deadly Crow buyables and add 0.005 to 'AnTNA 9' exponent. Multiply AnT-Black Hole mass gain by 10.96 and double Feed cooldown at "+format("e548")+" Total UBV."},
            done() { return player.uv.virusTotal.gte("e545") }
        },
        56: {
            requirementDescription() {return format("e569")+" Total UnBoosted Viruses (57)"},
            effectDescription() {return "Add 0.05 to 'CorVid Gain' exponent and again at "+format("e591")+" Total UBV."},
            done() { return player.uv.virusTotal.gte("e569") }
        },
        57: {
            requirementDescription() {return format("e600")+" Total UnBoosted Viruses (58)"},
            effectDescription() {return "Add 1.5 to 'AnTNA 2' exponent. Raise 'AdBases' effect to 1.3 and base AnT-Black Hole mass gain in gravitons to 1.1."},
            done() { return player.uv.virusTotal.gte("e600") }
        },
        58: {
            requirementDescription() {return format("e629")+" Total UnBoosted Viruses (59)"},
            effectDescription() {return "'Max All' buys 3rd row Deadly Crow buyables and add 0.005 to 'AnTNA 9' exponent. Add 0.03 to 'CorVid Gain' exponent."},
            done() { return player.uv.virusTotal.gte("e629") }
        },
    },
    upgrades: {
        rows: 6,
        cols: 6,
        11: {
            title: "Slog Booster",
            description: "Multiply cases slog by 1.1 (2 in 'Booster Vaccine') per Unvaxxed Layer.",
            cost: new Decimal(1e190),
            currencyDisplayName: "cases in 'Booster Vaccine'",
            effect(){
                let b = 1.1
                if (inChallenge("ct",32)) b = 2
                let eff = Decimal.pow(b,tmp.uv.effLayers)
                return eff
            },
            effectDisplay(){
                return format(tmp.uv.upgrades[11].effect)+"x"
            },
            canAfford () {
                return player.points.gte(1e190) && inChallenge("ct",32)
            },
            pay() {
                player.points = player.points.sub(1e190)
            }
        },
        12: {
            title: "UI Booster",
            description: "Raise UI gain to 1.1 and multiply 'Inf. Mult.' base by 1.1 per UL, Autobuy AdVaccines.",
            cost: new Decimal("e1730"),
            currencyDisplayName: "cases in 'Booster Vaccine'",
            effect(){
                let b = 1.1
                let eff = Decimal.pow(b,tmp.uv.effLayers)
                return eff
            },
            effect2(){
                let b = 1.1
                let eff = Decimal.pow(b,tmp.uv.effLayers)
                return eff
            },
            effectDisplay(){
                return "^"+format(tmp.uv.upgrades[12].effect)+", "+format(tmp.uv.upgrades[12].effect2)+"x"
            },
            canAfford () {
                return player.points.gte("e1730") && inChallenge("ct",32)
            },
            pay() {
                player.points = player.points.sub("e1730")
            }
        },
        13: {
            title: "Effect Booster",
            description: "Raise UI effect to 1.01 (1.15 in 'Booster Vaccine') per Unvaxxed Layer.",
            cost: new Decimal("e101e3"),
            currencyDisplayName: "cases in 'Booster Vaccine'",
            effect(){
                let b = 1.01
                if (inChallenge("ct",32)) b = 1.15
                let eff = Decimal.pow(b,tmp.uv.effLayers)
                return eff
            },
            effectDisplay(){
                return "^"+format(tmp.uv.upgrades[13].effect)
            },
            canAfford () {
                return player.points.gte("e101e3") && inChallenge("ct",32)
            },
            pay() {
                player.points = player.points.sub("e101e3")
            }
        },
        14: {
            title: "Challenge Booster",
            description: "Multiply eff. challenge completions by 1.1 per Unvaxxed Layer.",
            cost: new Decimal("e633e3"),
            currencyDisplayName: "cases in 'Booster Vaccine'",
            effect(){
                let b = 1.1
                let eff = Decimal.pow(b,tmp.uv.effLayers)
                return eff
            },
            effectDisplay(){
                return format(tmp.uv.upgrades[14].effect)+"x"
            },
            canAfford () {
                return player.points.gte("e633e3") && inChallenge("ct",32)
            },
            pay() {
                player.points = player.points.sub("e633e3")
            }
        },
        15: {
            title: "Base Booster",
            description: "Raise 'UI Gain' base to 1.2 (1.5 in 'Booster Vaccine') per Unvaxxed Layer.",
            cost: new Decimal("e5542e3"),
            currencyDisplayName: "cases in 'Booster Vaccine'",
            effect(){
                let b = 1.2
                if (inChallenge("ct",32)) b = 1.5
                let eff = Decimal.pow(b,tmp.uv.effLayers)
                return eff
            },
            effectDisplay(){
                return "^"+format(tmp.uv.upgrades[15].effect)
            },
            canAfford () {
                return player.points.gte("e5542e3") && inChallenge("ct",32)
            },
            pay() {
                player.points = player.points.sub("e5542e3")
            }
        },
        21: {
            title: "Scaling Booster",
            description: "'UI Gain' scalings start 1.1x later (1.5 in 'Booster Vaccine') per Unvaxxed Layer.",
            cost: new Decimal("e725e5"),
            currencyDisplayName: "cases in 'Booster Vaccine'",
            effect(){
                let b = 1.1
                if (inChallenge("ct",32)) b = 1.5
                let eff = Decimal.pow(b,tmp.uv.effLayers)
                return eff
            },
            effectDisplay(){
                return format(tmp.uv.upgrades[21].effect)+"x"
            },
            canAfford () {
                return player.points.gte("e725e5") && inChallenge("ct",32)
            },
            pay() {
                player.points = player.points.sub("e725e5")
            }
        },
        22: {
            title: "Layer Booster",
            description: "Adverse Vaxxers and cases in 'Booster Vaccine' add eff. Unvaxxed Layers.",
            cost: new Decimal("e25e8"),
            currencyDisplayName: "cases in 'Booster Vaccine'",
            effect(){
                let adv = player.ct.Advaxxers.max(10).log10().max(10).log10().pow(1.5)
                let cas = slog(player.points.max(10)).pow(0.5)
                if (!inChallenge("ct",32)) cas = decimalOne
                let eff = adv.mul(cas).div(10).max(1).sub(1)
                return eff
            },
            effectDisplay(){
                return "+"+format(tmp.uv.upgrades[22].effect)
            },
            canAfford () {
                return player.points.gte("e25e8") && inChallenge("ct",32)
            },
            pay() {
                player.points = player.points.sub("e25e8")
            }
        },
        23: {
            title: "Best Booster",
            description: "Best cases in 'Booster Vaccine' add eff. Unvaxxed Layers.",
            cost: new Decimal("e293e28"),
            currencyDisplayName: "cases in 'Booster Vaccine'",
            effect(){
                let cas = slog(player.ct.bestCases.max(10)).pow(0.75)
                let eff = cas.div(1.5).max(1).sub(1)
                return eff
            },
            effectDisplay(){
                return "+"+format(tmp.uv.upgrades[23].effect)
            },
            canAfford () {
                return player.points.gte("e293e28") && inChallenge("ct",32)
            },
            pay() {
                player.points = player.points.sub("e293e28")
            }
        },
        24: {
            title: "AntiLayer",
            description: "Raise Anti-Booster gain to 1.002 per Unvaxxed Layer.",
            cost: new Decimal("ee6060"),
            currencyDisplayName: "cases in 'Booster Vaccine'",
            effect(){
                let eff = Decimal.pow(1.002,tmp.uv.effLayers)
                return eff
            },
            effectDisplay(){
                return "^"+format(tmp.uv.upgrades[24].effect)
            },
            canAfford () {
                return player.points.gte("ee6060") && inChallenge("ct",32)
            },
            pay() {
                player.points = player.points.sub("ee6060")
            }
        },
        25: {
            title: "DistLayer",
            description: "Divide distance by 1.01 per Unvaxxed Layer.",
            cost: new Decimal("eee150"),
            currencyDisplayName: "cases in 'Booster Vaccine'",
            effect(){
                let eff = Decimal.pow(1.01,tmp.uv.effLayers)
                return eff
            },
            effectDisplay(){
                return "/"+format(tmp.uv.upgrades[25].effect)
            },
            canAfford () {
                return player.points.gte("eee150") && inChallenge("ct",32)
            },
            pay() {
                player.points = player.points.sub("eee150")
            }
        },
        31: { // Somi, Chungha
            title: "Time Booster",
            description: "Multiply Time speed by 1.2 per Unvaxxed Layer.",
            cost: new Decimal("eee982900"),
            currencyDisplayName: "cases in 'Booster Vaccine'",
            effect(){
                let Somi = Decimal.pow(1.2,tmp.uv.effLayers)
                return Somi
            },
            effectDisplay(){
                return format(tmp.uv.upgrades[31].effect)+'x'
            },
            canAfford () {
                return player.points.gte("eee982900") && inChallenge("ct",32)
            },
            pay() {
                player.points = player.points.sub("eee982900")
            }
        },
        32: {
            title: "AnDister",
            description: "Multiply Anti-Distance gain by 10 per Unvaxxed Layer after 6, Anti-Distance dilation+0.002.",
            cost: new Decimal("eee75e49"),
            currencyDisplayName: "cases in 'Booster Vaccine'",
            effect(){
                let Chungha = Decimal.pow(10,tmp.uv.effLayers.sub(6))
                if (hasUpgrade("uv",41)) Chungha = Chungha.pow(tmp.uv.upgrades[41].effect)
                return Chungha
            },
            effectDisplay(){
                return format(tmp.uv.upgrades[32].effect)+'x'
            },
            canAfford () {
                return player.points.gte("eee75e49") && inChallenge("ct",32)
            },
            pay() {
                player.points = player.points.sub("eee75e49")
            }
        },
        33: {
            title: "Quarantined Booster",
            description: "Multiply Quarantined infecter start slog by 1.1 per Unvaxxed Layer after 6.",
            cost: new Decimal("eeee182e3"),
            currencyDisplayName: "cases in 'Booster Vaccine'",
            effect(){
                let Somi = Decimal.pow(1.1,tmp.uv.effLayers.sub(6))
                return Somi
            },
            effectDisplay(){
                return format(tmp.uv.upgrades[33].effect)+"x"
            },
            canAfford () {
                return player.points.gte("eeee182e3") && inChallenge("ct",32)
            },
            pay() {
                player.points = player.points.sub("eeee182e3")
            }
        },
        34: {
            title: "Divided Booster",
            description: "Add 0.001 to 'Distance Divider' exponent per Unvaxxed Layer after 7.",
            cost: new Decimal("eeee1751e30"),
            currencyDisplayName: "cases in 'Booster Vaccine'",
            effect(){
                let Chungha = tmp.uv.effLayers.sub(7).mul(0.001)
                return Chungha
            },
            effectDisplay(){
                return "+"+format(tmp.uv.upgrades[34].effect)
            },
            canAfford () {
                return player.points.gte("eeee1751e30") && inChallenge("ct",32)
            },
            pay() {
                player.points = player.points.sub("eeee1751e30")
            }
        },
        35: {
            title: "AnBooster",
            description: "Raise Anti-Distance effects to 1.01 per Unvaxxed Layer after 10 and unlock a buyable.",
            cost: new Decimal("eeeee8461"),
            currencyDisplayName: "cases in 'Booster Vaccine'",
            effect(){
                let Somi = Decimal.pow(1.01,tmp.uv.effLayers.sub(10))
                return Somi
            },
            effectDisplay(){
                return "^"+format(tmp.uv.upgrades[35].effect)
            },
            canAfford () {
                return player.points.gte("eeeee8461") && inChallenge("ct",32)
            },
            pay() {
                player.points = player.points.sub("eeeee8461")
            }
        },
        41: {
            title: "AnDisterer",
            description: "Raise 'AnDister' to 1.2 per Unvaxxed Layer+10.",
            cost: new Decimal("eeeee2978297"),
            currencyDisplayName: "cases in 'Booster Vaccine'",
            effect(){
                let Chungha = Decimal.pow(1.2,tmp.uv.effLayers.add(10))
                return Chungha
            },
            effectDisplay(){
                return "^"+format(tmp.uv.upgrades[41].effect)
            },
            canAfford () {
                return player.points.gte("eeeee2978297") && inChallenge("ct",32)
            },
            pay() {
                player.points = player.points.sub("eeeee2978297")
            }
        },
        51: {
            title: "UB1",
            description: "Unlock 'Max All' severe symptoms, 'ttRNA' cost/10, MMNA gain*3.",
            cost: decimalOne,
            currencyDisplayName: "UnBoosted Virus",
            currencyInternalName: "virus",
            currencyLayer: "uv",
        },
        52: {
            title: "UB2",
            description() {return  "MMNA gain*2, limit*1.5, attempt amount*5. MMNA effect^1.5 at "+format(183e7)+" MMNA."},
            cost: decimalTwo,
            currencyDisplayName: "UnBoosted Viruses",
            currencyInternalName: "virus",
            currencyLayer: "uv",
        },
        53: {
            title: "UB3",
            description() {return  "MMNA gain*2, limit*1.5, attempt amount*2."},
            cost: decimalTen,
            currencyDisplayName: "UnBoosted Viruses",
            currencyInternalName: "virus",
            currencyLayer: "uv",
        },
        54: {
            title: "UB4",
            description() {return  "MMNA effect^1.4."},
            cost: new Decimal(20),
            currencyDisplayName: "UnBoosted Viruses",
            currencyInternalName: "virus",
            currencyLayer: "uv",
        },
        55: {
            title: "UB5",
            description() {return  "MMNA gain, mRNA and tRNA attempt amount*3."},
            cost: new Decimal(100),
            currencyDisplayName: "UnBoosted Viruses",
            currencyInternalName: "virus",
            currencyLayer: "uv",
        },
        56: {
            title: "UB6",
            description() {return  "UnBoosted Virus effect dilation+0.5."},
            cost: new Decimal(200),
            currencyDisplayName: "UnBoosted Viruses",
            currencyInternalName: "virus",
            currencyLayer: "uv",
        },
        61: {
            title: "UB7",
            description() {return  "UnBoosted Virus resets boost UnBoosted Virus gain."},
            cost: new Decimal(2023),
            currencyDisplayName: "UnBoosted Viruses",
            currencyInternalName: "virus",
            currencyLayer: "uv",
            effect(){
                let eff = player.uv.times.div(20).add(1)
                return eff
            },
            effectDisplay(){
                return format(tmp.uv.upgrades[61].effect)+'x'
            },
        },
        62: {
            title: "UB8",
            description() {return  "MMNA boosts unvaxxed tRNA effect."},
            cost: new Decimal(1e4),
            currencyDisplayName: "UnBoosted Viruses",
            currencyInternalName: "virus",
            currencyLayer: "uv",
            effect(){
                let eff = player.e.mm.add(10).log10().pow(0.5).div(30).add(1)
                return eff
            },
            effectDisplay(){
                return "^"+format(tmp.uv.upgrades[62].effect)
            },
        },
        63: {
            title: "UB9",
            description() {return  "mRNA boosts unvaxxed tRNA effect."},
            cost: new Decimal(5e4),
            currencyDisplayName: "UnBoosted Viruses",
            currencyInternalName: "virus",
            currencyLayer: "uv",
            effect(){
                let eff = player.e.mrna.add(10).log10().pow(0.4).div(300).add(1)
                if (eff.gte(15)) eff = eff.div(15).pow(0.5).mul(15)
                if (eff.gte(28)) eff = eff.div(2).add(14)
                if (eff.gte(45)) eff = eff.div(45).pow(0.8).mul(22).add(23)
                if (eff.gte(54)) eff = eff.div(54).pow(0.8).mul(40).add(14)
                return eff
            },
            effectDisplay(){
                return "^"+format(tmp.uv.upgrades[63].effect)
            },
        },
        64: {
            title: "UB10",
            description() {return  "Unvaxxed tRNA boosts unvaxxed tRNA effect."},
            cost: new Decimal(15e5),
            currencyDisplayName: "UnBoosted Viruses",
            currencyInternalName: "virus",
            currencyLayer: "uv",
            effect(){
                let eff = player.Us.trna.add(10).log10().pow(0.45).div(100).add(1)
                if (eff.gte(30)) eff = eff.div(30).pow(0.8).mul(15).add(15)
                if (eff.gte(44)) eff = eff.div(44).pow(0.8).mul(35).add(9)
                return eff
            },
            effectDisplay(){
                return "^"+format(tmp.uv.upgrades[64].effect)
            },
        },
        65: {
            title: "UB11",
            description() {return  "Cases add to UnBoosted Virus effect exp, tRNA attempt amount*3."},
            cost: new Decimal(3e6),
            currencyDisplayName: "UnBoosted Viruses",
            currencyInternalName: "virus",
            currencyLayer: "uv",
            effect(){
                let eff = slog(player.points.max(10)).sub(4.9).max(0).mul(20).pow(1.25)
                if (hasMilestone("uv",27) && eff.gte(37)) eff = eff.div(37).pow(1.7).mul(200).sub(163)
                if (hasMilestone("uv",28) && eff.gte(109)) eff = eff.div(109).pow(2).mul(1109).sub(1000)
                return eff
            },
            effectDisplay(){
                return "+"+format(tmp.uv.upgrades[65].effect)
            },
        },
        66: {
            title: "UB12",
            description() {return  "UnBoosted Viruses boost base anti-distance gain, time speed*3."},
            cost: new Decimal(2e7),
            currencyDisplayName: "UnBoosted Viruses",
            currencyInternalName: "virus",
            currencyLayer: "uv",
            effect(){
                let eff = player.uv.virus.div(1e7).pow(0.5).add(1).mul(10)
                if (eff.gte(1e7)) eff = eff.div(1e7).pow(2).mul(1e7)
                return eff
            },
            effectDisplay(){
                return format(tmp.uv.upgrades[66].effect)+'x'
            },
        },
        71: {
            title: "UB13",
            description() {return  shiftDown?"Effect: 10<sup>log10(UBV effect)<sup>0.4</sup>*"+format(tmp.uv.upgrades[71].exp)+"</sup>":"UnBoosted Viruses boost MMNA gain and limit (shift to see formula), tRNA attempt amount*3."},
            cost: new Decimal(1e9),
            currencyDisplayName: "UnBoosted Viruses",
            currencyInternalName: "virus",
            currencyLayer: "uv",
            exp() {
                let exp = new Decimal(0.1)
                if (hasUpgrade("uv",76)) exp = exp.mul(2)
                if (hasUpgrade("uv",81)) exp = exp.mul(2)
                if (hasUpgrade("uv",85)) exp = exp.mul(1.5)
                if (hasUpgrade("uv",86) && player.Us.severity.gte("e135e12")) exp = exp.mul(1.5)
                if (hasUpgrade("uv",95) && player.Ud.points.gte(1e185)) exp = exp.mul(5)
                if (hasUpgrade("uv",96) && player.Ud.points.gte(303e301)) exp = exp.mul(5)
                return exp
            },
            effect(){
                let exp = tmp.uv.upgrades[71].exp
                let eff = powExp(tmp.uv.virusEff,0.4).pow(exp)
                return eff
            },
            effectDisplay(){
                return format(tmp.uv.upgrades[71].effect)+'x'
            },
        },
        72: {
            title: "UB14",
            description() {return  "UnBoosted Virus effect dilation +0.2, MMNA and mutated rRNA gain*3, keep 3rd row tRNA upgs, US mile 24."},
            cost: new Decimal(5e10),
            currencyDisplayName: "UnBoosted Viruses",
            currencyInternalName: "virus",
            currencyLayer: "uv",
        },
        73: {
            title: "UB15",
            description() {return  "UnBoosted Virus effect dilation +0.2, mutated rRNA gain*3."},
            cost: new Decimal(2e11),
            currencyDisplayName: "UnBoosted Viruses",
            currencyInternalName: "virus",
            currencyLayer: "uv",
        },
        74: {
            title: "UB16",
            description() {return  "CRNA buyables boost CRNA gain at ^0.5 effect, CRNA exponent+0.5."},
            cost: new Decimal(2e14),
            currencyDisplayName: "UnBoosted Viruses",
            currencyInternalName: "virus",
            currencyLayer: "uv",
            effect(){
                let eff = tmp.e.buyables[111].effect.mul(tmp.e.buyables[112].effect).mul(tmp.e.buyables[113].effect).pow(0.5)
                return eff
            },
            effectDisplay(){
                return format(tmp.uv.upgrades[74].effect)+'x'
            },
        },
        75: {
            title: "UB17",
            description() {return  "CRNA buyables boost CRNA gain after log at ^0.3 effect, keep 5th row US upgs, 4th row tRNA upgs, 1st 30 US miles."},
            cost: new Decimal(3e16),
            currencyDisplayName: "UnBoosted Viruses",
            currencyInternalName: "virus",
            currencyLayer: "uv",
            effect(){
                let eff = tmp.e.buyables[121].effect.mul(tmp.e.buyables[122].effect).mul(tmp.e.buyables[123].effect).pow(0.3)
                return eff
            },
            effectDisplay(){
                return format(tmp.uv.upgrades[75].effect)+'x'
            },
        },
        76: {
            title: "UB18",
            description() {return  "Mutated rRNA boosts base CRNA gain, UB13 exp*2, UBV effect dilation+0.3."},
            cost: new Decimal(1e18),
            currencyDisplayName: "UnBoosted Viruses",
            currencyInternalName: "virus",
            currencyLayer: "uv",
            effect(){
                let eff = tmp.Us.rrnaAmt.div(1e12).add(1).pow(0.1)
                if (eff.gte("e3e5")) eff = eff.log10().div(3e5).pow(0.6).mul(3e5).pow10()
                if (eff.gte("e15e5")) eff = eff.log10().div(15e5).pow(0.6).mul(15e5).pow10()
                return eff
            },
            effectDisplay(){
                return format(tmp.uv.upgrades[76].effect)+'x'
            },
        },
        81: { // Chungha = e3094937511
            title: "UB19",
            description() {return  "Unlock auto-reset, double UnBoosted Virus gain per maxed autobuyer, UB13 exponent*2."},
            cost: new Decimal(1e19),
            currencyDisplayName: "UnBoosted Viruses",
            currencyInternalName: "virus",
            currencyLayer: "uv",
            effect(){
                let x = 0 
                for (let a in player.uv.buyables) {
                    if (tmp.uv.buyables[a].effect.lte(0.1) && a<100) x ++
                }
                let Chungha = Decimal.pow(2,x)
                return Chungha
            },
            effectDisplay(){
                return format(tmp.uv.upgrades[81].effect)+'x'
            },
        },
        82: {
            title: "UB20",
            description() {return  shiftDown?"Effect: 10<sup>log10(UBV effect)<sup>0.35</sup>*"+format(tmp.uv.upgrades[82].exp)+"-5</sup>":"UnBoosted Viruses boost base CRNA gain (shift to see formula)."},
            cost: new Decimal(2e21),
            currencyDisplayName: "UnBoosted Viruses",
            currencyInternalName: "virus",
            currencyLayer: "uv",
            exp() {
                let exp = new Decimal(0.09)
                if (hasUpgrade("uv",94) && player.Ud.points.gte(1e45)) exp = exp.mul(3)
                if (hasUpgrade("uv",95) && player.Ud.points.gte(1e185)) exp = exp.mul(5)
                if (hasUpgrade("uv",96) && player.Ud.points.gte(303e301)) exp = exp.mul(5)
                return exp
            },
            effect(){
                let exp = tmp.uv.upgrades[82].exp
                let Chungha = powExp(tmp.uv.virusEff,0.35).pow(exp).div(1e5).max(1)
                return Chungha
            },
            effectDisplay(){
                return format(tmp.uv.upgrades[82].effect)+'x'
            },
        },
        83: {
            title: "UB21",
            description() {return  "Keep 5th row tRNA upgs, 1st 40 and 57th US miles, unlock UBV buyables, unlock Max All rRNA buyables." },
            cost: new Decimal(1e23),
            currencyDisplayName: "UnBoosted Viruses",
            currencyInternalName: "virus",
            currencyLayer: "uv",
        },
        84: {
            title: "UB22",
            description() {return  "UnBoosted Virus gain exponent+0.25." },
            cost: new Decimal(5e28),
            currencyDisplayName: "UnBoosted Viruses",
            currencyInternalName: "virus",
            currencyLayer: "uv",
        },
        85: {
            title: "UB23",
            description() {return  "Double UnBoosted Virus gain per US milestone after 59, UB13 exponent*1.5."},
            cost: new Decimal(1e34),
            currencyDisplayName: "UnBoosted Viruses",
            currencyInternalName: "virus",
            currencyLayer: "uv",
            effect(){
                let x = player.Us.milestones.length-59
                let Chungha = Decimal.pow(2,x).max(1)
                return Chungha
            },
            effectDisplay(){
                return format(tmp.uv.upgrades[85].effect)+'x'
            },
        },
        86: {
            title: "UB24",
            description() {return  "<span style='font-size:9px'>UBVs make unv. sev. 2nd sc. later, UB13 exp*1.5, 'Unva"+colorText("span","#308030","xx")+"ed Severity'^10 at "+format("e135e12")+" unv. sev., UU mile 29 eff*2 at "+format("e169e12")+" unv. sev.</span>"},
            cost: new Decimal(1e35),
            currencyDisplayName: "UnBoosted Viruses",
            currencyInternalName: "virus",
            currencyLayer: "uv",
            effect(){
                let Chungha = player.uv.virus.sub(1e34).max(0).div(1e34).add(10).log10().pow(0.35)
                return Chungha
            },
            effectDisplay(){
                return "^"+format(tmp.uv.upgrades[86].effect)
            },
        },
        91: {
            title: "UB25",
            description() {return  "Unvaxxed death gain*3, 'UnRetRNA' cooldown is "+formatTime(12.5)+"." },
            cost: new Decimal(1e41),
            currencyDisplayName: "UnBoosted Viruses",
            currencyInternalName: "virus",
            currencyLayer: "uv",
        },
        92: {
            title: "UB26",
            description() {return  "Unvaxxed death gain*2, 'UnRetRNA' cooldown is "+formatTime(12)+"." },
            cost: new Decimal(5e42),
            currencyDisplayName: "UnBoosted Viruses",
            currencyInternalName: "virus",
            currencyLayer: "uv",
        },
        93: {
            title: "UB27",
            description() {return  shiftDown?"Effect: 10<sup>log10(UBV effect)<sup>0.3</sup>*"+format(tmp.uv.upgrades[93].exp)+"-7</sup>":"UnBoosted Viruses boost unvaxxed death gain (shift to see formula), UBV effect dilation +0.1."},
            cost: new Decimal(2e43),
            currencyDisplayName: "UnBoosted Viruses",
            currencyInternalName: "virus",
            currencyLayer: "uv",
            exp() {
                let exp = new Decimal(0.08)
                return exp
            },
            effect(){
                let exp = tmp.uv.upgrades[93].exp
                let Chungha = powExp(tmp.uv.virusEff,0.3).pow(exp).div(1e7).max(1)
                return Chungha
            },
            effectDisplay(){
                return format(tmp.uv.upgrades[93].effect)+'x'
            },
        },
        94: {
            title: "UB28",
            description() {return  "CTNA gain*3, UB20 exponent*3 at "+format(1e45)+" unvaxxed deaths, 'UnRetRNA' cooldown is "+formatTime(11.5)+"." },
            cost: new Decimal(5e47),
            currencyDisplayName: "UnBoosted Viruses",
            currencyInternalName: "virus",
            currencyLayer: "uv",
        },
        95: {
            title: "UB29",
            description() {return  "CTNA gain*3, UB13 and UB20 exponent*5 at "+format(1e185)+" unvaxxed deaths, 'UnRetRNA' cooldown is "+formatTime(11)+"." },
            cost: new Decimal(15e53),
            currencyDisplayName: "UnBoosted Viruses",
            currencyInternalName: "virus",
            currencyLayer: "uv",
        },
        96: {
            title: "UB30",
            description() {return  "CTNA gain and 'CRNA Exponent' base*3, UB13, UB20, and UD eff exp*5 at "+format(303e301)+" unvaxxed deaths, 'UnRetRNA' cooldown is "+formatTime(10.8)+"." },
            cost: new Decimal(3e58),
            currencyDisplayName: "UnBoosted Viruses",
            currencyInternalName: "virus",
            currencyLayer: "uv",
        },
        101: { //Somi
            title: "UB31",
            description() {return  shiftDown?"Effect: 10<sup>log10(UBV effect)<sup>0.25</sup>*"+format(tmp.uv.upgrades[101].exp)+"-9</sup>":"UnBoosted Viruses boost CTNA gain (shift to see formula), 'UnRetRNA' cooldown is "+formatTime(10.6)+"."},
            cost: new Decimal(1e83),
            currencyDisplayName: "UnBoosted Viruses",
            currencyInternalName: "virus",
            currencyLayer: "uv",
            exp() {
                let exp = new Decimal(0.04)
                return exp
            },
            effect(){
                let exp = tmp.uv.upgrades[101].exp
                let Somi = powExp(tmp.uv.virusEff,0.25).pow(exp).div(1e9).max(1)
                return Somi
            },
            effectDisplay(){
                return format(tmp.uv.upgrades[101].effect)+'x'
            },
        },
        102: { 
            title: "UB32",
            description() {return  "Anti-Distance dilation+0.001 (+0.0005 at "+format(1e97)+" UBV), UBV effect dilation+0.1, 'UnRetRNA' cooldown is "+formatTime(10.5)+"."},
            cost: new Decimal(5e92),
            currencyDisplayName: "UnBoosted Viruses",
            currencyInternalName: "virus",
            currencyLayer: "uv",
        },
        103: { 
            title: "UB33",
            description() {return  "UBV effect dilation+0.15, 'UnRetRNA' cooldown is "+formatTime(10.4)+", keep UD milestone 25."},
            cost: new Decimal(4e114),
            currencyDisplayName: "UnBoosted Viruses",
            currencyInternalName: "virus",
            currencyLayer: "uv",
        },
        104: { 
            title: "UB34",
            description() {return  "UBV gain boosts UBV resets gain, UBV resets boost UBV eff exp, 'UnRetRNA' cooldown is "+formatTime(10.3)+"."},
            cost: new Decimal(2e122),
            currencyDisplayName: "UnBoosted Viruses",
            currencyInternalName: "virus",
            currencyLayer: "uv",
            effect(){
                let x = tmp.uv.clickables[31].gain.add(10).log10()
                let exp = x.add(10).log10().pow(0.8).add(1).mul(x.add(1).pow(0.3).div(10).add(1))
                let Somi = x.pow(exp).div(1e6).add(1)
                return Somi
            },
            effect2(){
                let Somi = player.uv.times.add(1).div(1e4).pow(1.2).add(1)
                if (Somi.gte(50)) Somi = Somi.div(50).pow(0.5).mul(50)
                if (hasUpgrade("Ud",124)) Somi = Somi.pow(1.25)
                return Somi
            },
            effectDisplay(){
                return format(tmp.uv.upgrades[104].effect)+'x, '+format(tmp.uv.upgrades[104].effect2)+'x'
            },
        },
        105: { 
            title: "UB35",
            description() {return  shiftDown?"Effect: 10<sup>log10(UBV effect)<sup>0.15</sup>*"+format(tmp.uv.upgrades[105].exp)+"-7</sup>":"UnBoosted Viruses boost Deadly Mutant gain (shift to see formula), 'UnRetRNA' cooldown is "+formatTime(10.2)+"."},
            cost: new Decimal(1e141),
            currencyDisplayName: "UnBoosted Viruses",
            currencyInternalName: "virus",
            currencyLayer: "uv",
            exp() {
                let exp = new Decimal(0.01)
                if (hasUpgrade("Ud",172)) exp = exp.mul(100)
                return exp
            },
            effect(){
                let exp = tmp.uv.upgrades[105].exp
                let Somi = powExp(tmp.uv.virusEff,0.15).pow(exp).div(1e7).max(1)
                return Somi
            },
            effectDisplay(){
                return format(tmp.uv.upgrades[105].effect)+'x'
            },
        },
        106: { 
            title: "UB36",
            description() {return  "'UnRetRNA' cooldown is "+formatTime(10)+" (always active) and unlock 'Max All' deadly mutant buyables, UBV eff dil+0.5 at "+format("5e974")+" Deadly Mutants."},
            cost: new Decimal(1e186),
            currencyDisplayName: "UnBoosted Viruses",
            currencyInternalName: "virus",
            currencyLayer: "uv",
        },
        111: { 
            title: "UB37",
            description() {return  shiftDown?"Effect: 10<sup>log10(UBV effect)<sup>0.125</sup>*"+format(tmp.uv.upgrades[111].exp)+"-9</sup>":"UnBoosted Viruses boost Deadlier Mutant gain (shift to see formula)."},
            cost: new Decimal(214e212),
            currencyDisplayName: "UnBoosted Viruses",
            currencyInternalName: "virus",
            currencyLayer: "uv",
            exp() {
                let exp = new Decimal(0.005)
                if (hasUpgrade("Ud",172)) exp = exp.mul(10)
                if (hasMilestone("Ud",79) && player.ct.CorVid.gte(4e87)) exp = exp.mul(100)
                return exp
            },
            effect(){
                let exp = tmp.uv.upgrades[111].exp
                let Somi = powExp(tmp.uv.virusEff,0.125).pow(exp).div(1e9).max(1)
                return Somi
            },
            effectDisplay(){
                return format(tmp.uv.upgrades[111].effect)+'x'
            },
        },
        112: { 
            title: "UB38",
            description() {return  shiftDown?"Effect: 10<sup>log10(UBV effect)<sup>0.11</sup>*"+format(tmp.uv.upgrades[112].exp)+"-6</sup>":"UnBoosted Viruses boost LaBas gain (shift to see formula) and unlock a buyable."},
            cost: new Decimal(232e230),
            currencyDisplayName: "UnBoosted Viruses",
            currencyInternalName: "virus",
            currencyLayer: "uv",
            exp() {
                let exp = new Decimal(0.005)
                if (hasUpgrade("Ud",172)) exp = exp.mul(2)
                if (hasMilestone("Ud",79) && player.ct.CorVid.gte(4e87)) exp = exp.mul(10)
                return exp
            },
            effect(){
                let exp = tmp.uv.upgrades[112].exp
                let Somi = powExp(tmp.uv.virusEff,0.11).pow(exp).div(1e6).max(1)
                return Somi
            },
            effectDisplay(){
                return format(tmp.uv.upgrades[112].effect)+'x'
            },
        },
        113: { 
            title: "UB39",
            description() {return  shiftDown?"Effect: 10<sup>log10(UBV effect)<sup>0.085</sup>*"+format(tmp.uv.upgrades[113].exp)+"-1</sup>":"UnBoosted Viruses boost Deadly Crow birth rate (shift to see formula)."},
            cost: new Decimal(1e256),
            currencyDisplayName: "UnBoosted Viruses",
            currencyInternalName: "virus",
            currencyLayer: "uv",
            exp() {
                let exp = new Decimal(0.0035)
                if (hasMilestone("Ud",79) && player.ct.CorVid.gte(4e87)) exp = exp.mul(3)
                return exp
            },
            effect(){
                let exp = tmp.uv.upgrades[113].exp
                let Somi = powExp(tmp.uv.virusEff,0.085).pow(exp).div(10).max(1)
                return Somi
            },
            effectDisplay(){
                return format(tmp.uv.upgrades[113].effect)+'x'
            },
        },
        114: { 
            title: "UB40",
            description() {return shiftDown?"Anti-Distance buyables (Row 3) softcap at 1,000: x → (log10(x)+7)<sup>3</sup>":"Anti-Distancing buyables after 7,000 multiply 'Boosterain' effective buyable amount by 1.003."},
            cost: new Decimal(1e285),
            currencyDisplayName: "UnBoosted Viruses",
            currencyInternalName: "virus",
            currencyLayer: "uv",
            effect(){
                let exp = decimalZero
                for (i = 0; i < player.ct.distBuyId.length; i++){
                    let amt = player.ct.buyables[player.ct.distBuyId[i]]
                    if (player.ct.distBuyId[i]>280 && amt.gte(1e3)) {
                        amt = amt.log10().add(7).pow(3)
                    }
                    exp = exp.add(amt)
                }
                let Somi = Decimal.pow(1.003,exp.sub(7000).max(0))
                return Somi
            },
            effectDisplay(){
                return format(tmp.uv.upgrades[114].effect)+'x'
            },
        },
        115: { 
            title: "UB41",
            description() {return "<span style='font-size:9px'>Longest Adverse Vaxxer reset time boosts UBV gain base (starts at "+formatTimeLong(1e60)+"), time speed*3.16, and unlock a buyable.</span>"},
            cost: new Decimal("e316.5"),
            currencyDisplayName: "UnBoosted Viruses",
            currencyInternalName: "virus",
            currencyLayer: "uv",
            effect(){
                let time = player.ct.bestTime.max(player.ct.AdvVaxTime)
                if (time.gte(31556952e123)) time = time.div(31556952).log10().div(123).pow(0.8).mul(18).add(105).pow10().mul(31556952)
                let Somi = powExp(time.div(1e60).sub(1).max(0).pow(0.5).mul(10),0.5).div(100).add(1)
                return Somi
            },
            effectDisplay(){
                return format(tmp.uv.upgrades[115].effect)+'x'
            },
        },
        116: { 
            title: "UB42",
            description() {return "Deadly Crows divide their interval."},
            cost: new Decimal("339e337"),
            currencyDisplayName: "UnBoosted Viruses",
            currencyInternalName: "virus",
            currencyLayer: "uv",
            effect(){
                let Somi = powExp(player.Ud.crows.add(1),0.45).pow(0.1)
                return Somi
            },
            effectDisplay(){
                return "/"+format(tmp.uv.upgrades[116].effect)
            },
        },
        121: { 
            title: "UB43",
            description() {return "Bought Deadly Crows after 30 divide their interval."},
            cost: new Decimal("e357"),
            currencyDisplayName: "UnBoosted Viruses",
            currencyInternalName: "virus",
            currencyLayer: "uv",
            effect(){
                let Somi = Decimal.pow(1.2,player.Ud.buyables[101].sub(30).max(0).pow(1.1))
                return Somi
            },
            effectDisplay(){
                return "/"+format(tmp.uv.upgrades[121].effect)
            },
        },
        122: { 
            title: "UB44",
            description() {return  shiftDown?"Effect: (UBV / "+format("e380")+")<sup>0.05</sup> + 1":"UnBoosted Viruses boost AnTNA gain (shift to see formula)."},
            cost: new Decimal("382e380"),
            currencyDisplayName: "UnBoosted Viruses",
            currencyInternalName: "virus",
            currencyLayer: "uv",
            effect(){
                let Somi = player.uv.virus.div("e380").pow(0.05).add(1)
                return Somi
            },
            effectDisplay(){
                return format(tmp.uv.upgrades[122].effect)+"x"
            },
        },
        123: { 
            title: "UB45",
            description() {return "Deadly CrowBirds divide Deadly Crow interval."},
            cost: new Decimal("e422"),
            currencyDisplayName: "UnBoosted Viruses",
            currencyInternalName: "virus",
            currencyLayer: "uv",
            effect(){
                let Somi = powExp(player.Ud.crowBirds.div(10).add(1),0.65).pow(0.3)
                return Somi
            },
            effectDisplay(){
                return "/"+format(tmp.uv.upgrades[123].effect)
            },
        },
        124: { 
            title: "UB46",
            description() {return "Autobuyer interval limit is "+formatTime(0.01)+". Autobuyer interval below "+formatTime(0.1)+" boosts UBV gain base."},
            cost: new Decimal("e441"),
            currencyDisplayName: "UnBoosted Viruses",
            currencyInternalName: "virus",
            currencyLayer: "uv",
            effect(){
                let Somi = decimalOne
                for (let a in player.uv.buyables) {
                    if (tmp.uv.buyables[a].effect.lte(0.1) && a<100) Somi = Somi.mul(tmp.uv.buyables[a].effect.recip().div(10).pow(0.35).sub(1).mul(3).pow10())
                }
                return Somi
            },
            effectDisplay(){
                return format(tmp.uv.upgrades[124].effect)+"x"
            },
        },
        125: { 
            title: "UB47",
            description() {return "Double DC birth and death rate and again at "+format("468e466")+" total UBV. Add 0.05 to 'UnBoosted Layer' base and 'AnTNA 9' exponent."},
            cost: new Decimal("467e465"),
            currencyDisplayName: "UnBoosted Viruses",
            currencyInternalName: "virus",
            currencyLayer: "uv",
        },
        126: { 
            title: "UB48",
            description() {return "Add 0.1 to 'UnBoosted Base' base. Divide Deadly CrowBird interval by 1.5."},
            cost: new Decimal("e479"),
            currencyDisplayName: "UnBoosted Viruses",
            currencyInternalName: "virus",
            currencyLayer: "uv",
        },
        131: {//Hyojung, Mimi, YooA, Seunghee, Yubin, Arin
            title: "UB49",
            description() {return shiftDown?"Effect: 10<sup>log10(AnTNA / "+format("e525")+" + 1)<sup>0.65</sup> * 0.08</sup>":"UnBoosted Viruses boost AnT-Black Hole mass gain (shift to see formula)."},
            cost: new Decimal("e539"),
            currencyDisplayName: "UnBoosted Viruses",
            currencyInternalName: "virus",
            currencyLayer: "uv",
            effect(){
                let Hyojung = powExp(player.uv.virus.div("e525").add(1),0.65).pow(0.07)
                return Hyojung
            },
            effectDisplay(){
                return format(tmp.uv.upgrades[131].effect)+"x"
            },
        },
        132: { 
            title: "UB50",
            description() {return  shiftDown?"Effect: 10<sup>log10(UBV effect)<sup>0.05</sup>*"+format(tmp.uv.upgrades[112].exp)+"-1</sup>":"UnBoosted Viruses boost CorVid gain (shift to see formula)."},
            cost: new Decimal("e574"),
            currencyDisplayName: "UnBoosted Viruses",
            currencyInternalName: "virus",
            currencyLayer: "uv",
            exp() {
                let exp = new Decimal(0.01)
                return exp
            },
            effect(){
                let exp = tmp.uv.upgrades[132].exp
                let Mimi = powExp(tmp.uv.virusEff,0.05).pow(exp).div(10).max(1)
                return Mimi
            },
            effectDisplay(){
                return format(tmp.uv.upgrades[132].effect)+'x'
            },
        },
        133: { 
            title: "UB51",
            description() {return "Add 0.02 to 'CorVid Gain' exponent."},
            cost: new Decimal("e646"),
            currencyDisplayName: "UnBoosted Viruses",
            currencyInternalName: "virus",
            currencyLayer: "uv",
        },
    },
    clickables: {
        rows: 4,
        cols: 2,
        11: {
            display() {
                return "<h2>Switch to Normal Layers</h2>"
            },
            canClick() {return true},
            unlocked() { return inChallenge("ct",32) }, 
            onClick() {
                player.uv.tree = "normal"
            },
        },
        12: {
            display() {
                return "<h2>Switch to Unvaxxed Layers</h2>"
            },
            canClick() {return true},
            unlocked() { return inChallenge("ct",32) }, 
            onClick() {
                player.uv.tree = "unvaxxed"
            },
        },
        21: {
            display() {
                return "<h2>Unlock UnBoosted Viruses</h2><br>Requires: "+format(tet10(5))+" cases"
            },
            canClick() {return inChallenge("ct",32) && player.points.gte(tet10(5)) && !player.uv.uvUnlocked},
            unlocked() { return inChallenge("ct",32) && player.uv.points.gte(6) && !player.uv.uvUnlocked }, 
            onClick() {
                player.uv.uvUnlocked = true
            },
        },
        31: {
            display() {
                let gain = tmp.uv.clickables[31].gain
                let resetgain = tmp.uv.clickables[31].resetgain
                let next = tmp.uv.clickables[31].next
                let time = player.ct.resetTime
                let gainps = Decimal.div(gain,time)
                let reset = ""
                if (hasUpgrade("uv",104)) reset = " and "+formatWhole(resetgain)+pluralize(resetgain,' reset',' resets',true)
                let dis = "Reset 'Booster Vaccine' for <h3>"+formatWhole(gain)+"</h3> UnBoosted "+pluralize(gain,'Virus','Viruses',true)+reset+"<br><br>"
                if (gain.lt(1e6)) dis += "Next at " + format(next) + " cases<br>"
                if (gainps.lt(1/60)) dis += format(gainps.mul(3600)) + "/hr"
                else if (gainps.lt(1)) dis += format(gainps.mul(60)) + "/min"
                else dis += format(gainps) + "/s"
                //dis += "<br>" + format(resetgain.div(time)) +" resets/s"
                return dis
            },
            resetgain() {
                let gain = decimalOne
                if (hasUpgrade("uv",104)) gain = gain.mul(tmp.uv.upgrades[104].effect)
                if (hasMilestone("uv",33)) gain = gain.mul(tmp.uv.milestones[33].effect)
                return gain.floor()
            },
            gain() {//base^((slog(x)-4)^exp-1)
                let exp = tmp.uv.clickables[31].gainexp
                let mult = tmp.uv.clickables[31].gainmult
                let base = tmp.uv.clickables[31].gainbase
                let gain = Decimal.pow(base,slog(player.points).sub(4).pow(exp).sub(1)).mul(mult)
                if (player.points.lt(tet10(5))) return decimalZero
                return gain.floor()
            },
            gainmult() {
                let mult = tmp.uv.buyables[101].effect
                if (hasUpgrade("uv",61)) mult = mult.mul(tmp.uv.upgrades[61].effect)
                if (hasUpgrade("uv",81)) mult = mult.mul(tmp.uv.upgrades[81].effect)
                if (hasUpgrade("uv",85)) mult = mult.mul(tmp.uv.upgrades[85].effect)
                if (hasUpgrade("ct",554)) mult = mult.mul(tmp.ct.upgrades[554].effect)
                if (hasMilestone("Us",24)) mult = mult.mul(tmp.Us.milestones[24].effect)
                if (hasMilestone("Ud",11)) mult = mult.mul(tmp.Ud.milestones[11].effect)
                if (hasMilestone("uv",5)) mult = mult.mul(tmp.uv.milestones[5].effect)
                if (hasMilestone("uv",14) && player.points.gte("eee26e18")) mult = mult.mul(5)
                if (hasAchievement("a",261)) mult = mult.mul(tmp.a.achievements[261].effect)
                return mult
            },
            gainbase() {
                let exp = new Decimal(2023)
                if (hasUpgrade("ct",545)) exp = new Decimal(20232024)
                if (hasMilestone("uv",20)) exp = new Decimal(202320242025)
                if (hasUpgrade("uv",115)) exp = exp.mul(tmp.uv.upgrades[115].effect)
                if (hasUpgrade("uv",124)) exp = exp.mul(tmp.uv.upgrades[124].effect)
                if (hasUpgrade("ct",642) && player.points.gte("eeeee7144e3")) exp = exp.mul(1.5)
                if (hasMilestone("Ud",60) && player.Ud.crows.gte(Decimal.pow(2,1024))) exp = exp.mul(3.08)
                exp = exp.mul(tmp.uv.buyables[111].effect2)
                return exp
            },
            gainexp() {
                let exp = decimalOne
                if (hasMilestone("uv",13)) exp = exp.add(.5)
                if (hasUpgrade("uv",84)) exp = exp.add(.25)
                if (hasUpgrade("Us",134)) exp = exp.add(.05)
                if (hasUpgrade("Us",135)) exp = exp.add(.05)
                if (hasAchievement("a",271)) exp = exp.add(.05)
                return exp
            },
            next() {
                let gain = tmp.uv.clickables[31].gain
                let exp = tmp.uv.clickables[31].gainexp
                let mult = tmp.uv.clickables[31].gainmult
                let base = tmp.uv.clickables[31].gainbase
                let next = tet10(gain.add(1).div(mult).max(1).log(base).add(1).root(exp).add(4))
                return next
            },
            unlocked() {
                return player.uv.uvUnlocked && inChallenge("ct",32)
            },
            canClick() {return player.points.gte(tet10(5)) && inChallenge("ct",32)},
            onClick() {
                let gain = tmp.uv.clickables[31].gain
                let resetgain = tmp.uv.clickables[31].resetgain
                let next = tmp.uv.clickables[31].next
                let time = player.ct.resetTime
                let gainps = Decimal.div(gain,time)
                player.uv.bestPer = gainps.max(player.uv.bestPer)
                if (time<player.uv.bestTime) player.uv.bestTime = time
                player.uv.times = player.uv.times.add(resetgain)
                player.uv.mutPercent = player.Us.mutPercent
                player.uv.mutPer = player.Us.mutPer
                player.uv.tmutPercent = player.Us.tmutPercent
                player.uv.tmutPer = player.Us.tmutPer
                if (gain.gte(1e20) && time<=60) player.uv.m20 = true
                if (gain.gte(1e50) && time<=780) player.uv.m24 = true
                if (gain.gte(1e64) && time<=600) player.uv.m25 = true
                if (gain.gte(6969e66) && time<=696.969) player.uv.m26 = true
                if (gain.gte(1e80) && time<=90) player.uv.m28 = true
                if (gain.gte(1e101) && time<=120) player.uv.m29 = true
                if (gain.gte(1e69) && time<=260.696 && player.Ud.buyables[13].eq(0)) player.uv.m27 = true
                completeChallenge("ct",32)
                startChallenge("ct",32)
            },
            style: {'height':'130px', 'width':'175px', 'font-size':'13px',"background"() {
                let color = "#bf8f8f"
                if (tmp.uv.clickables[31].canClick) color = "radial-gradient(#383434, #153d63)"
                return color
                }
            }
        },
        32: {
            display() {
                return "<h2>Reset 'Booster Vaccine'<br>"
            },
            canClick() {return true},
            unlocked() { return player.uv.uvUnlocked && inChallenge("ct",32)}, 
            onClick() {
                if (!confirm("Are you sure you want to do this? You will lose all your progress in 'Booster Vaccine'!")) return
                player.uv.mutPercent = player.Us.mutPercent
                player.uv.mutPer = player.Us.mutPer
                player.uv.tmutPercent = player.Us.tmutPercent
                player.uv.tmutPer = player.Us.tmutPer
                let gain = tmp.uv.clickables[31].gain
                let time = player.ct.resetTime
                if (gain.gte(1e20) && time<=60) player.uv.m20 = true
                if (gain.gte(1e50) && time<=780) player.uv.m24 = true
                if (gain.gte(1e64) && time<=600) player.uv.m25 = true
                if (gain.gte(6969e66) && time<=696.969) player.uv.m26 = true
                if (gain.gte(1e80) && time<=90) player.uv.m28 = true
                if (gain.gte(1e101) && time<=120) player.uv.m29 = true
                if (gain.gte(1e69) && time<=260.696 && player.Ud.buyables[13].eq(0)) player.uv.m27 = true
                completeChallenge("ct",32)
                startChallenge("ct",32)
            },
            style: {'height':'130px', 'width':'175px', 'font-size':'13px',"background"() {
                let color = "#bf8f8f"
                if (tmp.uv.clickables[32].canClick) color = "radial-gradient(#383434, #153d63)"
                return color
                }
            }
        },
        41: {
            display() {
                return "<h3>Auto-Reset for UnBoosted Viruses</h3><br>"+(player.uv.autoreset?"ON":"OFF")+"<br></h2>"+formatTime(player.uv.cool)
            },
            canClick() {return true},
            onClick() {
                player.uv.autoreset=(player.uv.autoreset?false:true)
            },
            unlocked() {return hasUpgrade("uv",81)},
            style: {'height':'100px', 'min-height':'100px', 'width':'100px'},
        },
        42: {
            display() {
                let x = ["AMOUNT", "TIME"]
                return "<h3>Auto-Reset setting: "+x[player.uv.autosetting%x.length]+"</h3><br>"
            },
            canClick() {return true},
            onClick() {
                player.uv.autosetting ++
            },
            unlocked() {return hasMilestone("uv",33)},
            style: {'height':'100px', 'min-height':'100px', 'width':'100px'},
        },
    },
    buyables:{
        11: {
            title: "Unvaxxed Layer",
            cost() { // cost for buying xth buyable, can be an object if there are multiple currencies
                let x = player.uv.buyables[11]
                let cost = [1,Decimal.pow(2,1024),"e182e3","ee10","e3.4e101","ee1075e25","eee15e181","eeeeeeee10"]
                return new Decimal(cost[x])
            },
            effect() { // Effects of owning x of the items, x is a decimal
                let x = player.uv.buyables[11]
                return x;
            },
            display() { // Everything else displayed in the buyable button after the title
                let x = player.uv.buyables[11]
                if (player.tab != "uv") return
                let extra = ""
                let dis = "Unlock an Unvaxxed layer"
                if (player.uv.points.gte(7)) dis += " (next update)"
                return dis + ".\n\
                Requires: " + formatWhole(tmp[this.layer].buyables[this.id].cost)+" case"+(x.eq(0)?'':'s')+"\n\
                Amount: " + formatWhole(getBuyableAmount("uv", 11))
            },
            unlocked() { return inChallenge("ct",32) }, 
            canAfford() {
                    return player.points.gte(tmp[this.layer].buyables[this.id].cost) && player.uv.points.lt(7)},
            buy() { 
                cost = tmp[this.layer].buyables[this.id].cost
                let max = tmp.uv.buyables[11].maxAfford
                let b = max.max(1)
                if (tmp[this.layer].buyables[this.id].canAfford) {
                    player.uv.points = player.uv.points.add(1)
                    player[this.layer].buyables[this.id] = player[this.layer].buyables[this.id].add(1).max(1)
                }
            },
            maxAfford() {
                let s = player.ct.Advaxxers
                let target = s.div("e1111").log10().div(10).root(1.3)
                return target.floor()
            },
            buyMax() { // logr(s(r-1)/a1+1)=(n)
                let target = tmp.ct.buyables[221].maxAfford
                let cost = Decimal.pow(1e6,target.pow(1.3)).mul("e1111")
                let diff = target
                if (tmp[this.layer].buyables[this.id].canAfford) {
                    player.ct.Advaxxers = player.ct.Advaxxers.sub(cost).max(0)
                    player.ct.Atb = player.ct.Atb.add(diff)
                    player.ct.buyables[221] = player.ct.buyables[221].add(diff)
                
                }
            },
    },
    21: {
            title: "Max Severe Cooldown",
            cost() { // cost for buying xth buyable, can be an object if there are multiple currencies
                let base = tmp.uv.buyables[21].costb
                let exp = tmp.uv.buyables[21].coste
                let mult = decimalOne
                let x = player.uv.buyables[21]
                if (x.gte(13)) {
                    x = x.sub(13).pow(1.4).mul(Decimal.log(1e10,base))
                    mult = new Decimal("e440")
                }
                let cost = Decimal.pow(base,x.pow(exp)).mul(mult)
                return cost
            },
            costb() { // cost for buying xth buyable, can be an object if there are multiple currencies
                let cost = decimalThree
                return cost
            },
            coste() { 
                let cost = decimalOne
                return cost
            },
            int() {
                let i = 0.1
                if (hasUpgrade("uv",124)) i = 0.01
                return i
            },
            effect() { // Effects of owning x of the items, x is a decimal
                let x = player.uv.buyables[21]
                let i = tmp.uv.buyables[21].int
                return Decimal.pow(0.7, x).mul(10).max(0.1).mul(Decimal.pow(0.9, x.sub(13).max(0))).max(i);
            },
            display() { // Everything else displayed in the buyable button after the title
                if (player.tab != "uv" || player.subtabs.uv.mainTabs != "UnBoosted Viruses") return
                let extra = ""
                let dis = "Reduce 'Max All' severe symptoms cooldown by "+(player.uv.buyables[this.id].gte(13)?"10":"30")+"%"
                let i = tmp.uv.buyables[21].int
                if (tmp[this.layer].buyables[this.id].effect.eq(i)) dis+= ' (MAXED)'
                return dis + ".\n\
                Cost: " + formatWhole(tmp[this.layer].buyables[this.id].cost)+" UnBoosted "+(tmp.uv.buyables[21].cost.eq(1)?"Virus":"Viruses")+"\n\
                Cooldown: " + formatTime(tmp[this.layer].buyables[this.id].effect)+"\n\
                Amount: " + formatWhole(getBuyableAmount("uv", 21))
            },
            unlocked() { return hasUpgrade("uv",51)}, 
            canAfford() {
                    return player.uv.virus.gte(tmp[this.layer].buyables[this.id].cost) && tmp[this.layer].buyables[this.id].effect.gt(tmp.uv.buyables[21].int)},
            buy() { 
                cost = tmp[this.layer].buyables[this.id].cost
                let max = tmp.uv.buyables[21].maxAfford
                let b = max.max(1)
                if (tmp[this.layer].buyables[this.id].canAfford) {
                    if (false) player[this.layer].buyables[this.id] = b
                    else {
                        player.uv.virus = player.uv.virus.sub(cost)
                        player[this.layer].buyables[this.id] = player[this.layer].buyables[this.id].add(1).max(1)
                    }
                }
            },
            maxAfford() {
                let s = player.uv.virus
                let base = tmp.uv.buyables[21].costb
                let exp = tmp.uv.buyables[21].coste
                let target = s.log(base).root(exp).floor().add(1)
                if (!hasUpgrade("uv",124)) return target.min(13)
                if (target.gte(13)) target = s.div("e440").log(1e10).root(1.4).floor().add(14)
                return target
            },
        },
        22: {
            title: "Max tRNA Cooldown",
            cost() { // cost for buying xth buyable, can be an object if there are multiple currencies
                let base = tmp.uv.buyables[22].costb
                let exp = tmp.uv.buyables[22].coste
                let mult = decimalTen
                let x = player.uv.buyables[22]
                if (x.gte(15)) {
                    x = x.sub(15).pow(1.4).mul(Decimal.log(1e15,base))
                    mult = new Decimal("e450")
                }
                let cost = Decimal.pow(base,x.pow(exp)).mul(mult)
                return cost
            },
            costb() { // cost for buying xth buyable, can be an object if there are multiple currencies
                let cost = decimalThree
                return cost
            },
            coste() { 
                let cost = decimalOne
                return cost
            },
            int() {
                let i = 0.1
                if (hasUpgrade("uv",124)) i = 0.01
                return i
            },
            effect() { // Effects of owning x of the items, x is a decimal
                let x = player.uv.buyables[22]
                let i = tmp.uv.buyables[22].int
                return Decimal.pow(0.7, x).mul(15).max(0.1).mul(Decimal.pow(0.9, x.sub(15).max(0))).max(i);
            },
            display() { // Everything else displayed in the buyable button after the title
                if (player.tab != "uv" || player.subtabs.uv.mainTabs != "UnBoosted Viruses") return
                let extra = ""
                let dis = "Reduce 'Max All' unvaxxed tRNA buyables cooldown by "+(player.uv.buyables[this.id].gte(15)?"10":"30")+"%"
                let i = tmp.uv.buyables[22].int
                if (tmp[this.layer].buyables[this.id].effect.eq(i)) dis+= ' (MAXED)'
                return dis + ".\n\
                Cost: " + formatWhole(tmp[this.layer].buyables[this.id].cost)+" UnBoosted "+(tmp.uv.buyables[22].cost.eq(1)?"Virus":"Viruses")+"\n\
                Cooldown: " + formatTime(tmp[this.layer].buyables[this.id].effect)+"\n\
                Amount: " + formatWhole(getBuyableAmount("uv", 22))
            },
            unlocked() { return hasMilestone("uv",6) }, 
            canAfford() {
                    return player.uv.virus.gte(tmp[this.layer].buyables[this.id].cost) && tmp[this.layer].buyables[this.id].effect.gt(tmp.uv.buyables[22].int)},
            buy() { 
                cost = tmp[this.layer].buyables[this.id].cost
                let max = tmp.uv.buyables[22].maxAfford
                let b = max.max(1)
                if (tmp[this.layer].buyables[this.id].canAfford) {
                    if (false) player[this.layer].buyables[this.id] = b
                    else {
                        player.uv.virus = player.uv.virus.sub(cost)
                        player[this.layer].buyables[this.id] = player[this.layer].buyables[this.id].add(1).max(1)
                    }
                }
            },
            maxAfford() {
                let s = player.uv.virus
                let base = tmp.uv.buyables[22].costb
                let exp = tmp.uv.buyables[22].coste
                let target = s.div(10).log(base).root(exp)
                if (!hasUpgrade("uv",124)) return target.min(15)
                if (target.gte(15)) target = s.div("e450").log(1e15).root(1.4).floor().add(16)
                return target.floor().add(1)
            },
        },
        23: {
            title: "US Upgrade Cooldown",
            cost() { // cost for buying xth buyable, can be an object if there are multiple currencies
                let base = tmp.uv.buyables[23].costb
                let exp = tmp.uv.buyables[23].coste
                let mult = new Decimal(1e4)
                let x = player.uv.buyables[23]
                if (x.gte(18)) {
                    x = x.sub(18).pow(1.4).mul(Decimal.log(1e18,base))
                    mult = new Decimal("e460")
                }
                let cost = Decimal.pow(base,x.pow(exp)).mul(mult)
                return cost
            },
            costb() { // cost for buying xth buyable, can be an object if there are multiple currencies
                let cost = decimalThree
                return cost
            },
            coste() { 
                let cost = decimalOne
                return cost
            },
            int() {
                let i = 0.1
                if (hasUpgrade("uv",124)) i = 0.01
                return i
            },
            effect() { // Effects of owning x of the items, x is a decimal
                let x = player.uv.buyables[23]
                let i = tmp.uv.buyables[23].int
                return Decimal.pow(0.7, x).mul(60).max(0.1).mul(Decimal.pow(0.9, x.sub(18).max(0))).max(i);
            },
            display() { // Everything else displayed in the buyable button after the title
                if (player.tab != "uv" || player.subtabs.uv.mainTabs != "UnBoosted Viruses") return
                let extra = ""
                let dis = "Reduce US upgrade autobuyer cooldown by "+(player.uv.buyables[this.id].gte(18)?"10":"30")+"%"
                let i = tmp.uv.buyables[23].int
                if (tmp[this.layer].buyables[this.id].effect.eq(i)) dis+= ' (MAXED)'
                return dis + ".\n\
                Cost: " + formatWhole(tmp[this.layer].buyables[this.id].cost)+" UnBoosted "+(tmp.uv.buyables[23].cost.eq(1)?"Virus":"Viruses")+"\n\
                Cooldown: " + formatTime(tmp[this.layer].buyables[this.id].effect)+"\n\
                Amount: " + formatWhole(getBuyableAmount("uv", 23))
            },
            unlocked() { return hasMilestone("uv",11) }, 
            canAfford() {
                    return player.uv.virus.gte(tmp[this.layer].buyables[this.id].cost) && tmp[this.layer].buyables[this.id].effect.gt(tmp.uv.buyables[23].int)},
            buy() { 
                cost = tmp[this.layer].buyables[this.id].cost
                let max = tmp.uv.buyables[23].maxAfford
                let b = max.max(1)
                if (tmp[this.layer].buyables[this.id].canAfford) {
                    if (false) player[this.layer].buyables[this.id] = b
                    else {
                        player.uv.virus = player.uv.virus.sub(cost)
                        player[this.layer].buyables[this.id] = player[this.layer].buyables[this.id].add(1).max(1)
                    }
                }
            },
            maxAfford() {
                let s = player.uv.virus
                let base = tmp.uv.buyables[23].costb
                let exp = tmp.uv.buyables[23].coste
                let target = s.div(1e4).log(base).root(exp)
                if (!hasUpgrade("uv",124)) return target.min(18)
                if (target.gte(18)) target = s.div("e460").log(1e18).root(1.4).floor().add(19)
                return target.floor().add(1)
            },
        },
        31: {
            title: "mRNA Mutation Cooldown",
            cost() { // cost for buying xth buyable, can be an object if there are multiple currencies
                let base = tmp.uv.buyables[31].costb
                let exp = tmp.uv.buyables[31].coste
                let mult = new Decimal(1e8)
                let x = player.uv.buyables[31]
                if (x.gte(18)) {
                    x = x.sub(18).pow(1.4).mul(Decimal.log(1e22,base))
                    mult = new Decimal("e470")
                }
                let cost = Decimal.pow(base,x.pow(exp)).mul(mult)
                return cost
            },
            costb() { // cost for buying xth buyable, can be an object if there are multiple currencies
                let cost = decimalThree
                return cost
            },
            coste() { 
                let cost = decimalOne
                return cost
            },
            int() {
                let i = 0.1
                if (hasUpgrade("uv",124)) i = 0.01
                return i
            },
            effect() { // Effects of owning x of the items, x is a decimal
                let x = player.uv.buyables[31]
                let i = tmp.uv.buyables[31].int
                return Decimal.pow(0.7, x).mul(60).max(0.1).mul(Decimal.pow(0.9, x.sub(18).max(0))).max(i);
            },
            display() { // Everything else displayed in the buyable button after the title
                if (player.tab != "uv" || player.subtabs.uv.mainTabs != "UnBoosted Viruses") return
                let extra = ""
                let dis = "Reduce mRNA mutation autobuyer cooldown by "+(player.uv.buyables[this.id].gte(18)?"10":"30")+"%"
                let i = tmp.uv.buyables[31].int
                if (tmp[this.layer].buyables[this.id].effect.eq(i)) dis+= ' (MAXED)'
                return dis + ".\n\
                Cost: " + formatWhole(tmp[this.layer].buyables[this.id].cost)+" UnBoosted "+(tmp.uv.buyables[31].cost.eq(1)?"Virus":"Viruses")+"\n\
                Cooldown: " + formatTime(tmp[this.layer].buyables[this.id].effect)+"\n\
                Amount: " + formatWhole(getBuyableAmount("uv", 31))
            },
            unlocked() { return hasMilestone("uv",14) }, 
            canAfford() {
                    return player.uv.virus.gte(tmp[this.layer].buyables[this.id].cost) && tmp[this.layer].buyables[this.id].effect.gt(tmp.uv.buyables[31].int)},
            buy() { 
                cost = tmp[this.layer].buyables[this.id].cost
                let max = tmp.uv.buyables[31].maxAfford
                let b = max.max(1)
                if (tmp[this.layer].buyables[this.id].canAfford) {
                    if (false) player[this.layer].buyables[this.id] = b
                    else {
                        player.uv.virus = player.uv.virus.sub(cost)
                        player[this.layer].buyables[this.id] = player[this.layer].buyables[this.id].add(1).max(1)
                    }
                }
            },
            maxAfford() {
                let s = player.uv.virus
                let base = tmp.uv.buyables[31].costb
                let exp = tmp.uv.buyables[31].coste
                let target = s.div(1e8).log(base).root(exp)
                if (!hasUpgrade("uv",124)) return target.min(18)
                if (target.gte(18)) target = s.div("e470").log(1e22).root(1.4).floor().add(19)
                return target.floor().add(1)
            },
        },
        32: {
            title: "tRNA Mutation Cooldown",
            cost() { // cost for buying xth buyable, can be an object if there are multiple currencies
                let base = tmp.uv.buyables[32].costb
                let exp = tmp.uv.buyables[32].coste
                let mult = new Decimal(1e12)
                let x = player.uv.buyables[32]
                if (x.gte(18)) {
                    x = x.sub(18).pow(1.4).mul(Decimal.log(1e25,base))
                    mult = new Decimal("e480")
                }
                let cost = Decimal.pow(base,x.pow(exp)).mul(mult)
                return cost
            },
            costb() { // cost for buying xth buyable, can be an object if there are multiple currencies
                let cost = decimalThree
                return cost
            },
            coste() { 
                let cost = decimalOne
                return cost
            },
            int() {
                let i = 0.1
                if (hasUpgrade("uv",124)) i = 0.01
                return i
            },
            effect() { // Effects of owning x of the items, x is a decimal
                let x = player.uv.buyables[32]
                let i = tmp.uv.buyables[32].int
                return Decimal.pow(0.7, x).mul(60).max(0.1).mul(Decimal.pow(0.9, x.sub(18).max(0))).max(i);
            },
            display() { // Everything else displayed in the buyable button after the title
                if (player.tab != "uv" || player.subtabs.uv.mainTabs != "UnBoosted Viruses") return
                let extra = ""
                let dis = "Reduce tRNA mutation autobuyer cooldown by "+(player.uv.buyables[this.id].gte(18)?"10":"30")+"%"
                let i = tmp.uv.buyables[32].int
                if (tmp[this.layer].buyables[this.id].effect.eq(i)) dis+= ' (MAXED)'
                return dis + ".\n\
                Cost: " + formatWhole(tmp[this.layer].buyables[this.id].cost)+" UnBoosted "+(tmp.uv.buyables[32].cost.eq(1)?"Virus":"Viruses")+"\n\
                Cooldown: " + formatTime(tmp[this.layer].buyables[this.id].effect)+"\n\
                Amount: " + formatWhole(getBuyableAmount("uv", 32))
            },
            unlocked() { return hasMilestone("uv",16) }, 
            canAfford() {
                    return player.uv.virus.gte(tmp[this.layer].buyables[this.id].cost) && tmp[this.layer].buyables[this.id].effect.gt(tmp.uv.buyables[32].int)},
            buy() { 
                cost = tmp[this.layer].buyables[this.id].cost
                let max = tmp.uv.buyables[32].maxAfford
                let b = max.max(1)
                if (tmp[this.layer].buyables[this.id].canAfford) {
                    if (false) player[this.layer].buyables[this.id] = b
                    else {
                        player.uv.virus = player.uv.virus.sub(cost)
                        player[this.layer].buyables[this.id] = player[this.layer].buyables[this.id].add(1).max(1)
                    }
                }
            },
            maxAfford() {
                let s = player.uv.virus
                let base = tmp.uv.buyables[32].costb
                let exp = tmp.uv.buyables[32].coste
                let target = s.div(1e12).log(base).root(exp)
                if (!hasUpgrade("uv",124)) return target.min(18)
                if (target.gte(18)) target = s.div("e480").log(1e25).root(1.4).floor().add(19)
                return target.floor().add(1)
            },
        },
        33: {
            title: "Auto Reset Cooldown",
            cost() { // cost for buying xth buyable, can be an object if there are multiple currencies
                let base = tmp.uv.buyables[33].costb
                let exp = tmp.uv.buyables[33].coste
                let mult = new Decimal(1e19)
                let x = player.uv.buyables[33]
                if (x.gte(18)) {
                    x = x.sub(18).pow(1.4).mul(Decimal.log(1e30,base))
                    mult = new Decimal("e570")
                }
                let cost = Decimal.pow(base,x.pow(exp)).mul(mult)
                return cost
            },
            costb() { // cost for buying xth buyable, can be an object if there are multiple currencies
                let cost = decimalThree
                return cost
            },
            coste() { 
                let cost = decimalOne
                return cost
            },
            int() {
                let i = 0.1
                if (hasUpgrade("uv",124)) i = 0.01
                return i
            },
            effect() { // Effects of owning x of the items, x is a decimal
                let x = player.uv.buyables[33]
                let i = tmp.uv.buyables[33].int
                return Decimal.pow(0.7, x).mul(60).max(0.1).mul(Decimal.pow(0.9, x.sub(18).max(0))).max(i);
            },
            display() { // Everything else displayed in the buyable button after the title
                if (player.tab != "uv" || player.subtabs.uv.mainTabs != "UnBoosted Viruses") return
                let extra = ""
                let dis = "Reduce auto-reset cooldown by "+(player.uv.buyables[this.id].gte(18)?"10":"30")+"%"
                let i = tmp.uv.buyables[33].int
                if (tmp[this.layer].buyables[this.id].effect.eq(i)) dis+= ' (MAXED)'
                return dis + ".\n\
                Cost: " + formatWhole(tmp[this.layer].buyables[this.id].cost)+" UnBoosted "+(tmp.uv.buyables[33].cost.eq(1)?"Virus":"Viruses")+"\n\
                Cooldown: " + formatTime(tmp[this.layer].buyables[this.id].effect)+"\n\
                Amount: " + formatWhole(getBuyableAmount("uv", 33))
            },
            unlocked() { return hasUpgrade("uv",81) }, 
            canAfford() {
                    return player.uv.virus.gte(tmp[this.layer].buyables[this.id].cost) && tmp[this.layer].buyables[this.id].effect.gt(tmp.uv.buyables[33].int)},
            buy() { 
                cost = tmp[this.layer].buyables[this.id].cost
                let max = tmp.uv.buyables[33].maxAfford
                let b = max.max(1)
                if (tmp[this.layer].buyables[this.id].canAfford) {
                    if (false) player[this.layer].buyables[this.id] = b
                    else {
                        player.uv.virus = player.uv.virus.sub(cost)
                        player[this.layer].buyables[this.id] = player[this.layer].buyables[this.id].add(1).max(1)
                    }
                }
            },
            maxAfford() {
                let s = player.uv.virus
                let base = tmp.uv.buyables[33].costb
                let exp = tmp.uv.buyables[33].coste
                let target = s.div(1e19).log(base).root(exp)
                if (!hasUpgrade("uv",124)) return target.min(18)
                if (target.gte(18)) target = s.div("e570").log(1e30).root(1.4).floor().add(19)
                return target.floor().add(1)
            },
        },
        41: {
            title: "Max rRNA Cooldown",
            cost() { // cost for buying xth buyable, can be an object if there are multiple currencies
                let base = tmp.uv.buyables[41].costb
                let exp = tmp.uv.buyables[41].coste
                let mult = new Decimal(1e23)
                let x = player.uv.buyables[41]
                if (x.gte(16)) {
                    x = x.sub(16).pow(1.4).mul(Decimal.log(1e35,base))
                    mult = new Decimal("e590")
                }
                let cost = Decimal.pow(base,x.pow(exp)).mul(mult)
                return cost
            },
            costb() { // cost for buying xth buyable, can be an object if there are multiple currencies
                let cost = decimalThree
                return cost
            },
            coste() { 
                let cost = decimalOne
                return cost
            },
            int() {
                let i = 0.1
                if (hasUpgrade("uv",124)) i = 0.01
                return i
            },
            effect() { // Effects of owning x of the items, x is a decimal
                let x = player.uv.buyables[41]
                let i = tmp.uv.buyables[41].int
                return Decimal.pow(0.7, x).mul(30).max(0.1).mul(Decimal.pow(0.9, x.sub(16).max(0))).max(i);
            },
            display() { // Everything else displayed in the buyable button after the title
                if (player.tab != "uv" || player.subtabs.uv.mainTabs != "UnBoosted Viruses") return
                let extra = ""
                let dis = "Reduce 'Max All' mutated rRNA buyables cooldown by "+(player.uv.buyables[this.id].gte(16)?"10":"30")+"%"
                let i = tmp.uv.buyables[41].int
                if (tmp[this.layer].buyables[this.id].effect.eq(i)) dis+= ' (MAXED)'
                return dis + ".\n\
                Cost: " + formatWhole(tmp[this.layer].buyables[this.id].cost)+" UnBoosted "+(tmp.uv.buyables[41].cost.eq(1)?"Virus":"Viruses")+"\n\
                Cooldown: " + formatTime(tmp[this.layer].buyables[this.id].effect)+"\n\
                Amount: " + formatWhole(getBuyableAmount("uv", 41))
            },
            unlocked() { return hasUpgrade("uv",83) }, 
            canAfford() {
                    return player.uv.virus.gte(tmp[this.layer].buyables[this.id].cost) && tmp[this.layer].buyables[this.id].effect.gt(tmp.uv.buyables[41].int)},
            buy() { 
                cost = tmp[this.layer].buyables[this.id].cost
                let max = tmp.uv.buyables[41].maxAfford
                let b = max.max(1)
                if (tmp[this.layer].buyables[this.id].canAfford) {
                    if (false) player[this.layer].buyables[this.id] = b
                    else {
                        player.uv.virus = player.uv.virus.sub(cost)
                        player[this.layer].buyables[this.id] = player[this.layer].buyables[this.id].add(1).max(1)
                    }
                }
            },
            maxAfford() {
                let s = player.uv.virus
                let base = tmp.uv.buyables[41].costb
                let exp = tmp.uv.buyables[41].coste
                let target = s.div(1e23).log(base).root(exp)
                if (!hasUpgrade("uv",124)) return target.min(16)
                if (target.gte(16)) target = s.div("e590").log(1e35).root(1.4).floor().add(17)
                return target.floor().add(1)
            },
        },
        42: {
            title: "Max Death Cooldown",
            cost() { // cost for buying xth buyable, can be an object if there are multiple currencies
                let base = tmp.uv.buyables[42].costb
                let exp = tmp.uv.buyables[42].coste
                let mult = new Decimal(1e87)
                let x = player.uv.buyables[42]
                if (x.gte(16)) {
                    x = x.sub(16).pow(1.4).mul(Decimal.log(1e40,base))
                    mult = new Decimal("e600")
                }
                let cost = Decimal.pow(base,x.pow(exp)).mul(mult)
                return cost
            },
            costb() { // cost for buying xth buyable, can be an object if there are multiple currencies
                let cost = new Decimal(1e3)
                return cost
            },
            coste() { 
                let cost = decimalOne
                return cost
            },
            int() {
                let i = 0.1
                if (hasUpgrade("uv",124)) i = 0.01
                return i
            },
            effect() { // Effects of owning x of the items, x is a decimal
                let x = player.uv.buyables[42]
                let i = tmp.uv.buyables[42].int
                return Decimal.pow(0.7, x).mul(30).max(0.1).mul(Decimal.pow(0.9, x.sub(16).max(0))).max(i);
            },
            display() { // Everything else displayed in the buyable button after the title
                if (player.tab != "uv" || player.subtabs.uv.mainTabs != "UnBoosted Viruses") return
                let extra = ""
                let dis = "Reduce 'Max All' unvaxxed death buyables cooldown by "+(player.uv.buyables[this.id].gte(16)?"10":"30")+"%"
                let i = tmp.uv.buyables[42].int
                if (tmp[this.layer].buyables[this.id].effect.eq(i)) dis+= ' (MAXED)'
                return dis + ".\n\
                Cost: " + formatWhole(tmp[this.layer].buyables[this.id].cost)+" UnBoosted "+(tmp.uv.buyables[42].cost.eq(1)?"Virus":"Viruses")+"\n\
                Cooldown: " + formatTime(tmp[this.layer].buyables[this.id].effect)+"\n\
                Amount: " + formatWhole(getBuyableAmount("uv", 42))
            },
            unlocked() { return hasMilestone("uv",27) }, 
            canAfford() {
                    return player.uv.virus.gte(tmp[this.layer].buyables[this.id].cost) && tmp[this.layer].buyables[this.id].effect.gt(tmp.uv.buyables[42].int)},
            buy() { 
                cost = tmp[this.layer].buyables[this.id].cost
                let max = tmp.uv.buyables[42].maxAfford
                let b = max.max(1)
                if (tmp[this.layer].buyables[this.id].canAfford) {
                    if (false) player[this.layer].buyables[this.id] = b
                    else {
                        player.uv.virus = player.uv.virus.sub(cost)
                        player[this.layer].buyables[this.id] = player[this.layer].buyables[this.id].add(1).max(1)
                    }
                }
            },
            maxAfford() {
                let s = player.uv.virus
                let base = tmp.uv.buyables[42].costb
                let exp = tmp.uv.buyables[42].coste
                let target = s.div(1e87).log(base).root(exp)
                if (!hasUpgrade("uv",124)) return target.min(16)
                if (target.gte(16)) target = s.div("e600").log(1e40).root(1.4).floor().add(17)
                return target.floor().add(1)
            },
        },
        43: {
            title: "UD Upgrade Cooldown",
            cost() { // cost for buying xth buyable, can be an object if there are multiple currencies
                let base = tmp.uv.buyables[43].costb
                let exp = tmp.uv.buyables[43].coste
                let mult = new Decimal(1e130)
                let x = player.uv.buyables[43]
                if (x.gte(18)) {
                    x = x.sub(18).pow(1.4).mul(Decimal.log(1e50,base))
                    mult = new Decimal("e620")
                }
                let cost = Decimal.pow(base,x.pow(exp)).mul(mult)
                return cost
            },
            costb() { // cost for buying xth buyable, can be an object if there are multiple currencies
                let cost = new Decimal(1e3)
                return cost
            },
            coste() { 
                let cost = decimalOne
                return cost
            },
            int() {
                let i = 0.1
                if (hasUpgrade("uv",124)) i = 0.01
                return i
            },
            effect() { // Effects of owning x of the items, x is a decimal
                let x = player.uv.buyables[43]
                let i = tmp.uv.buyables[43].int
                return Decimal.pow(0.7, x).mul(60).max(0.1).mul(Decimal.pow(0.9, x.sub(18).max(0))).max(i);
            },
            display() { // Everything else displayed in the buyable button after the title
                if (player.tab != "uv" || player.subtabs.uv.mainTabs != "UnBoosted Viruses") return
                let extra = ""
                let dis = "Reduce UD upgrade autobuyer cooldown by "+(player.uv.buyables[this.id].gte(18)?"10":"30")+"%"
                let i = tmp.uv.buyables[43].int
                if (tmp[this.layer].buyables[this.id].effect.eq(i)) dis+= ' (MAXED)'
                return dis + ".\n\
                Cost: " + formatWhole(tmp[this.layer].buyables[this.id].cost)+" UnBoosted "+(tmp.uv.buyables[43].cost.eq(1)?"Virus":"Viruses")+"\n\
                Cooldown: " + formatTime(tmp[this.layer].buyables[this.id].effect)+"\n\
                Amount: " + formatWhole(getBuyableAmount("uv", 43))
            },
            unlocked() { return hasMilestone("uv",30) }, 
            canAfford() {
                    return player.uv.virus.gte(tmp[this.layer].buyables[this.id].cost) && tmp[this.layer].buyables[this.id].effect.gt(tmp.uv.buyables[43].int)},
            buy() { 
                cost = tmp[this.layer].buyables[this.id].cost
                let max = tmp.uv.buyables[43].maxAfford
                let b = max.max(1)
                if (tmp[this.layer].buyables[this.id].canAfford) {
                    if (false) player[this.layer].buyables[this.id] = b
                    else {
                        player.uv.virus = player.uv.virus.sub(cost)
                        player[this.layer].buyables[this.id] = player[this.layer].buyables[this.id].add(1).max(1)
                    }
                }
            },
            maxAfford() {
                let s = player.uv.virus
                let base = tmp.uv.buyables[43].costb
                let exp = tmp.uv.buyables[43].coste
                let target = s.div(1e130).log(base).root(exp)
                if (!hasUpgrade("uv",124)) return target.min(18)
                if (target.gte(18)) target = s.div("e620").log(1e50).root(1.4).floor().add(19)
                return target.floor().add(1)
            },
        },
        51: {
            title: "Deadly Mutation Cooldown",
            cost() { // cost for buying xth buyable, can be an object if there are multiple currencies
                let base = tmp.uv.buyables[51].costb
                let exp = tmp.uv.buyables[51].coste
                let mult = new Decimal(1e147)
                let x = player.uv.buyables[51]
                if (x.gte(18)) {
                    x = x.sub(18).pow(1.4).mul(Decimal.log(1e60,base))
                    mult = new Decimal("e624")
                }
                let cost = Decimal.pow(base,x.pow(exp)).mul(mult)
                return cost
            },
            costb() { // cost for buying xth buyable, can be an object if there are multiple currencies
                let cost = new Decimal(1e3)
                return cost
            },
            coste() { 
                let cost = decimalOne
                return cost
            },
            int() {
                let i = 0.1
                if (hasUpgrade("uv",124)) i = 0.01
                return i
            },
            effect() { // Effects of owning x of the items, x is a decimal
                let x = player.uv.buyables[51]
                let i = tmp.uv.buyables[51].int
                return Decimal.pow(0.7, x).mul(60).max(0.1).mul(Decimal.pow(0.9, x.sub(18).max(0))).max(i);
            },
            display() { // Everything else displayed in the buyable button after the title
                if (player.tab != "uv" || player.subtabs.uv.mainTabs != "UnBoosted Viruses") return
                let extra = ""
                let dis = "Reduce 'Max All' deadly mutation buyables cooldown by "+(player.uv.buyables[this.id].gte(18)?"10":"30")+"%"
                let i = tmp.uv.buyables[51].int
                if (tmp[this.layer].buyables[this.id].effect.eq(i)) dis+= ' (MAXED)'
                return dis + ".\n\
                Cost: " + formatWhole(tmp[this.layer].buyables[this.id].cost)+" UnBoosted "+(tmp.uv.buyables[51].cost.eq(1)?"Virus":"Viruses")+"\n\
                Cooldown: " + formatTime(tmp[this.layer].buyables[this.id].effect)+"\n\
                Amount: " + formatWhole(getBuyableAmount("uv", 51))
            },
            unlocked() { return hasMilestone("uv",31) }, 
            canAfford() {
                    return player.uv.virus.gte(tmp[this.layer].buyables[this.id].cost) && tmp[this.layer].buyables[this.id].effect.gt(tmp.uv.buyables[51].int)},
            buy() { 
                cost = tmp[this.layer].buyables[this.id].cost
                let max = tmp.uv.buyables[51].maxAfford
                let b = max.max(1)
                if (tmp[this.layer].buyables[this.id].canAfford) {
                    if (false) player[this.layer].buyables[this.id] = b
                    else {
                        player.uv.virus = player.uv.virus.sub(cost)
                        player[this.layer].buyables[this.id] = player[this.layer].buyables[this.id].add(1).max(1)
                    }
                }
            },
            maxAfford() {
                let s = player.uv.virus
                let base = tmp.uv.buyables[51].costb
                let exp = tmp.uv.buyables[51].coste
                let target = s.div(1e147).log(base).root(exp)
                if (!hasUpgrade("uv",124)) return target.min(18)
                if (target.gte(18)) target = s.div("e624").log(1e60).root(1.4).floor().add(19)
                return target.floor().add(1)
            },
        },
        52: {
            title: "Deadly Mutant Cooldown",
            cost() { // cost for buying xth buyable, can be an object if there are multiple currencies
                let base = tmp.uv.buyables[52].costb
                let exp = tmp.uv.buyables[52].coste
                let mult = new Decimal(1e186)
                let x = player.uv.buyables[52]
                if (x.gte(18)) {
                    x = x.sub(18).pow(1.4).mul(Decimal.log(1e60,base))
                    mult = new Decimal("e4624")
                }
                let cost = Decimal.pow(base,x.pow(exp)).mul(mult)
                return cost
            },
            costb() { // cost for buying xth buyable, can be an object if there are multiple currencies
                let cost = new Decimal(1e3)
                return cost
            },
            coste() { 
                let cost = decimalOne
                return cost
            },
            int() {
                let i = 0.1
                if (hasUpgrade("uv",124)) i = 0.01
                return i
            },
            effect() { // Effects of owning x of the items, x is a decimal
                let x = player.uv.buyables[52]
                let i = tmp.uv.buyables[52].int
                return Decimal.pow(0.7, x).mul(60).max(0.1).mul(Decimal.pow(0.9, x.sub(18).max(0))).max(i);
            },
            display() { // Everything else displayed in the buyable button after the title
                if (player.tab != "uv" || player.subtabs.uv.mainTabs != "UnBoosted Viruses") return
                let extra = ""
                let dis = "Reduce 'Max All' deadly mutant buyables cooldown by "+(player.uv.buyables[this.id].gte(18)?"10":"30")+"%"
                let i = tmp.uv.buyables[52].int
                if (tmp[this.layer].buyables[this.id].effect.eq(i)) dis+= ' (MAXED)'
                return dis + ".\n\
                Cost: " + formatWhole(tmp[this.layer].buyables[this.id].cost)+" UnBoosted "+(tmp.uv.buyables[52].cost.eq(1)?"Virus":"Viruses")+"\n\
                Cooldown: " + formatTime(tmp[this.layer].buyables[this.id].effect)+"\n\
                Amount: " + formatWhole(getBuyableAmount("uv", 52))
            },
            unlocked() { return hasUpgrade("uv",106) }, 
            canAfford() {
                    return player.uv.virus.gte(tmp[this.layer].buyables[this.id].cost) && tmp[this.layer].buyables[this.id].effect.gt(tmp.uv.buyables[52].int)},
            buy() { 
                cost = tmp[this.layer].buyables[this.id].cost
                let max = tmp.uv.buyables[52].maxAfford
                let b = max.max(1)
                if (tmp[this.layer].buyables[this.id].canAfford) {
                    if (false) player[this.layer].buyables[this.id] = b
                    else {
                        player.uv.virus = player.uv.virus.sub(cost)
                        player[this.layer].buyables[this.id] = player[this.layer].buyables[this.id].add(1).max(1)
                    }
                }
            },
            maxAfford() {
                let s = player.uv.virus
                let base = tmp.uv.buyables[52].costb
                let exp = tmp.uv.buyables[52].coste
                let target = s.div(1e186).log(base).root(exp)
                return target.floor().add(1)
            },
        },
        53: {
            title: "Deadly Crow Cooldown",
            cost() { // cost for buying xth buyable, can be an object if there are multiple currencies
                let base = tmp.uv.buyables[53].costb
                let exp = tmp.uv.buyables[53].coste
                let mult = new Decimal("e444")
                let x = player.uv.buyables[53]
                if (x.gte(18)) {
                    x = x.sub(18).pow(1.4).mul(Decimal.log(1e60,base))
                    mult = new Decimal("e4624")
                }
                let cost = Decimal.pow(base,x.pow(exp)).mul(mult)
                return cost
            },
            costb() { // cost for buying xth buyable, can be an object if there are multiple currencies
                let cost = new Decimal(1e10)
                return cost
            },
            coste() { 
                let cost = decimalOne
                return cost
            },
            int() {
                let i = 0.1
                if (hasUpgrade("uv",124)) i = 0.01
                return i
            },
            effect() { // Effects of owning x of the items, x is a decimal
                let x = player.uv.buyables[53]
                let i = tmp.uv.buyables[53].int
                return Decimal.pow(0.7, x).mul(60).max(0.1).mul(Decimal.pow(0.9, x.sub(18).max(0))).max(i);
            },
            display() { // Everything else displayed in the buyable button after the title
                if (player.tab != "uv" || player.subtabs.uv.mainTabs != "UnBoosted Viruses") return
                let extra = ""
                let dis = "Reduce 'Max All' deadly crow buyables cooldown by "+(player.uv.buyables[this.id].gte(18)?"10":"30")+"%"
                let i = tmp.uv.buyables[53].int
                if (tmp[this.layer].buyables[this.id].effect.eq(i)) dis+= ' (MAXED)'
                return dis + ".\n\
                Cost: " + formatWhole(tmp[this.layer].buyables[this.id].cost)+" UnBoosted "+(tmp.uv.buyables[53].cost.eq(1)?"Virus":"Viruses")+"\n\
                Cooldown: " + formatTime(tmp[this.layer].buyables[this.id].effect)+"\n\
                Amount: " + formatWhole(getBuyableAmount("uv", 53))
            },
            unlocked() { return hasUpgrade("ct",591) }, 
            canAfford() {
                    return player.uv.virus.gte(tmp[this.layer].buyables[this.id].cost) && tmp[this.layer].buyables[this.id].effect.gt(tmp.uv.buyables[53].int)},
            buy() { 
                cost = tmp[this.layer].buyables[this.id].cost
                let max = tmp.uv.buyables[53].maxAfford
                let b = max.max(1)
                if (tmp[this.layer].buyables[this.id].canAfford) {
                    if (false) player[this.layer].buyables[this.id] = b
                    else {
                        player.uv.virus = player.uv.virus.sub(cost)
                        player[this.layer].buyables[this.id] = player[this.layer].buyables[this.id].add(1).max(1)
                    }
                }
            },
            maxAfford() {
                let s = player.uv.virus
                let base = tmp.uv.buyables[53].costb
                let exp = tmp.uv.buyables[53].coste
                let target = s.div("e444").log(base).root(exp)
                return target.floor().add(1)
            },
        },
        101: {
            title()  {return (player.uv.buyables[101].gte(287)?"Distant ":"")+"UnBoosted Virus Multiplier"},
            cost() { // cost for buying xth buyable, can be an object if there are multiple currencies
                let base = tmp.uv.buyables[101].costb
                let exp = tmp.uv.buyables[101].coste
                let x = player.uv.buyables[101]
                let cost = Decimal.pow(base,x).mul(1e22)
                if (x.gte(287)) cost = base.pow(x.sub(286).pow(exp).add(286)).mul(1e22)
                return cost
            },
            costb() { // cost for buying xth buyable, can be an object if there are multiple currencies
                let cost = new Decimal(10)
                return cost
            },
            coste() { 
                let cost = new Decimal(1.2)
                return cost
            },
            base() { 
                let base = tmp.uv.buyables[111].effect.add(2)
                return base
            },
            effect() { // Effects of owning x of the items, x is a decimal
                let x = player.uv.buyables[101]
                let base = tmp.uv.buyables[101].base
                return Decimal.pow(base, x);
            },
            display() { // Everything else displayed in the buyable button after the title
                if (player.tab != "uv" || player.subtabs.uv.mainTabs != "Buyables") return
                let extra = ""
                let dis = "Multiply UnBoosted Virus gain by " + format(tmp[this.layer].buyables[this.id].base)
                return dis + ".\n\
                Cost: " + formatWhole(tmp[this.layer].buyables[this.id].cost)+" UnBoosted "+(tmp.uv.buyables[101].cost.eq(1)?"Virus":"Viruses")+"\n\
                Effect: " + format(tmp[this.layer].buyables[this.id].effect)+"x\n\
                Amount: " + formatWhole(getBuyableAmount("uv", 101))
            },
            unlocked() { return hasUpgrade("uv",83) }, 
            canAfford() {
                    return player.uv.virus.gte(tmp[this.layer].buyables[this.id].cost)},
            buy() { 
                cost = tmp[this.layer].buyables[this.id].cost
                let max = tmp.uv.buyables[101].maxAfford
                let b = max.max(1)
                if (tmp[this.layer].buyables[this.id].canAfford) {
                    if (false) player[this.layer].buyables[this.id] = b
                    else {
                        player.uv.virus = player.uv.virus.sub(cost)
                        player.uv.uvReset = player.uv.uvReset.mul(tmp[this.layer].buyables[this.id].base)
                        player[this.layer].buyables[this.id] = player[this.layer].buyables[this.id].add(1).max(1)
                    }
                }
            },
            maxAfford() { //logr(s(r-1)/a1+1)=(n)
                let s = player.uv.virus
                let base = tmp.uv.buyables[101].costb
                let exp = tmp.uv.buyables[101].coste
                let target = s.div(tmp.uv.buyables[101].cost).mul(base.sub(1)).add(1).log(base)
                if (target.add(player.uv.buyables[101]).gte(287)) target = s.div(1e22).log(base).sub(286).root(exp).add(287)
                return target.floor()
            },
        },
        102: {
            title: "UnBoosted Virus Dilation",
            cost() { // cost for buying xth buyable, can be an object if there are multiple currencies
                let base = tmp.uv.buyables[102].costb
                let exp = tmp.uv.buyables[102].coste
                let x = player.uv.buyables[102]
                let cost = Decimal.pow(base,x.pow(exp)).mul(1e235)
                return cost
            },
            costb() { // cost for buying xth buyable, can be an object if there are multiple currencies
                let cost = new Decimal(1e5)
                return cost
            },
            coste() { 
                let cost = new Decimal(1.5)
                return cost
            },
            base() { 
                let base = new Decimal(0.1)
                if (hasUpgrade("Ud",173)) base = base.add(0.1)
                return base
            },
            effect() { // Effects of owning x of the items, x is a decimal
                let x = player.uv.buyables[102]
                let base = tmp.uv.buyables[102].base
                return Decimal.mul(base, x);
            },
            display() { // Everything else displayed in the buyable button after the title
                if (player.tab != "uv" || player.subtabs.uv.mainTabs != "Buyables") return
                let extra = ""
                let dis = "Increase UnBoosted Virus effect dilation by " + format(tmp[this.layer].buyables[this.id].base)
                return dis + ".\n\
                Cost: " + formatWhole(tmp[this.layer].buyables[this.id].cost)+" UnBoosted "+(tmp.uv.buyables[102].cost.eq(1)?"Virus":"Viruses")+"\n\
                Effect: +" + format(tmp[this.layer].buyables[this.id].effect)+"\n\
                Amount: " + formatWhole(getBuyableAmount("uv", 102))
            },
            unlocked() { return hasUpgrade("uv",112) }, 
            canAfford() {
                    return player.uv.virus.gte(tmp[this.layer].buyables[this.id].cost)},
            buy() { 
                cost = tmp[this.layer].buyables[this.id].cost
                let max = tmp.uv.buyables[102].maxAfford
                let b = max.max(1)
                if (tmp[this.layer].buyables[this.id].canAfford) {
                    if (false) player[this.layer].buyables[this.id] = b
                    else {
                        player.uv.virus = player.uv.virus.sub(cost)
                        player.uv.uvReset = player.uv.uvReset.mul(tmp[this.layer].buyables[this.id].base)
                        player[this.layer].buyables[this.id] = player[this.layer].buyables[this.id].add(1).max(1)
                    }
                }
            },
            maxAfford() {
                let s = player.uv.virus
                let base = tmp.uv.buyables[102].costb
                let exp = tmp.uv.buyables[102].coste
                let target = s.div(1e235).log(base).root(exp)
                return target.floor().add(1)
            },
        },
        103: {
            title: "UnBoosted Layer",
            cost() { // cost for buying xth buyable, can be an object if there are multiple currencies
                let base = tmp.uv.buyables[103].costb
                let exp = tmp.uv.buyables[103].coste
                let x = player.uv.buyables[103]
                let cost = Decimal.pow(base,x.pow(exp)).mul(1e272)
                return cost
            },
            costb() { // cost for buying xth buyable, can be an object if there are multiple currencies
                let cost = new Decimal(1e10)
                return cost
            },
            coste() { 
                let cost = decimalTwo
                return cost
            },
            base() { 
                let base = new Decimal(0.1)
                if (hasMilestone("ct",22)) base = base.add(0.1)
                if (hasUpgrade("uv",125)) base = base.add(0.05)
                return base
            },
            effect() { // Effects of owning x of the items, x is a decimal
                let x = player.uv.buyables[103]
                let base = tmp.uv.buyables[103].base
                return Decimal.mul(base, x);
            },
            display() { // Everything else displayed in the buyable button after the title
                if (player.tab != "uv" || player.subtabs.uv.mainTabs != "Buyables") return
                let extra = ""
                let dis = "Increase effective Unvaxxed Layers by " + format(tmp[this.layer].buyables[this.id].base)
                return dis + ".\n\
                Cost: " + formatWhole(tmp[this.layer].buyables[this.id].cost)+" UnBoosted "+(tmp.uv.buyables[103].cost.eq(1)?"Virus":"Viruses")+"\n\
                Effect: +" + format(tmp[this.layer].buyables[this.id].effect)+"\n\
                Amount: " + formatWhole(getBuyableAmount("uv", 103))
            },
            unlocked() { return hasUpgrade("uv",35) }, 
            canAfford() {
                    return player.uv.virus.gte(tmp[this.layer].buyables[this.id].cost)},
            buy() { 
                cost = tmp[this.layer].buyables[this.id].cost
                let max = tmp.uv.buyables[103].maxAfford
                let b = max.max(1)
                if (tmp[this.layer].buyables[this.id].canAfford) {
                    if (false) player[this.layer].buyables[this.id] = b
                    else {
                        player.uv.virus = player.uv.virus.sub(cost)
                        player.uv.uvReset = player.uv.uvReset.mul(tmp[this.layer].buyables[this.id].base)
                        player[this.layer].buyables[this.id] = player[this.layer].buyables[this.id].add(1).max(1)
                    }
                }
            },
            maxAfford() {
                let s = player.uv.virus
                let base = tmp.uv.buyables[103].costb
                let exp = tmp.uv.buyables[103].coste
                let target = s.div(1e272).log(base).root(exp)
                return target.floor().add(1)
            },
        },
        111: {
            title: "UnBoosted Base",
            cost() { // cost for buying xth buyable, can be an object if there are multiple currencies
                let base = tmp.uv.buyables[111].costb
                let exp = tmp.uv.buyables[111].coste
                let x = player.uv.buyables[111]
                let cost = Decimal.pow(base,x.pow(exp)).mul("e324")
                return cost
            },
            costb() { // cost for buying xth buyable, can be an object if there are multiple currencies
                let cost = new Decimal(1e10)
                return cost
            },
            coste() { 
                let cost = new Decimal(1.5)
                return cost
            },
            base() { 
                let base = new Decimal(0.01)
                return base
            },
            base2() { 
                let base = new Decimal(1.1)
                if (hasMilestone("Ud",61) && player.ct.LaBas.gte("7871e7868")) base = base.add(0.2)
                if (hasUpgrade("uv",126)) base = base.add(0.1)
                return base
            },
            effect() { // Effects of owning x of the items, x is a decimal
                let x = player.uv.buyables[111]
                let base = tmp.uv.buyables[111].base
                return Decimal.mul(base, x);
            },
            effect2() { // Effects of owning x of the items, x is a decimal
                let x = player.uv.buyables[111]
                let base = tmp.uv.buyables[111].base2
                return Decimal.pow(base, x);
            },
            display() { // Everything else displayed in the buyable button after the title
                if (player.tab != "uv" || player.subtabs.uv.mainTabs != "Buyables") return
                let extra = ""
                let dis = "Increase 'UnBoosted Virus Multiplier' base by " + format(tmp[this.layer].buyables[this.id].base) + " and multiply UnBoosted Virus gain base by " + format(tmp[this.layer].buyables[this.id].base2)
                return dis + ".\n\
                Cost: " + formatWhole(tmp[this.layer].buyables[this.id].cost)+" UnBoosted "+(tmp.uv.buyables[111].cost.eq(1)?"Virus":"Viruses")+"\n\
                Effect: +" + format(tmp[this.layer].buyables[this.id].effect) + ", " + format(tmp[this.layer].buyables[this.id].effect2)+"x\n\
                Amount: " + formatWhole(getBuyableAmount("uv", 111))
            },
            unlocked() { return hasUpgrade("uv",35) }, 
            canAfford() {
                    return player.uv.virus.gte(tmp[this.layer].buyables[this.id].cost)},
            buy() { 
                cost = tmp[this.layer].buyables[this.id].cost
                let max = tmp.uv.buyables[111].maxAfford
                let b = max.max(1)
                if (tmp[this.layer].buyables[this.id].canAfford) {
                    if (false) player[this.layer].buyables[this.id] = b
                    else {
                        player.uv.virus = player.uv.virus.sub(cost)
                        player.uv.uvReset = player.uv.uvReset.mul(tmp[this.layer].buyables[this.id].base)
                        player[this.layer].buyables[this.id] = player[this.layer].buyables[this.id].add(1).max(1)
                    }
                }
            },
            maxAfford() {
                let s = player.uv.virus
                let base = tmp.uv.buyables[111].costb
                let exp = tmp.uv.buyables[111].coste
                let target = s.div("e324").log(base).root(exp)
                return target.floor().add(1)
            },
        },
},
}),
