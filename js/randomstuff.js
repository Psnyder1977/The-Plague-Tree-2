const STATIC_SCALE_STARTS = {
    "r": function() { return new Decimal(2000) },
    "u": function() { return new Decimal(320) },
    "e": function() { return decimalTen },
    "Ur": function() { return decimalTen },
    "Uu": function() { return new Decimal(120) },
    "Us": function() { return decimalTen },
}

function makeUDText(c){
    return "<span style='color:#a9146a'>" + c + "</span>"
}
function makeRed(c){
    return "<span style='color:#aa0000'>" + c + "</span>"
}
function makeBlue(c){
    return "<span style='color:#4444bb'>" + c + "</span>"
}
function makeGreen(c){
    return "<span style='color:#448844'>" + c + "</span>"
}

function scaleStaticCost(gain, layer) {
    let start = (STATIC_SCALE_STARTS[layer]?STATIC_SCALE_STARTS[layer]():1);
    let g = gain
    if (gain.gte(start)) { 
        if (layer == "r") gain = gain.pow(2).div(start);
        if (layer == "Ur") {
            if (g.gte(15e4)) gain = gain.div(15e4).pow(1.5).mul(15e4)
            if (g.gte(5e4)) gain = gain.div(5e4).pow(1.5).mul(5e4)
            gain = gain.pow(2).div(start)
        }
        if (layer == "u") {
            gain = gain.pow(3).div(Decimal.pow(start, 2))
        }
        if (layer == "Uu") {
            if (gain.gte("ee8")) gain = powExp(gain.root(1e6).log10().root(2),1/2).pow10().div(100).pow10()
            if (g.gte(1e16)) gain = gain.log10().div(16).pow(2).mul(16).pow10()
            if (g.gte(1e15)) gain = gain.log10().div(15).pow(2).mul(15).pow10()
            if (g.gte(1e14)) gain = gain.log10().div(14).pow(1.5).mul(14).pow10()
            if (g.gte(5e7)) gain = gain.div(5e7).pow(1.5).mul(5e7)
            gain = gain.pow(1.6).div(Decimal.pow(start,0.6))
        }
        if (layer == "Us") {
            if (g.gte("e800")) gain = powExp(gain.root(800/9),0.5).sub(200).pow10()
            if (g.gte(1e30)) gain = gain.log10().div(30).pow(2).mul(30).pow10()
            if (g.gte(1e25)) gain = gain.log10().div(25).pow(2).mul(25).pow10()
            if (g.gte(1e21)) gain = gain.mul(1.4).sub(1e21*.4).div(1e21).pow(1.3).mul(1e21)
            if (g.gte(45e9)) gain = gain.mul(1.4).sub(45e9*.4).div(45e9).pow(1.3).mul(45e9)
            if (g.gte(2e4)) gain = gain.mul(1.4).sub(8e3).div(2e4).pow(1.1).mul(2e4)
            if (g.gte(1e4)) gain = gain.mul(1.4).sub(4e3).div(1e4).pow(1.1).mul(1e4)
            if (g.gte(50)) gain = gain.mul(1.2).sub(10).div(50).pow(1.1).mul(50)
            if (g.gte(45)) gain = gain.mul(1.2).sub(9).div(45).pow(1.25).mul(45)
            if (g.gte(40)) gain = gain.mul(1.2).sub(8).div(40).pow(1.1).mul(40)
            gain = gain.pow(2).div(start)
        }
        if (layer == "e") {
            let scale = tmp.e.infScale
            let social = tmp.e.scStart
            let qu = tmp.e.qStart
            if (g.gte(tet10(qu))) g = tet10(slog(g).log10().div(qu.log10()).root(0.5).mul(qu.log10()).pow10())
            if (g.gte(tet10(social))) g = tet10(slog(g).div(social).root(0.7).mul(social))
            if (g.gte(tet10(10))) g = tet10(slog(g.div(10).pow(2).mul(10)))
            if (g.gte(tet10(7))) g = tet10(slog(g).sub(7).mul(2).add(7))
            if (g.gte(3e6)) g = Decimal.pow(1.000005,g.sub(3e6)).mul(3e6)
            if (g.gte(scale.add(1e3))) g = g.pow(5).div(Decimal.pow(scale.add(1e3), 4))
            if (g.gte(scale)) g = g.pow(3).div(Decimal.pow(scale, 2))
            if (g.gte(30)) gain = Decimal.pow(1.08,g.sub(30)).mul(30)
            gain = gain.pow(3).div(Decimal.pow(start, 2))
        };
    }
	return gain
}
function startCChallenge(id) {
    doReset("f")
    player.f.p = decimalZero
    player.f.cp = decimalZero
    player.f.casuals = decimalOne
    player.f.cboosts = decimalZero
    player.f.points = decimalZero
    player.f.resettime = new Decimal(0.001)
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
    player.f.buyables[32] = (hasFUpg(84) && id !== 22 && id !== 31) ? decimalTwo : decimalZero
    player.f.buyables[33] = decimalZero 
    player.f.buyables[71] = player.f.buyables[71].min(player.f.cd[0])
    player.f.buyables[72] = player.f.buyables[72].min(player.f.cd[1])
    player.f.buyables[73] = player.f.buyables[73].min(player.f.cd[2])
    player.f.buyables[74] = player.f.buyables[74].min(player.f.cd[3])
    player.f.buyables[81] = player.f.buyables[81].min(player.f.cd[4])
    player.f.buyables[82] = player.f.buyables[82].min(player.f.cd[5])
    player.f.buyables[83] = player.f.buyables[83].min(player.f.cd[6])
    updateTemp()
    updateTemp()
    updateTemp()
}

function startIChallenge(id) {
    doReset("i")
    player.v.upgrades = []
    player.e.ct = 0
    player.i.points = decimalZero
    player.r.points = decimalZero
    player.v.points = decimalZero
    player.points = decimalZero
}

function startCTChallenge(id) {
    layers.ct.clickables[32].onClick()
    if (id==32) {
        player.points = decimalZero
        player.s.severity = decimalZero
        player.e.mu = decimalZero
        player.e.mu2 = decimalZero
        if (hasUpgrade("ct",463)) {
        player.Uv.upgrades = [11,12,13,21,22,23,31,32,33]
        player.Uv.milestones = [0,1,2]
        }
        if (hasUpgrade("ct",465)) player.Ui.milestones = [0,1,2,3]
        if (hasUpgrade("ct",472)) player.Ur.milestones = [2]
        if (hasUpgrade("ct",476)) player.Ur.milestones = [2,3]
        if (hasUpgrade("ct",481)) player.Ui.upgrades = [11,12,13,21,22,23,31,32,33]
        if (hasUpgrade("ct",483)) player.Ur.upgrades = [11,12,13,21,22,23,31,32,33]
        if (hasUpgrade("ct",484)) {
            player.Ui.milestones = [0,1,2,3,4,5,6,7,8,9,10,11,12]
            player.Ur.milestones = [0,1,2,3,4,5,6,7]
        }
        if (hasUpgrade("ct",494)) {
            player.Ur.milestones = [0,1,2,3,4,5,6,7,8,9,10]
            player.Up.milestones = [0,1,2,3,4,5]
            player.Ur.auto = true
            player.Up.auto = true
            player.Up.auto2 = true
        }
        if (hasUpgrade("ct",495)) {
            player.Up.milestones = [0,1,2,3,4,5,6,7,8,9,10]
        }
        if (hasUpgrade("ct",496)) {
            player.Up.milestones = [0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17]
            player.Up.upgrades = [11,12,13,14,15,21,22,23,24,25,31,32,33,34,35,41,42,43,44,45,51,52,53,54,55]
            for (i = 0; i < player.Up.chal.length; i++){
                player.Up.challenges[player.Up.chal[i]]=1
            }
            player.Up.autop = true
            player.Up.autop2 = true
            player.Up.autopr = true
            player.Up.autoupr = true
            player.Up.autoapr = true
            player.Up.autoe = true
        }
        if (hasUpgrade("ct",503)) {
            player.Up.upgrades = [11,12,13,14,15,21,22,23,24,25,31,32,33,34,35,41,42,43,44,45,51,52,53,54,55,61,62,63,64,65,71,72,73,74,75,81,82,83,84,85,91,92,93,94,95]
            player.Uu.milestones = [0,1,2,6]
        }
        if (hasUpgrade("ct",505)) {
            player.Uu.upgrades = [11,12,13,14,15]
            player.Uu.milestones = [0,1,2,3,4,5,6,7,13]
            player.Uu.auto = true
            player.Uu.auto2 = true
            player.Uu.autou = true
        }
        if (hasUpgrade("ct",506)) {
            player.Uu.upgrades.push(21,22,23,24,25)
            player.Uu.milestones.push(8,9,10,11,12,14,15)
            player.Uu.autoun = true
        }
        if (hasUpgrade("ct",516)) {
            player.Uu.upgrades.push(31,32,33,34,35,41,42,43,44,45)
            player.Uu.milestones.push(16,17,18,19,20,21)
            player.Uu.autoue = true
            player.Uu.autoub = true
        }
        if (hasUpgrade("ct",522)) {
            player.Uu.upgrades.push(61,62,63,64,65)
            player.Uu.milestones.push(22,23)
            player.Uu.autoen = true
        }
        if (hasUpgrade("ct",524)) {
            player.Uu.upgrades.push(71,72,73,74,75)
        }
        if (hasUpgrade("ct",526)) {
            player.Uu.upgrades.push(81,82,83,84,85)
            player.Uu.milestones.push(24,25,26)
            player.Uu.autoex = true
        }
        if (hasUpgrade("ct",533)) {
            player.Us.milestones.push(0)
            player.Uu.milestones.push(27,28)
            player.Us.auto = true
            player.Uu.autouqe = true
        }
        if (hasUpgrade("ct",536)) {
            player.Us.milestones.push(1)
            player.Uu.upgrades.push(91,92,93,94,95)
            player.Us.auto2 = true
        }
        if (hasUpgrade("ct",543)) {
            player.Us.milestones.push(6)
            player.Uu.upgrades.push(51,52,53,54,55)
            player.Us.automult = true
        }
        if (hasUpgrade("ct",544)) {
            player.Us.milestones.push(7)
            player.Us.autoatom = true
        }
        if (hasMilestone("uv",0)) {
            player.Us.upgrades = ['11','12','13','14','15','21','22','23','24','25','31','32','33','34','35','41','42','43','44','45']
            player.Us.milestones.push(2,3,4,5,8,9,10,15)
            player.Us.autosymp = true
            
        }
        if (hasMilestone("uv",1)) {
            player.Us.upgrades.push('61','62','63','64','65')
            player.Us.milestones.push(11,12,13,14,16)
        }
        if (hasMilestone("uv",2)) {
            player.Us.upgrades.push('71','72','73','74','75')
            player.Us.milestones.push(17,18)
        }
        if (hasMilestone("uv",4)) {
            player.Us.milestones.push(19,20,21)
        }
        if (hasMilestone("uv",9)) {
            player.Us.milestones.push(22)
            player.Us.autosev = true
        }
        if (hasMilestone("uv",10)) {
            player.Us.autotrna = true
        }
        if (hasMilestone("uv",20)) {
            player.Us.autorrna = true
        }
        if (hasMilestone("uv",11)) {
            player.Us.autoupg = true
        }
        if (hasMilestone("uv",14)) {
            player.Us.automut = true
            player.Us.mutPercent = player.uv.mutPercent
            player.Us.mutPer = player.uv.mutPer
        }
        if (hasUpgrade("uv",72)) {
            player.Us.upgrades.push('81','82','83','84','85')
            player.Us.milestones.push(23)
        }
        if (hasMilestone("uv",16)) {
            player.Us.autotmut = true
            player.Us.tmutPercent = player.uv.tmutPercent
            player.Us.tmutPer = player.uv.tmutPer
        }
        if (hasUpgrade("uv",75)) {
            player.Us.upgrades.push('51','52','53','54','55','91','92','93','94','95')
            player.Us.milestones.push(24,25,26,27,28,29)
        }
        if (hasUpgrade("uv",83)) {
            player.Us.upgrades.push('101','102','103','104','105')
            player.Us.milestones.push(30,31,32,33,34,35,36,37,38,39,56)
            player.Us.autounr = true
        }
        if (hasMilestone("uv",24)) {
            player.Ud.milestones.push(0,1,2)
            player.Us.milestones.push(40,41,42,43,44,45,46,47,48,49,50,51,52,53,54,55,57,58)
        }
        if (hasMilestone("uv",25)) {
            player.Ud.upgrades.push('11','12','13','14','15','21','22','23','24','25')
            player.Ud.milestones.push(3,4,5)
        }
        if (hasMilestone("uv",26)) {
            player.Ud.milestones.push(6,7)
        }
        if (hasMilestone("uv",28)) {
            player.Ud.auto = true
            player.Ud.upgrades.push('31','32','33','34','35')
            player.Ud.milestones.push(8,9,10,11,15)
        }
        if (hasMilestone("uv",29)) {
            player.Ud.upgrades.push('41','42','43','44','45')
            player.Ud.milestones.push(12,13,14,16,17,22)
        }
        if (hasMilestone("uv",30)) {
            player.Ud.autoupg = true
            for (i = 0; i < 4; i++) {
                player.Ud.challPoints[i] = new Decimal(40)
            }
        }
        if (hasUpgrade("uv",103)) {
            player.Ud.milestones.push(24)
            player.Us.milestones.push(59,60,61,62,63,64,65,66,67,68)
        }
        if (hasMilestone("uv",32)) {
            player.Ud.autorw = true
            player.Ud.milestones.push(27,29)
        }
        if (hasMilestone("uv",34)) {
            player.Ud.mu = new Decimal(40)
            player.Ud.buyables[41] = new Decimal(40)
            player.Ud.buyables[42] = new Decimal(8)
        }
        if (hasMilestone("uv",35)) {
            player.Ud.mu = new Decimal(50)
            player.Ud.buyables[41] = new Decimal(50)
            player.Ud.buyables[42] = new Decimal(9)
            player.Ud.milestones.push(18,19,20,21,23,25,26,28,30,31,32,33,40)
            player.Ud.automutant = true
        }
        if (hasMilestone("uv",38)) {
            player.Ud.mu = new Decimal(100)
            player.Ud.buyables[41] = new Decimal(100)
            player.Ud.buyables[42] = new Decimal(10)
        }
        if (hasMilestone("uv",51)) {
            player.Ud.autocrow = true
        }
    }
}

function softcapStaticGain(gain, layer) {
	let start = (STATIC_SCALE_STARTS[layer]?STATIC_SCALE_STARTS[layer]():1);
    if (gain.gte(start)) {
        if (layer == "r" || layer == "Ur" || layer == "Us") gain = gain.times(start).pow(1/2);
        if (layer == "Ur") {
            if (gain.gte(5e4)) gain = gain.div(5e4).root(1.5).mul(5e4)
            if (gain.gte(15e4)) gain = gain.div(15e4).root(1.5).mul(15e4)
        }
        if (layer == "u") {
            gain = gain.times(Decimal.pow(start,2)).root(3)
        }
        if (layer == "Uu") {
            gain = gain.mul(Decimal.pow(start,0.6)).root(1.6)
            if (gain.gte(5e7)) gain = gain.div(5e7).root(1.5).mul(5e7)
            if (gain.gte(1e14)) gain = gain.log10().div(14).root(1.5).mul(14).pow10()
            if (gain.gte(1e15)) gain = gain.log10().div(15).root(2).mul(15).pow10()
            if (gain.gte(1e16)) gain = gain.log10().div(16).root(2).mul(16).pow10()
            if (gain.gte("ee8")) gain = powExp(gain.log10().mul(100).log10(),2).pow(2).pow10().pow(1e6)
        }
        if (layer == "Us") {
            if (gain.gte(40)) gain = gain.div(40).root(1.1).mul(40).add(8).div(1.2)
            if (gain.gte(45)) gain = gain.div(45).root(1.25).mul(45).add(9).div(1.2)
            if (gain.gte(50)) gain = gain.div(50).root(1.1).mul(50).add(10).div(1.2)
            if (gain.gte(1e4)) gain = gain.div(1e4).root(1.1).mul(1e4).add(4e3).div(1.4)
            if (gain.gte(2e4)) gain = gain.div(2e4).root(1.1).mul(2e4).add(8e3).div(1.4)
            if (gain.gte(45e9)) gain = gain.div(45e9).root(1.3).mul(45e9).add(45e9*.4).div(1.4)
            if (gain.gte(1e21)) gain = gain.div(1e21).root(1.3).mul(1e21).add(1e21*.4).div(1.4)
            if (gain.gte(1e25)) gain = gain.log10().div(25).root(2).mul(25).pow10()
            if (gain.gte(1e30)) gain = gain.log10().div(30).root(2).mul(30).pow10()
            if (gain.gte("e800")) gain = powExp(gain.log10().add(200),2).pow(800/9)
        }
        if (layer == "e") {
            let scale = tmp.e.infScale
            let social = tmp.e.scStart
            let qu = tmp.e.qStart
            gain = gain.times(Decimal.pow(start,2)).root(3)
            if (gain.gte(30)) gain = gain.div(30).log(1.08).add(30)
            if (gain.gte(scale)) gain = gain.times(Decimal.pow(scale,2)).root(3)
            if (gain.gte(scale.add(1e3))) gain = gain.times(Decimal.pow(scale.add(1e3),4)).root(5)
            if (gain.gte(3e6)) gain = gain.div(3e6).log(1.000005).add(3e6)
            if (gain.gte(tet10(7))) gain = tet10(slog(gain).sub(7).div(2).add(7))
            if (gain.gte(tet10(social))) gain = tet10(slog(gain).div(social).pow(0.7).mul(social))
            if (gain.gte(tet10(qu))) gain = tet10(slog(gain).log10().div(qu.log10()).pow(0.5).mul(qu.log10()).pow10())
        }
    }
	return gain;
}
function hasVUpg(id){
    return hasUpgrade("v",id)
}
function getVUpgEff(id){
    return upgradeEffect("v",id)
}
function hasIUpg(id){
    return hasUpgrade("i",id)
}
function getIUpgEff(id){
    return upgradeEffect("i",id)
}
function hasRUpg(id){
    return hasUpgrade("r",id)
}
function getRUpgEff(id){
    return upgradeEffect("r",id)
}
function hasUUpg(id){
    return hasUpgrade("u",id)
}
function getUUpgEff(id){
    return upgradeEffect("u",id)
}
function hasSUpg(id){
    return hasUpgrade("s",id)
}
function getSUpgEff(id){
    return upgradeEffect("s",id)
}
function hasDUpg(id){
    return hasUpgrade("d",id)
}
function getDUpgEff(id){
    return upgradeEffect("d",id)
}
function hasFUpg(id){
    return hasUpgrade("f",id)
}
function getFUpgEff(id){
    return upgradeEffect("f",id)
}
