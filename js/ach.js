addLayer("a", {
    name: "Achievements", // This is optional, only used in a few places, If absent it just uses the layer id.
    symbol: "A", // This appears on the layer's node. Default is the id with the first letter capitalized
    position: 2, // Horizontal position within a row. By default it uses the layer id and sorts in alphabetical order
    startData() { return {
        unlocked: true,
        points: decimalZero,
    }},
    tooltip() {
      return "Achievements"
    },
    color: "#FFFF00",
    nodeStyle() {return {
        "background": "radial-gradient(#FFFF00, #d5ad83)" ,
    }},
    requires: decimalZero, // Can be a function that takes requirement increases into account
    resource: "Achievement Points",
    resourceSingular: "Achievement Point", 
    type: "none", // normal: cost to gain currency depends on amount gained. static: cost depends on how much you already have
    exponent: 0.5, // Prestige currency exponent
    row: "side", // Row the layer is in on the tree (0 is the first row)
    layerShown() { return true },
    achievements: {
        rows: 30,
        cols: 6,
        11: {
            name: "Start",
            tooltip: "Get 2 cases. Reward: 1 AP.",
            done() {
                return player.points.gte(2)
            },
            onComplete() {
                addPoints("a",1)
            }
        },
        12: {
            name: "Infect",
            tooltip: "Get 10 cases. Reward: 1 AP.",
            done() {
                return player.points.gte(10)
            },
            onComplete() {
                addPoints("a",1)
            }
        },
        13: {
            name: "Thousand Infected",
            tooltip() {return "Get "+formatWhole(1e3)+" cases. Reward: 1 AP."},
            done() {
                return player.points.gte(1000)
            },
            onComplete() {
                addPoints("a",1)
            }
        },
        14: {
            name: "Million Infected",
            tooltip() {return "Get "+formatWhole(1e6)+" cases. Reward: 1 AP."},
            done() {
                return player.points.gte(1e6)
            },
            onComplete() {
                addPoints("a",1)
            }
        },
        15: {
            name: "Covid 19",
            tooltip() {return "Get "+formatWhole(63154455)+" cases. Reward: 1 AP."},
            done() {
                return player.points.gte(63154455)
            },
            onComplete() {
                addPoints("a",1)
            }
        },
        16: {
            name: "World Infected",
            tooltip() {return "Get "+formatWhole(7.8e9)+" cases. Reward: 1 AP."},
            done() {
                return player.points.gte(7.8e9)
            },
            onComplete() {
                addPoints("a",1)
            }
        },
        21: {
            name: "Infected infections",
            tooltip: "Get 10 infectivity. Reward: 1 AP, AP boosts VP",
            done() {
                return player.i.points.gte(10)
            },
            onComplete() {
                addPoints("a",1)
            }
        },
        22: {
            name: "Upgraded infections",
            tooltip: "Get 5 infectivity upgrades. Reward: 1 AP.",
            done() {
                return player.i.upgrades.length>=5
            },
            onComplete() {
                addPoints("a",1)
            }
        },
        23: {
            name: "Replicated",
            tooltip: "Get 1 replicator. Reward: 2 AP.",
            done() {
                return player.r.points.gte(1)
            },
            onComplete() {
                addPoints("a",2)
            }
        },
        24: {
            name: "Infected company",
            tooltip() {return "Get "+formatWhole(1e100)+" cases. Reward: 2 AP."},
            done() {
                return player.points.gte(1e100)
            },
            onComplete() {
                addPoints("a",2)
            }
        },
        25: {
            name: "Infinite infections",
            tooltip() {return "Get "+formatWhole(Decimal.pow(2,1024))+" cases. Reward: 2 AP."},
            done() {
                return player.points.gte(Decimal.pow(2,1024))
            },
            onComplete() {
                addPoints("a",2)
            }
        },
        26: {
            name: "SUS Upgrade",
            tooltip: "Get 7 infectivity upgrades. Reward: 2 AP.",
            done() {
                return player.i.upgrades.length>=7
            },
            onComplete() {
                addPoints("a",2)
            }
        },
        31: {
            name: "Uncoated",
            tooltip: "Get 1 uncoater. Reward: 2 AP, AP boosts infectivity and keep virus upgrades",
            done() {
                return player.u.points.gte(1)
            },
            onComplete() {
                addPoints("a",2)
            }
        },
        32: {
            name: "(softcapped)",
            tooltip: "Get 2 uncoater upgrades. Reward: 2 AP.",
            done() {
                return player.u.upgrades.length>=2
            },
            onComplete() {
                addPoints("a",2)
            }
        },
        33: {
            name: "(hardcapped)",
            tooltip: "Get 5 uncoater upgrades. Reward: 2 AP.",
            done() {
                return player.u.upgrades.length>=5
            },
            onComplete() {
                addPoints("a",2)
            }
        },
        34: {
            name: "Challenging",
            tooltip: "Complete an uncoater challenge. Reward: 2 AP.",
            done() {
                return challengeCompletions("u", 11)>=1
            },
            onComplete() {
                addPoints("a",2)
            }
        },
        35: {
            name: "Severe case",
            tooltip: "Get 1 severity. Reward: 3 AP.",
            done() {
                return player.s.severity.gte(1)
            },
            onComplete() {
                addPoints("a",3)
            }
        },
        36: {
            name: "Auto",
            tooltip: "Get 11 symptom upgrades. Reward: 3 AP.",
            done() {
                return player.s.upgrades.length>=11
            },
            onComplete() {
                addPoints("a",3)
            }
        },
        41: {
            name: "Dead",
            tooltip: "Get 1 death. Reward: 3 AP, Autobuy buyables, 'Smell Loss' buys 2x more and faster, AP boosts severity, Keep I/R upgrades",
            done() {
                return player.d.points.gte(1)
            },
            onComplete() {
                addPoints("a",3)
            }
        },
        42: {
            name: "Automated",
            tooltip: "Get 8 death milestones. Reward: 3 AP, AP formula is better",
            done() {
                return hasMilestone("d", 7)
            },
            onComplete() {
                addPoints("a",3)
            }
        },
        43: {
            name: "Corona Death",
            tooltip() {return "Get "+formatWhole(1466925)+" deaths. Reward: 3 AP, Double death gain"},
            done() {
                return player.d.points.gte(1466925)
            },
            onComplete() {
                addPoints("a",3)
            }
        },
        44: {
            name: "Coffin",
            tooltip() {return "Get "+formatWhole(1e30)+" deaths. Reward: 3 AP, Double death gain"},
            done() {
                return player.d.points.gte(1e30)
            },
            onComplete() {
                addPoints("a",3)
            }
        },
        45: {
            name: "Coffin Dance",
            tooltip() {return "Get "+formatWhole(1e100)+" deaths. Reward: 4 AP."},
            done() {
                return player.d.points.gte(1e100)
            },
            onComplete() {
                addPoints("a",4)
            }
        },
        46: {
            name: "Coughin Dance",
            tooltip: "Get 14 death upgrades. Reward: 4 AP.",
            done() {
                return player.d.upgrades.length>=14
            },
            onComplete() {
                addPoints("a",4)
            }
        },
        51: {
            name: "Mortal Kombat",
            tooltip: "Get 1 fatality. Reward: 4 AP.",
            done() {
                return player.f.points.gte(1)
            },
            onComplete() {
                addPoints("a",4)
            }
        },
        52: {
            name: "Kortal Mombat",
            tooltip: "Get 2 fatality upgrades. Reward: 4 AP, AP boosts death gain",
            done() {
                return player.f.upgrades.length>=2
            },
            onComplete() {
                addPoints("a",4)
            }
        },
        53: {
            name: "DIMENSIONS??",
            tooltip: "Get 6 fatality milestones. Reward: 4 AP, 'More Fatal' buys 5x more and 2x faster",
            done() {
                return player.f.milestones.length>=6
            },
            onComplete() {
                addPoints("a",4)
            }
        },
        54: {
            name: "NG+++ INFECTED",
            tooltip() {return "Get "+formatWhole("ee18")+" cases. Reward: 4 AP, Double Fatality Dimensions"},
            done() {
                return player.points.gte("ee18")
            },
            onComplete() {
                addPoints("a",4)
            }
        },
        55: {
            name: "PPOOWWEERR!",
            tooltip() {return "Get "+formatWhole("ee3")+" fatality power. Reward: 4 AP."},
            done() {
                return player.f.p.gte(Decimal.pow(10,1e3))
            },
            onComplete() {
                addPoints("a",4)
            }
        },
        56: {
            name: "The 9th Dimension is a lie",
            tooltip: "Get exactly 99 8th Dimensions. Reward: 5 AP.",
            done() {
                return player.f.buyables[24].eq(99)
            },
            onComplete() {
                addPoints("a",5)
            }
        },
        61: {
            name: "Casual",
            tooltip: "Get 1 casualty. Reward: 5 AP.",
            done() {
                return player.f.casualty.gte(1)
            },
            onComplete() {
                addPoints("a",5)
            }
        },
        62: {
            name: "Fatally Challenged",
            tooltip: "Complete 4 Fatality Challenges Reward: 5 AP.",
            done() {
                return hasChallenge("f",11) && hasChallenge("f",12) && hasChallenge("f",21) && hasChallenge("f",22)
            },
            onComplete() {
                addPoints("a",5)
            }
        },
        63: {
            name: "Zero Deaths",
            tooltip() {return "Get "+formatWhole("ee4")+" fatality without Dimension and Multiplier Boosts. Reward: 5 AP."},
            done() {
                return player.f.points.gte("ee4") && player.f.buyables[32].eq(0) && player.f.buyables[33].eq(0)
            },
            onComplete() {
                addPoints("a",5)
            }
        },
        64: {
            name: "REPLICANTI",
            tooltip: "Unlock Casuals. Reward: 5 AP.",
            done() {
                return hasMilestone("f",17)
            },
            onComplete() {
                addPoints("a",5)
            }
        },
        65: {
            name: "'ZERO' Deaths",
            tooltip() {return "Get "+formatWhole("6e666666")+" fatality without Dimension and Multiplier Boosts in Casualty Challenge 1. Reward: 5 AP, AP boosts fatality dimensions"},
            done() {
                return player.f.points.gte("6e666666") && player.f.buyables[32].eq(0) && player.f.buyables[33].eq(0) && inChallenge("f",31)
            },
            onComplete() {
                addPoints("a",5)
            }
        },
        66: {
            name: "0 cases from Casualty",
            tooltip: "Get 1 Casualty Dimension 8. Reward: 5 AP.",
            done() {
                return player.f.buyables[84].gte(1)
            },
            onComplete() {
                addPoints("a",5)
            }
        },
        71: {
            name: "GoogolPlex",
            tooltip() {return "Get "+formatWhole("ee100")+" cases. Reward: 5 AP."},
            done() {
                return player.points.gte("ee100")
            },
            onComplete() {
                addPoints("a",5)
            }
        },
        72: {
            name: "When will it be enough?",
            tooltip() {return "Get "+formatWhole("e30000")+" casuals. Reward: 5 AP."},
            done() {
                return player.f.casuals.gte("e30000")
            },
            onComplete() {
                addPoints("a",5)
            }
        },
        73: {
            name: "GAS",
            tooltip() {return "Get "+formatWhole("eee3")+" cases. Reward: 6 AP."},
            done() {
                return player.points.gte("eee3")
            },
            onComplete() {
                addPoints("a",6)
            }
        },
        74: {
            name: "Corona GAS",
            tooltip() {
                let a = "Get "+formatWhole("eee6")+" cases. Reward: 6 AP, multiply infection power and infectious disease gain (decreases with more IDs, starts at 5e285 IDs)"
                let b = "<br>Currently: "+format(tmp.a.achievements[74].effect)+"x"
                return  a+b
            },
            done() {
                return player.points.gte("eee6")
            },
            effect() {
                if (player.e.diseases.lt(5e285)) return decimalOne
                return player.e.diseases.div(5e284).max(10).log10().pow(-0.275).mul(6).add(1)
            },
            onComplete() {
                addPoints("a",6)
            }
        },
        75: {
            name: "Infected Challenge",
            tooltip: "Complete all Infecter Challenges. Reward: 6 AP.",
            done() {
                return player.e.c11.gte(1e6) && player.e.c12.gte(1e6)
            },
            onComplete() {
                addPoints("a",6)
            }
        },
        76: {
            name: "Unimmune",
            tooltip: "Get 1 'Immunity Base'. Reward: 6 AP.",
            done() {
                return player.e.buyables[23].gte(1)
            },
            onComplete() {
                addPoints("a",6)
            }
        },
        81: {
            name: "Diseased Diseases",
            tooltip: "Get 1 'Disease Boost'. Reward: 7 AP.",
            done() {
                return player.e.buyables[42].gte(1)
            },
            onComplete() {
                addPoints("a",7)
            }
        },
        82: {
            name: "Quarantined",
            tooltip: "Get 1 Unquarantined Infection. Reward: 7 AP.",
            done() {
                return player.e.qt.gte(1)
            },
            onComplete() {
                addPoints("a",7)
            }
        },
        83: {
            name: "E-World Quarantine",
            tooltip() {return "Get "+format("e78e8")+" cases in Quarantine. Reward: 8 AP."},
            done() {
                return player.e.inC && player.points.gte("e7.8e9")
            },
            onComplete() {
                addPoints("a",8)
            }
        },
        84: {
            name: "Unquarantined Quarantine",
            tooltip: "Get Unquarantined Infections out of Quarantine. Reward: 8 AP.",
            done() {
                return hasUpgrade("e",162)
            },
            onComplete() {
                addPoints("a",8)
            }
        },
        85: {
            name: "GAS GAS",
            tooltip() {return "Get "+format("eee20")+" cases. Reward: 8 AP."},
            done() {
                return player.points.gte("eee20")
            },
            onComplete() {
                addPoints("a",8)
            }
        },
        86: {
            name: "Multi-Million",
            tooltip: "Get 1,000,000 Multiplier Boosts. Reward: 8 AP.",
            done() {
                return player.f.buyables[33].gte(1e6)
            },
            onComplete() {
                addPoints("a",8)
            }
        },
        91: {
            name: "Cased GAS",
            tooltip() {return "Get "+format(Decimal.pow(Math.E,Decimal.pow(Math.E,Decimal.pow(Math.E,79))))+" cases. Reward: 9 AP."},
            done() {
                return player.points.gte(Decimal.pow(Math.E,Decimal.pow(Math.E,Decimal.pow(Math.E,79))))
            },
            onComplete() {
                addPoints("a",9)
            }
        },
        92: {
            name: "Atomic Virus",
            tooltip: "Get 1 Atom. Reward: 9 AP.",
            done() {
                return player.e.h.gte(1)
            },
            onComplete() {
                addPoints("a",9)
            }
        },
        93: {
            name: "Molecular Virus",
            tooltip: "Get 1 Molecule. Reward: 9 AP.",
            done() {
                return player.e.ad.gte(1) || player.e.ur.gte(1)
            },
            onComplete() {
                addPoints("a",9)
            }
        },
        94: {
            name: "Phosphate",
            tooltip: "Get 1 Phosphorus. Reward: 9 AP.",
            done() {
                return player.e.ph.gte(1)
            },
            onComplete() {
                addPoints("a",9)
            }
        },
        95: {
            name: "Phosphate Virus",
            tooltip: "Get 1 Ribose-Phosphate. Reward: 9 AP.",
            done() {
                return player.e.rp.gte(1)
            },
            onComplete() {
                addPoints("a",9)
            }
        },
        96: {
            name: "mRNA Virus",
            tooltip: "Get 1 mRNA. Reward: 10 AP.",
            done() {
                return player.e.mrna.gte(1)
            },
            onComplete() {
                addPoints("a",10)
            }
        },
        101: {
            name: "Corona GAS GAS",
            tooltip() {return "Get "+format("eee1000")+" cases. Reward: 10 AP."},
            done() {
                return player.points.gte("eee1000")
            },
            onComplete() {
                addPoints("a",10)
            }
        },
        102: {
            name: "Automatic Diseases",
            tooltip: "Get 8 Infecter milestones. Reward: 10 AP.",
            done() {
                return player.e.points.gte(2e4)
            },
            onComplete() {
                addPoints("a",10)
            }
        },
        103: {
            name: "Mutated",
            tooltip: "Get 1 MMNA. Reward: 10 AP.",
            done() {
                return player.e.mm.gte(1)
            },
            onComplete() {
                addPoints("a",10)
            }
        },
        104: {
            name: "Infecterrr",
            tooltip: "Get 10 Infecter milestones. Reward: 10 AP.",
            done() {
                return player.e.points.gte(5e4)
            },
            onComplete() {
                addPoints("a",10)
            }
        },
        105: {
            name: "In'F'ected",
            tooltip() {return "Get "+format(tet10(5))+" cases. Reward: 10 AP."},
            done() {
                return player.points.gte(Decimal.tetrate(10,5))
            },
            onComplete() {
                addPoints("a",10)
            }
        },
        106: {
            name: "COV",
            tooltip: "Get 3 Corona Mutations. Reward: 10 AP.",
            done() {
                return player.e.mu2.gte(3)
            },
            onComplete() {
                addPoints("a",10)
            }
        },
        111: {
            name: "Mutant",
            tooltip: "Get 300 Mutations. Reward: 15 AP.",
            done() {
                return player.e.mu.gte(300)
            },
            onComplete() {
                addPoints("a",15)
            }
        },
        112: {
            name: "CO.RO.NA.",
            tooltip: "Get 1 CRNA. Reward: 15 AP.",
            done() {
                return player.e.crna.gte(1)
            },
            onComplete() {
                addPoints("a",15)
            }
        },
        113: {
            name: "COVI",
            tooltip: "Get 7 Corona Mutations. Reward: 15 AP.",
            done() {
                return player.e.mu2.gte(7)
            },
            onComplete() {
                addPoints("a",15)
            }
        },
        114: {
            name: "Mutated Mutations",
            tooltip: "Get 1,000 Mutations. Reward: 15 AP.",
            done() {
                return player.e.mu.gte(1e3)
            },
            onComplete() {
                addPoints("a",15)
            }
        },
        115: {
            name: "CoTona",
            tooltip: "Get 1 CTNA. Reward: 15 AP.",
            done() {
                return player.ct.total.gte(1)
            },
            onComplete() {
                addPoints("a",15)
            }
        },
        116: {
            name: "CoMutated",
            tooltip: "Get 20 Corona Mutations. Reward: 15 AP.",
            done() {
                return player.e.mu2.gte(20)
            },
            onComplete() {
                addPoints("a",15)
            }
        },
        121: {
            name: "CRPonent",
            tooltip: "Get 1 'CRNA Exponent'. Reward: 15 AP.",
            done() {
                return player.ct.buyables[11].gte(1)
            },
            onComplete() {
                addPoints("a",15)
            }
        },
        122: {
            name: "CorVutated",
            tooltip: "Get 100 Corona Mutations. Reward: 15 AP.",
            done() {
                return player.e.mu2.gte(100)
            },
            onComplete() {
                addPoints("a",15)
            }
        },
        123: {
            name: "CrowBird 19",
            tooltip: "Get 1 CorVid. Reward: 20 AP.",
            done() {
                return player.ct.CorVid.gte(1)
            },
            onComplete() {
                addPoints("a",20)
            }
        },
        124: {
            name: "UnLogged",
            tooltip: "Get less than 0 log. Reward: 20 AP.",
            done() {
                return tmp.e.crlog.lt(0)
            },
            onComplete() {
                addPoints("a",20)
            }
        },
        125: {
            name: "VoCiMutation",
            tooltip: "Get 30,000 Corona Mutations. Reward: 20 AP.",
            done() {
                return player.e.mu2.gte(3e4)
            },
            onComplete() {
                addPoints("a",20)
            }
        },
        126: {
            name: "Outside",
            tooltip() {return "Get "+format(1e100)+" LaBas. Reward: 20 AP."},
            done() {
                return player.ct.LaBas.gte(1e100)
            },
            onComplete() {
                addPoints("a",20)
            }
        },
        131: {
            name: "Crowna Mutater",
            tooltip: "Get 1,000,000 Corona Mutations. Reward: 25 AP.",
            done() {
                return player.e.mu2.gte(1e6)
            },
            onComplete() {
                addPoints("a",25)
            }
        },
        132: {
            name: "CrowBirder",
            tooltip: "Get 1 'CorVid Gain'. Reward: 25 AP.",
            done() {
                return player.ct.buyables[61].gte(1)
            },
            onComplete() {
                addPoints("a",25)
            }
        },
        133: {
            name: "Milestone Booster",
            tooltip: "Get 20 CTNA Milestones. Reward: 25 AP.",
            done() {
                return player.ct.milestones.length>=20
            },
            onComplete() {
                addPoints("a",25)
            }
        },
        134: {
            name: "CrowBird '19'",
            tooltip() {return "Get "+format(1e19)+" CorVids. Reward: 25 AP."},
            done() {
                return player.ct.CorVid.gte(1e19)
            },
            onComplete() {
                addPoints("a",25)
            }
        },
        135: {
            name: "Mask^-1",
            tooltip: "Get 1 Anti-Masker. Reward: 25 AP.",
            done() {
                return player.ct.Am.gte(1)
            },
            onComplete() {
                addPoints("a",25)
            }
        },
        136: {
            name: "No Maskers",
            tooltip: "Get 100 Anti-Maskers. Reward: 25 AP.",
            done() {
                return player.ct.Am.gte(100)
            },
            onComplete() {
                addPoints("a",25)
            }
        },
        141: {
            name: "Anti-Gambler",
            tooltip: "Unlock Anti-Roulette. Reward: 25 AP.",
            done() {
                return hasUpgrade("ct",113)
            },
            onComplete() {
                addPoints("a",25)
            }
        },
        142: {
            name: "Anti-House",
            tooltip: "Get an Edge. Reward: 25 AP.",
            done() {
                return hasUpgrade("ct",114)
            },
            onComplete() {
                addPoints("a",25)
            }
        },
        143: {
            name: "Lucky Player",
            tooltip: "Win 5 times in a row (After getting 'Streak Multiplier'). Reward: 30 AP.",
            done() {
                return player.ct.winstreak>4
            },
            onComplete() {
                addPoints("a",30)
            }
        },
        144: {
            name: "Rigging the wheel",
            tooltip: "Get more than 50% Win Chance. Reward: 30 AP.",
            done() {
                return hasUpgrade("ct",125)
            },
            onComplete() {
                addPoints("a",30)
            }
        },
        145: {
            name: "Roller",
            tooltip: "Unlock Auto-Roll. Reward: 30 AP, double Bet Amount",
            done() {
                return hasUpgrade("ct",131)
            },
            onComplete() {
                addPoints("a",30)
            }
        },
        146: {
            name: "Unlucky Player",
            tooltip: "Lose 5 times in a row with at least 60% Win Chance. Reward: 30 AP, double Bet Amount",
            done() {
                return player.ct.losestreak>4 && tmp.ct.getWinChance>=0.6
            },
            onComplete() {
                addPoints("a",30)
            }
        },
        151: {
            name: "Best Bets",
            tooltip: "Get 3 'Better Bets'. Reward: 30 AP, 5x Bet Amount",
            done() {
                return tmp.ct.getIter>3
            },
            onComplete() {
                addPoints("a",30)
            }
        },
        152: {
            name: "Green Roller",
            tooltip: "Win on Green. Reward: 30 AP, AP boosts Bet Amount",
            done() {
                return player.ct.gwinstreak>0
            },
            onComplete() {
                addPoints("a",30)
            }
        },
        153: {
            name: "Anti-Maskest",
            tooltip: "Get 1 'AM Booster'. Reward: 30 AP.",
            done() {
                return player.ct.buyables[83].gte(1)
            },
            onComplete() {
                addPoints("a",30)
            }
        },
        154: {
            name: "Luckier Player",
            tooltip: "Win 15 times in a row. Reward: 30 AP.",
            done() {
                return player.ct.winstreak>14
            },
            onComplete() {
                addPoints("a",30)
            }
        },
        155: {
            name: "Lucky Greens",
            tooltip: "Win 2 times in a row on Green. Reward: 30 AP.",
            done() {
                return player.ct.gwinstreak>1
            },
            onComplete() {
                addPoints("a",30)
            }
        },
        156: {
            name: "Unluckier Player",
            tooltip: "Lose 4 times in a row with at least 75% Win Chance. Reward: 30 AP, Green Exponent is 10",
            done() {
                return player.ct.losestreak>3 && tmp.ct.getWinChance>=0.75
            },
            onComplete() {
                addPoints("a",30)
            }
        },
        161: {
            name: "Vaccination Opposer",
            tooltip: "Get 1 Anti-Vaxxer. Reward: 50 AP.",
            done() {
                return player.ct.Avaxxers.gte(1)
            },
            onComplete() {
                addPoints("a",50)
            }
        },
        162: {
            name: "Luckiest Player",
            tooltip: "Win 1,000 times in a row. Reward: 50 AP.",
            done() {
                return Decimal.gte(player.ct.winstreak,1e3)
            },
            onComplete() {
                addPoints("a",50)
            }
        },
        163: {
            name: "Green=EVEN",
            tooltip: "Get 18/37 Green Chance. Reward: 50 AP, AP boosts Anti-Vaccine gain",
            done() {
                return hasUpgrade("ct",182)
            },
            onComplete() {
                addPoints("a",50)
            }
        },
        164: {
            name: "Luckier Greens",
            tooltip: "Win 100 times in a row on Green. Reward: 50 AP.",
            done() {
                return Decimal.gte(player.ct.gwinstreak,100)
            },
            onComplete() {
                addPoints("a",50)
            }
        },
        165: {
            name: "Capped↑↑10",
            tooltip() {return "Get "+format(tet10(10))+" cases. Reward: 50 AP."},
            done() {
                return player.points.gte(tet10(10))
            },
            onComplete() {
                addPoints("a",50)
            }
        },
        166: {
            name: "Adverse Event",
            tooltip: "Get 1 Side Effect. Reward: 50 AP.",
            done() {
                return player.ct.SideEff.gte(1)
            },
            onComplete() {
                addPoints("a",50)
            }
        },
        171: {
            name: "Harmful Effects",
            tooltip: "Get 1 'Side Boost'. Reward: 50 AP.",
            done() {
                return player.ct.buyables[153].gte(1)
            },
            onComplete() {
                addPoints("a",50)
            }
        },
        172: {
            name: "Adverser Event",
            tooltip: "Get 1 Adverse Effect. Reward: 50 AP.",
            done() {
                return player.ct.AdEff.gte(1)
            },
            onComplete() {
                addPoints("a",50)
            }
        },
        173: {
            name: "CASED GAS GAS",
            tooltip() {return "Get "+format(tet10(20))+" cases. Reward: 50 AP."},
            done() {
                return player.points.gte(tet10(20))
            },
            onComplete() {
                addPoints("a",50)
            }
        },
        174: {
            name: "Difficulties",
            tooltip: "Get 1 Adversity. Reward: 50 AP.",
            done() {
                return player.ct.Adversity.gte(1)
            },
            onComplete() {
                addPoints("a",50)
            }
        },
        175: {
            name: "Adverse Difficulties",
            tooltip: "Get 1 'Adversity Gain'. Reward: 50 AP.",
            done() {
                return player.ct.buyables[163].gte(1)
            },
            onComplete() {
                addPoints("a",50)
            }
        },
        176: {
            name: "Giggol Infected",
            tooltip() {return "Get "+format(tet10(100))+" cases. Reward: 50 AP."},
            done() {
                return player.points.gte(tet10(100))
            },
            onComplete() {
                addPoints("a",50)
            }
        },
        181: {
            name: "Difficult Difficulties",
            tooltip: "Get 1 'Adversity Gain 2'. Reward: 50 AP.",
            done() {
                return player.ct.buyables[164].gte(1)
            },
            onComplete() {
                addPoints("a",50)
            }
        },
        182: {
            name: "In'F'inite CASES",
            tooltip() {return "Get "+format(tet10(Decimal.pow(2,1024).log10()))+" cases. Reward: 50 AP."},
            done() {
                return player.points.gte(tet10(Decimal.pow(2,1024).log10()))
            },
            onComplete() {
                addPoints("a",50)
            }
        },
        183: {
            name: "Anti-Anti-AntiVaxxed",
            tooltip: "Get 1 Unvaccinated Vaxxer. Reward: 50 AP, buy max 'Adverse Boost'",
            done() {
                return player.ct.Uv.gte(1)
            },
            onComplete() {
                addPoints("a",50)
            }
        },
        184: {
            name: "Anti-Vaxxed Giggol",
            tooltip() {return "Get "+format(tet10(100))+" cases in Vaccination. Reward: 50 AP."},
            done() {
                return player.points.gte(tet10(100)) && player.ct.inC
            },
            onComplete() {
                addPoints("a",50)
            }
        },
        185: {
            name: "Anti-Vaxxed Adversity",
            tooltip: "Get 1 'Adversity Gain 2' in Vaccination. Reward: 50 AP.",
            done() {
                return player.ct.buyables[164].gte(1) && player.ct.inC
            },
            onComplete() {
                addPoints("a",50)
            }
        },
        186: {
            name: "In'F'inite ANTI-VAX",
            tooltip() {return "Get "+format(tet10(Decimal.pow(2,1024).log10()))+" cases in Vaccination. Reward: 50 AP."},
            done() {
                return player.points.gte(tet10(Decimal.pow(2,1024).log10())) && player.ct.inC
            },
            onComplete() {
                addPoints("a",50)
            }
        },
        191: {
            name: "Harmful-Vaxxer",
            tooltip: "Get 1 Adverse Vaxxer. Reward: 50 AP, Double UV gain per Adverse Vaxxer upgrade",
            done() {
                return player.ct.Advaxxers.gte(1)
            },
            onComplete() {
                addPoints("a",50)
            }
        },
        192: {
            name: "Harmfuler-Vaxxer",
            tooltip: "Get 2 Adverse Vaxxer Upgrades. Reward: 50 AP, Double UV and Adverse Vaxxer gain, Start with 1e50 UV",
            done() {
                return player.ct.upgrades.filter(x=>x>340).length>=2
            },
            onComplete() {
                addPoints("a",50)
            }
        },
        193: {
            name: "Upgraded Vaxxer",
            tooltip: "Get 5 Adverse Vaxxer Upgrades. Reward: 50 AP, Double Adverse Vaxxer gain",
            done() {
                return player.ct.upgrades.filter(x=>x>340).length>=5
            },
            onComplete() {
                addPoints("a",50)
            }
        },
        194: {
            name: "Million In'F'ected",
            tooltip() {return "Get "+format(tet10(1e6))+" cases. Reward: 50 AP, AP boosts UI gain."},
            done() {
                return player.points.gte(tet10(1e6))
            },
            onComplete() {
                addPoints("a",50)
            }
        },
        195: {
            name: "Anti-Ribonucleic",
            tooltip: "Get 2,022 aRNA Vaccines. Reward: 50 AP, Double Adverse Vaxxer gain and log10(UV) boosts UV gain.",
            done() {
                return player.ct.arna.gte(2022)
            },
            onComplete() {
                addPoints("a",50)
            }
        },
        196: {
            name: "Anti-Adenovirus",
            tooltip: "Get 2,023 AAV Vaccines. Reward: 50 AP, Double Adverse Vaxxer gain and log10(UV) boosts UV gain.",
            done() {
                return player.ct.aav.gte(2023)
            },
            onComplete() {
                addPoints("a",50)
            }
        },
        201: {
            name: "Anti-Inactivated",
            tooltip: "Get 2,024 AIV Vaccines. Reward: 50 AP, log10(Adverse Vaxxer) boosts Adverse Vaxxer gain and log10(UV) boosts UV gain.",
            done() {
                return player.ct.aiv.gte(2024)
            },
            onComplete() {
                addPoints("a",50)
            }
        },
        202: {
            name: "Anti-Subunit",
            tooltip: "Get 2,025 ASV Vaccines. Reward: 50 AP, log10(Adverse Vaxxer) boosts Adverse Vaxxer gain and log10(UV) boosts UV gain.",
            done() {
                return player.ct.asv.gte(2025)
            },
            onComplete() {
                addPoints("a",50)
            }
        },
        203: {
            name: "UnVaxxed Covid",// worldometer
            tooltip() {
                let a = "Get 590,362,339 cases in 'Booster Vaccine'. Reward: 100 AP, Adverse Vaxxer gain is multiplied by 1.01 per AP."
                let b = "<br>Currently: "+format(tmp.a.achievements[203].effect)+"x"
                return  a+b
            },
            done() {
                return player.points.gte(590362339) && inChallenge("ct",32)
            },
            effect() {
                return Decimal.pow(1.01,player.a.points)
            },
            onComplete() {
                addPoints("a",100)
            }
        },
        204: {
            name: "World In'F'ected",
            tooltip() {return "Get "+format(tet10(7.8e9))+" cases. Reward: 100 AP, AP boosts cases gain after slog."},
            done() {
                return player.points.gte(tet10(7.8e9))
            },
            onComplete() {
                addPoints("a",100)
            }
        },
        205: {
            name: "UnBoostered Virus",
            tooltip: "Get 1 symptom in 'Booster Vaccine'. Reward: 100 AP, AP boosts base cases gain at 1 symptom and remove AP effect hardcap in 'Booster Challenge'.",
            done() {
                return player.s.points.gte(1) && inChallenge("ct",32)
            },
            onComplete() {
                addPoints("a",100)
            }
        },
        206: {
            name: "TriTri",
            tooltip() {return "Get "+format(Decimal.pentate(3,3))+" cases. Reward: 100 AP."},
            done() {
                return player.points.gte(Decimal.pentate(3,3))
            },
            onComplete() {
                addPoints("a",100)
            }
        },
        211: {
            name: "F-World Vaccination",
            tooltip() {return "Get "+format(tet10(7.8e9))+" cases in Vaccination. Reward: 100 AP."},
            done() {
                return player.points.gte(tet10(78e8)) && player.ct.inC
            },
            onComplete() {
                addPoints("a",100)
            }
        },
        212: {
            name: "Deadly Boosters",
            tooltip: "Get 1 death in 'Booster Vaccine'. Reward: 100 AP, AP boosts base cases gain at 1 death.",
            done() {
                return player.d.points.gte(1) && inChallenge("ct",32)
            },
            onComplete() {
                addPoints("a",100)
            }
        },
        213: {
            name: "Coffin Boosters", //worldometer
            tooltip: "Get 6,470,055 deaths in 'Booster Vaccine'. Reward: 100 AP.",
            done() {
                return player.d.points.gte(6470055) && inChallenge("ct",32)
            },
            onComplete() {
                addPoints("a",100)
            }
        },
        214: {
            name: "Booster Coughin' Dance!", 
            tooltip() {return "Get "+format(Decimal.pow(2,1024))+" deaths in 'Booster Vaccine'. Reward: 100 AP, AP boosts Anti-Booster gain."},
            done() {
                return player.d.points.gte(Decimal.pow(2,1024)) && inChallenge("ct",32)
            },
            onComplete() {
                addPoints("a",100)
            }
        },
        215: {
            name: "Failure!", 
            tooltip: "Fail a challenge. Reward: 100 AP.",
            done() {
                return player.Up.fail==1
            },
            onComplete() {
                addPoints("a",100)
            }
        },
        216: {
            name: "Fatal Boosters",
            tooltip: "Get 1 fatality in 'Booster Vaccine'. Reward: 100 AP, AP boosts base cases gain at 1 fatality.",
            done() {
                return player.f.points.gte(1) && inChallenge("ct",32)
            },
            onComplete() {
                addPoints("a",100)
            }
        },
        221: {
            name: "GAS GAS GAS",
            tooltip() {return "Get "+format(tet10(1e20))+" cases. Reward: 100 AP, replicant interval is 2x faster."},
            done() {
                return player.points.gte(tet10(1e20))
            },
            onComplete() {
                addPoints("a",100)
            }
        },
        222: {
            name: "Booster Dimension",
            tooltip: "Get a Fatality Dimension in 'Booster Vaccine'. Reward: 100 AP, fatality and unvaxxed prion gain exponent+0.2 at 1 misfolded protein.",
            done() {
                return player.f.buyables[11].gte(1) && inChallenge("ct",32)
            },
            onComplete() {
                addPoints("a",100)
            }
        },
        223: {
            name: "Casual Booster",
            tooltip: "Get 1 casualty in 'Booster Vaccine'. Reward: 100 AP.",
            done() {
                return player.f.casualty.gte(1) && inChallenge("ct",32)
            },
            onComplete() {
                addPoints("a",100)
            }
        },
        224: {
            name: "'23R0' D34TH5",
            tooltip() {return "Get "+formatWhole("e111111")+" fatality without Dimension and Multiplier Boosts in Casualty Challenge 1 and 'Booster Vaccine'. Reward: 150 AP, Fatality exponent*1.01."},
            done() {
                return player.f.points.gte("e111111") && player.f.buyables[32].eq(0) && player.f.buyables[33].eq(0) && inChallenge("f",31) && inChallenge("ct",32)
            },
            onComplete() {
                addPoints("a",150)
            }
        },
        225: {
            name: "'23R0' R3PD34TH5",
            tooltip() {return "Get "+formatWhole("e1111111")+" fatality without Unvaxxed Replicator upgrades, Dimension and Multiplier Boosts in Casualty Challenge 1 and 'Booster Vaccine'. Reward: 150 AP, Fatality exponent*1.02."},
            done() {
                return player.f.points.gte("e1111111") && player.f.buyables[32].eq(0) && player.f.buyables[33].eq(0) && player.Ur.upgrades.length==0 && inChallenge("f",31) && inChallenge("ct",32)
            },
            onComplete() {
                addPoints("a",150)
            }
        },
        226: {
            name: "Infected Booster",
            tooltip: "Get 1 infecter in 'Booster Vaccine'. Reward: 150 AP.",
            done() {
                return player.e.points.gte(1) && inChallenge("ct",32)
            },
            onComplete() {
                addPoints("a",150)
            }
        },
        231: {
            name: "Diseased Booster",
            tooltip: "Get 1 infectious disease in 'Booster Vaccine'. Reward: 150 AP.",
            done() {
                return player.e.diseases.gte(1) && inChallenge("ct",32)
            },
            onComplete() {
                addPoints("a",150)
            }
        },
        232: {
            name: "Booster GAS",
            tooltip() { return "Get "+format("eee6")+" cases in 'Booster Vaccine'. Reward: 150 AP."},
            done() {
                return player.points.gte("eee6") && inChallenge("ct",32)
            },
            onComplete() {
                addPoints("a",150)
            }
        },
        233: {
            name: "Anti-Containment",
            tooltip() { return "Reduce the distancing to "+distShort(1)+". Reward: 150 AP."},
            done() {
                return tmp.ct.getDist.lt(1)
            },
            onComplete() {
                addPoints("a",150)
            }
        },
        234: {
            name: "Unquarantined Booster",
            tooltip() { return "Get "+format(1e45)+" unquarantined cases in 'Booster Vaccine'. Reward: 150 AP."},
            done() {
                return player.e.qc.gte(1e45) && inChallenge("ct",32)
            },
            onComplete() {
                addPoints("a",150)
            }
        },
        235: {
            name: "Crowded",
            tooltip() { return "Reduce the distancing to "+distShort(0.3048)+". Reward: 150 AP."},
            done() {
                return tmp.ct.getDist.lt(0.3048)
            },
            onComplete() {
                addPoints("a",150)
            }
        },
        236: {
            name: "Atomic Booster",
            tooltip() { return "Get 1 atom in 'Booster Vaccine'. Reward: 150 AP."},
            done() {
                return player.e.h.gte(1) && inChallenge("ct",32)
            },
            onComplete() {
                addPoints("a",150)
            }
        },
        241: {
            name: "BoosterCased GAS",
            tooltip() { return "Get "+format(Decimal.pow(Math.E,Decimal.pow(Math.E,Decimal.pow(Math.E,79))))+" cases in 'Booster Vaccine'. Reward: 150 AP."},
            done() {
                return player.points.gte(Decimal.pow(Math.E,Decimal.pow(Math.E,Decimal.pow(Math.E,79)))) && inChallenge("ct",32)
            },
            onComplete() {
                addPoints("a",150)
            }
        },
        242: {
            name: "Phosphate Booster",
            tooltip() { return "Get 1 Phosphorus in 'Booster Vaccine'. Reward: 150 AP."},
            done() {
                return player.e.ph.gte(1) && inChallenge("ct",32)
            },
            onComplete() {
                addPoints("a",150)
            }
        },
        243: {
            name: "CentiCrowd",
            tooltip() { return "Reduce the distancing to "+distShort(0.01)+". Reward: 150 AP."},
            done() {
                return tmp.ct.getDist.lt(0.01)
            },
            onComplete() {
                addPoints("a",150)
            }
        },
        244: {
            name: "mRNA Booster",
            tooltip() { return "Get 1 mRNA in 'Booster Vaccine'. Reward: 150 AP, atom exp+0.05."},
            done() {
                return player.e.mrna.gte(1) && inChallenge("ct",32)
            },
            onComplete() {
                addPoints("a",150)
            }
        },
        245: {
            name: "Microscopic",
            tooltip() { return "Reduce the distancing to "+distShort(1e-4)+". Reward: 150 AP."},
            done() {
                return tmp.ct.getDist.lt(1e-4)
            },
            onComplete() {
                addPoints("a",150)
            }
        },
        246: {
            name: "Covid Pandemic",
            tooltip() { return "Play for "+formatTime(tmp.a.achievements[246].days/1000)+" in this Adverse Vaxxer reset. Reward: 150 AP."},
            days() {
                let date1 = new Date("11/17/2019"); //1st case of COVID-19
                let date2 = new Date().getTime()
                return date2-date1
            },
            done() {
                let days = tmp.a.achievements[246].days/1000
                return player.ct.AdvTime>=days
            },
            onComplete() {
                addPoints("a",150)
            }
        },
        251: {
            name: "In'F'ected Booster",
            tooltip() {return "Get "+format(tet10(5))+" cases in 'Booster Vaccine'. Reward: 150 AP."},
            done() {
                return player.points.gte(Decimal.tetrate(10,5)) && inChallenge("ct",32)
            },
            onComplete() {
                addPoints("a",150)
            }
        },
        252: {
            name() {return "COV-"+new Date().getFullYear()},
            tooltip() { 
                let a = "Play for "+formatTimeLong(tmp.a.achievements[252].days)+" in this Adverse Vaxxer reset. Reward: 200 AP, Adverse Vaxxer reset time boosts base anti-distance gain."
                let b = "<br>Currently: "+format(tmp.a.achievements[252].effect)+"x"
                return a+b
            },
            effect() {
                let eff = Decimal.add(player.ct.AdvTime,1).pow(0.06)
                return eff
            },
            days() {
                let date = new Date().getFullYear()*31556952
                return date
            },
            done() {
                let days = tmp.a.achievements[252].days
                return player.ct.AdvTime>=days
            },
            onComplete() {
                addPoints("a",200)
            }
        },
        253: {
            name: "Crowded Virus",
            tooltip() { return "Reduce the distancing to "+distShort(1e-7)+". Reward: 200 AP."},
            done() {
                return tmp.ct.getDist.lt(1e-7)
            },
            onComplete() {
                addPoints("a",200)
            }
        },
        254: {
            name: "CO.RO.NA Booster",
            tooltip() { return "Get 1 CRNA in 'Booster Vaccine'. Reward: 200 AP."},
            done() {
                return player.e.crna.gte(1) && inChallenge("ct",32)
            },
            onComplete() {
                addPoints("a",200)
            }
        },
        255: {
            name: "Crowded Atoms",
            tooltip() { return "Reduce the distancing to "+distShort(1e-10)+". Reward: 200 AP, AP/1,000+1 boosts Anti-Distance gain.<br>Currently: "+format(tmp.a.achievements[255].effect)+"x"},
            effect() {
                let eff = player.a.points.div(1e3).add(1)
                return eff
            },
            done() {
                return tmp.ct.getDist.lt(1e-10)
            },
            onComplete() {
                addPoints("a",200)
            }
        },
        256: {
            name: "Covid Unidemic",
            tooltip() { 
                let a = "Play for "+formatTimeLong(tmp.a.achievements[256].days)+" in this Adverse Vaxxer reset. Reward: 200 AP."
                return a
            },
            days() {
                let date = new Decimal(435e15)
                return date
            },
            done() {
                let days = tmp.a.achievements[256].days
                return Decimal.gte(player.ct.AdvTime,days)
            },
            onComplete() {
                addPoints("a",200)
            }
        },
        261: {
            name: "Unvaxxed Coughin' Dance!", //worldometer 6/26/2023
            tooltip() { return "Get 6,894,285 unvaxxed deaths in 'Booster Vaccine'. Reward: 200 AP, AP/1,000+1 boosts UnBoosted Virus gain at 6,894,285 unvaxxed deaths.<br>Currently: "+format(tmp.a.achievements[261].effect)+"x."},
            effect() {
                if (player.Ud.points.lt(6894285)) return decimalOne
                let eff = player.a.points.div(1e3).add(1)
                return eff
            },
            done() {
                return player.Ud.points.gte(6894285) && inChallenge("ct",32)
            },
            onComplete() {
                addPoints("a",200)
            }
        },
        262: {
            name: "CoTona Booster",
            tooltip() { return "Get 1 CTNA in 'Booster Vaccine'. Reward: 200 AP."},
            done() {
                return player.ct.points.gte(1) && inChallenge("ct",32)
            },
            onComplete() {
                addPoints("a",200)
            }
        },
        263: {
            name: "Anti-Distanced Distances",
            tooltip() { 
                let eff = tmp.a.achievements[263].effect
                return "Have anti-distance exceed distance. Reward: 200 AP, distance boosts anti-distance gain, anti-distance effects^1.01.<br>Currently: "+format(eff)+"x."},
            effect() {
                let eff = player.ct.a263
                return eff
            },
            done() {
                return tmp.ct.getAntiDist.gt(tmp.ct.getDist)
            },
            onComplete() {
                addPoints("a",200)
            }
        },
        264: {
            name: "Anti-Microscopic",
            tooltip() { return "Increase the anti-distancing to "+distShort(1e-4)+". Reward: 200 AP."},
            done() {
                return tmp.ct.getAntiDist.gte(1e-4)
            },
            onComplete() {
                addPoints("a",200)
            }
        },
        265: {
            name: "UnBoosted Company",
            tooltip() { return "Get "+format(1e100)+" UnBoosted Viruses. Reward: 200 AP, raise UBV milestone 13 effect to 10/3."},
            done() {
                return player.uv.virus.gte(1e100)
            },
            onComplete() {
                addPoints("a",200)
            }
        },
        266: {
            name: "Anti-Distanced People",
            tooltip() {return "Increase the anti-distancing to "+distShort(1.8288)+". Reward: 250 AP."},
            done() {
                return tmp.ct.getAntiDist.gte(1.8288) //6 ft
            },
            onComplete() {
                addPoints("a",250)
            }
        },
        271: {
            name: "Booster GAS GAS",
            tooltip() {return "Get "+format(tet10(6))+" cases in 'Booster Vaccine'. Reward: 250 AP, time speed*6, UBV gain exponent+0.05, AP/10 adds to UBV effect exp at "+format(tet10(6))+" cases."},
            done() {
                return player.points.gte(Decimal.tetrate(10,6)) && inChallenge("ct",32)
            },
            onComplete() {
                addPoints("a",250)
            }
        },
        272: {
            name: "Coronaster",
            tooltip() {return "Get 1 Corona in 'Booster Vaccine'. Reward: 250 AP."},
            done() {
                return player.ct.corona.gte(1) && inChallenge("ct",32)
            },
            onComplete() {
                addPoints("a",250)
            }
        },
        273: {
            name: "Anti-Proxima",
            tooltip() {return "Increase the anti-distancing to "+distShort(4e16)+". Reward: 250 AP."},
            done() {
                return tmp.ct.getAntiDist.gte(4e16)
            },
            onComplete() {
                addPoints("a",250)
            }
        },
        274: {
            name: "CrowBooster",
            tooltip() {return "Get 1 CorVid in 'Booster Vaccine'. Reward: 250 AP."},
            done() {
                return player.ct.CorVid.gte(1) && inChallenge("ct",32)
            },
            onComplete() {
                addPoints("a",250)
            }
        },
        275: {
            name: "Cr0wB00st-19",
            tooltip() {return "Get 19 CorVids in 'Booster Vaccine'. Reward: 250 AP."},
            done() {
                return player.ct.CorVid.gte(19) && inChallenge("ct",32)
            },
            onComplete() {
                addPoints("a",250)
            }
        },
        276: {
            name: "'Crow'Bird 19",
            tooltip() {return "Get "+format(1e19)+" Deadly Crows. Reward: 250 AP."},
            done() {
                return player.Ud.crows.gte(1e19)
            },
            onComplete() {
                addPoints("a",250)
            }
        },
        281: {
            name: "Anti-Universe",
            tooltip() {
                let a = "Increase the anti-distancing to "+distShort(8.8e26)+". Reward: 250 AP, Anti-Distance gain is multiplied by 1.01 per AP after 9,000."
                let b = "<br>Currently: "+format(tmp.a.achievements[281].effect)+"x"
                return  a+b
            },
            done() {
                return tmp.ct.getAntiDist.gte(8.8e26)
            },
            effect() {
                return Decimal.pow(1.01,player.a.points.sub(9000).max(0))
            },
            onComplete() {
                addPoints("a",250)
            }
        },
        282: {
            name: "Unfini-Boosted",
            tooltip() {return "Get "+format(Decimal.pow(2,1024))+" UnBoosted Viruses. Reward: 250 AP, UnBoosted Viruses boost time speed.<br>Currently: "+format(tmp.a.achievements[282].effect)+"x"},
            done() {
                return player.uv.virus.gte(Decimal.pow(2,1024))
            },
            effect() {
                return Decimal.pow(2,player.uv.virus.div(Decimal.pow(2,1024)).max(1).log2().pow(0.2))
            },
            onComplete() {
                addPoints("a",250)
            }
        },
        283: {
            name: "Anti-CTNA",
            tooltip() {return "Get 1 AnTNA. Reward: 250 AP."},
            done() {
                return player.ct.AnTNA.gte(1)
            },
            onComplete() {
                addPoints("a",250)
            }
        },
        284: {
            name: "'Cr0wB1rd' 19",
            tooltip() {return "Get 19 Deadly CrowBirds. Reward: 250 AP."},
            done() {
                return player.Ud.crowBirds.gte(19)
            },
            onComplete() {
                addPoints("a",250)
            }
        },
        285: {
            name: "Cr0wV1d-19",
            tooltip() {return "Get 19 extra CorVids in 'Booster Vaccine'. Reward: 250 AP, Deadly Crow birth rate*19 at 19 extra CorVids."},
            done() {
                return player.ct.CorVid.sub(player.ct.buyables[41]).gte(19) && inChallenge("ct",32)
            },
            onComplete() {
                addPoints("a",250)
            }
        },
        286: {
            name: "AnT-Electron",
            tooltip() {return "Get "+formatMass(1.78266192e-33)+" of AnT-Black Hole mass. Reward: 300 AP."},
            done() {
                return player.ct.AnTBH.gte(1.78266192e-33)
            },
            onComplete() {
                addPoints("a",300)
            }
        },
        291: {
            name: "AnTomic",
            tooltip() {return "Get "+formatMass(1.6605390666e-24)+" of AnT-Black Hole mass. Reward: 300 AP."},
            done() {
                return player.ct.AnTBH.gte(1.6605390666e-24)
            },
            onComplete() {
                addPoints("a",300)
            }
        },
    },
    effect() {
        let eff = player.a.points
        if (inChallenge("ct",32) && !hasAchievement("a",205)) eff = eff.min(2300)
        let x = Decimal.add(1.2,tmp.e.Gueffect)
        let exp = new Decimal(1.5)
        if (hasUpgrade("e",276)) exp = exp.add(upgradeEffect("e",276))
        if (hasAchievement("a", 42)) eff = Decimal.pow(x, eff.pow(exp))
        else eff = Decimal.pow(1.07, eff)
        return eff
    },
    effectDescription() {
        return "which "+pluralize(player.a.points,'boosts','boost')+" cases gain by " + format(tmp.a.effect)
    },
    tabFormat: {
        "Achievements" :{
            content: ["main-display",
            "achievements"]
        },
        "Milestones" :{
            content: ["milestones"]
        }
    },
    milestones: {
        0: {
            requirementDescription: "50 Achievement Points",
            effectDescription: "Keep I,R,U upgrades and milestones, and autobuy 2x more and faster.",
            done() { return player.a.points.gte(50) }
        },
        1: {
            requirementDescription: "115 Achievement Points",
            effectDescription: "Keep S,D upgrades, milestones and challenges, and autobuy 2x more and faster.",
            done() { return player.a.points.gte(115) }
        }
    },
})
