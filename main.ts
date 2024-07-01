namespace SpriteKind {
    export const powerup = SpriteKind.create()
}
function enemy_death (enemy: Sprite) {
    if (Math.percentChance(5)) {
        power_up = sprites.create(img`
            . . . . . . . b b . . . . . . . 
            . . . . . . b d d b . . . . . . 
            . . . . . b d 5 5 d b . . . . . 
            . . . . b b 5 5 5 5 b b . . . . 
            . . . . b 5 5 5 5 5 5 b . . . . 
            b b b b b 5 5 5 5 1 1 d b b b b 
            b 5 5 5 5 5 5 5 5 1 1 1 5 5 5 b 
            b d d 5 5 5 5 5 5 1 1 1 5 d d b 
            . b d d 5 5 5 5 5 5 5 5 d d b . 
            . . b b 5 5 5 5 5 5 5 5 b b . . 
            . . c b 5 5 5 5 5 5 5 5 b c . . 
            . . c 5 5 5 5 d d 5 5 5 5 c . . 
            . . c 5 5 d b b b b d 5 5 c . . 
            . . c 5 d b c c c c b d 5 c . . 
            . . c c c c . . . . c c c c . . 
            . . . . . . . . . . . . . . . . 
            `, SpriteKind.powerup)
        power_up.x = enemy.x
        power_up.y = enemy.y
    }
}
controller.A.onEvent(ControllerButtonEvent.Pressed, function () {
    projectile = sprites.createProjectileFromSprite(img`
        . . . . . . . . . 7 7 7 7 . . . 
        . . . . . . . 7 7 1 1 1 1 7 . . 
        . . . . 7 7 6 6 1 1 1 1 1 1 . . 
        . . 6 6 6 6 1 1 1 1 1 1 1 1 . . 
        . . 1 1 1 1 1 1 1 1 1 1 1 1 . . 
        . . 6 6 7 7 6 1 1 1 1 1 1 1 . . 
        . . . . . . 7 7 6 1 1 1 1 7 . . 
        . . . . . . . . . 7 7 7 7 . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        `, space_ship, 70, 0)
    if (double_fire_mode) {
        projectile = sprites.createProjectileFromSprite(img`
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . 7 7 7 7 . . . 
            . . . . . . . 7 7 1 1 1 1 7 . . 
            . . . . 7 7 6 6 1 1 1 1 1 1 . . 
            . . 6 6 6 6 1 1 1 1 1 1 1 1 . . 
            . . 1 1 1 1 1 1 1 1 1 1 1 1 . . 
            . . 6 6 7 7 6 1 1 1 1 1 1 1 . . 
            . . . . . . 7 7 6 1 1 1 1 7 . . 
            . . . . . . . . . 7 7 7 7 . . . 
            `, space_ship, 90, 0)
    }
})
scene.onHitWall(SpriteKind.Enemy, function (sprite, location) {
    sprites.destroy(sprite)
})
sprites.onOverlap(SpriteKind.Player, SpriteKind.powerup, function (sprite, otherSprite) {
    sprites.destroy(otherSprite)
    double_fire_mode = sprites.create(img`
        . . . . . . . . . 7 7 7 7 . . . 
        . . . . . . . 7 7 1 1 1 1 7 . . 
        . . . . 7 7 6 6 1 1 1 1 1 1 . . 
        . . 6 6 6 6 1 1 1 1 1 1 1 1 . . 
        . . 1 1 1 1 1 1 1 1 1 1 1 1 . . 
        . . 6 6 7 7 6 1 1 1 1 1 1 1 . . 
        . . . . . . 7 7 6 1 1 1 1 7 . . 
        . . . . . . . . . 7 7 7 7 . . . 
        . . . . . . . . . 7 7 7 7 . . . 
        . . . . . . . 7 7 1 1 1 1 7 . . 
        . . . . 7 7 6 6 1 1 1 1 1 1 . . 
        . . 6 6 6 6 1 1 1 1 1 1 1 1 . . 
        . . 1 1 1 1 1 1 1 1 1 1 1 1 . . 
        . . 6 6 7 7 6 1 1 1 1 1 1 1 . . 
        . . . . . . 7 7 6 1 1 1 1 7 . . 
        . . . . . . . . . 7 7 7 7 . . . 
        `, SpriteKind.Player)
    double_fire_mode.setPosition(35, 8)
    info.changeLifeBy(1)
})
sprites.onOverlap(SpriteKind.Projectile, SpriteKind.Enemy, function (sprite, otherSprite) {
    sprites.destroy(otherSprite, effects.spray, 500)
    sprites.destroy(sprite)
    info.changeScoreBy(1)
    enemy_death(otherSprite)
})
sprites.onOverlap(SpriteKind.Player, SpriteKind.Enemy, function (sprite, otherSprite) {
    sprites.destroy(otherSprite, effects.spray, 500)
    info.changeLifeBy(-1)
    enemy_death(otherSprite)
})
let mySprite2: Sprite = null
let double_fire_mode: Sprite = null
let projectile: Sprite = null
let power_up: Sprite = null
let space_ship: Sprite = null
info.setLife(3)
effects.starField.startScreenEffect()
space_ship = sprites.create(img`
    5 5 4 2 8 . . . . . . . . . . . 
    5 4 4 2 8 8 . . . . . . . . . . 
    5 5 4 2 8 8 8 . . . . . . . . . 
    . 5 4 2 8 8 f 8 8 . . . . . . . 
    . . . . . 8 f 8 8 . . . . . . . 
    . . . . . 8 f 8 c . . . . . . . 
    . . . . . 8 c 6 c 8 8 . . . . . 
    . . . . . 8 c 6 c 6 8 8 f c f c 
    . . . . . 8 e 6 8 9 9 6 f 6 f b 
    . . . . . 8 e 9 8 8 8 . . . . . 
    . . . . . 8 f 8 8 . . . . . . . 
    . . . . . 8 f 8 . . . . . . . . 
    . 5 4 2 8 8 8 . . . . . . . . . 
    5 5 4 2 8 8 8 . . . . . . . . . 
    5 4 4 2 8 8 . . . . . . . . . . 
    5 5 4 2 8 . . . . . . . . . . . 
    `, SpriteKind.Player)
tiles.setCurrentTilemap(tilemap`level4`)
controller.moveSprite(space_ship)
space_ship.setStayInScreen(true)
game.onUpdateInterval(2000, function () {
    mySprite2 = sprites.create(img`
        . . . . . . . . c c c c . . . . 
        . . . . c c c c c c c c c . . . 
        . . . c f c c a a a a c a c . . 
        . . c c f f f f a a a c a a c . 
        . . c c a f f c a a f f f a a c 
        . . c c a a a a b c f f f a a c 
        . c c c c a c c b a f c a a c c 
        c a f f c c c a b b 6 b b b c c 
        c a f f f f c c c 6 b b b a a c 
        c a a c f f c a 6 6 b b b a a c 
        c c b a a a a b 6 b b a b b a . 
        . c c b b b b b b b a c c b a . 
        . . c c c b c c c b a a b c . . 
        . . . . c b a c c b b b c . . . 
        . . . . c b b a a 6 b c . . . . 
        . . . . . . b 6 6 c c . . . . . 
        `, SpriteKind.Enemy)
    mySprite2.x = scene.screenWidth()
    mySprite2.vx = -30
    mySprite2.y = randint(10, scene.screenHeight() - 10)
})
