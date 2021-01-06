import Phaser from 'phaser';
import HomeScene from './scenes/HomeScene'
import { invoke } from '@finoer/finoer-invoke'
import './plugins/SpinePlugin.min.js'
import './plugins/rextagtext.3.17.0.min.js'

export class Game extends Phaser.Game {
    // 当前场景名称
    public _currentSceneName: string = '';

    constructor(config: Phaser.Types.Core.GameConfig) {
        super(config)
    }

    public get currentSceneName(): string {
        return this._currentSceneName
    }

    public set currentSceneName(sceneName: string) {
        this._currentSceneName = sceneName
    }

    public getCurrentScene() {
        return this.scene.getScene(this._currentSceneName)
    }
}

const runInContext = invoke.isInFinoRuntime()

export function initGame() {
    if(runInContext) {
        return initPhaserGame()
    }else {
        const finoApp = {
            name: 'phaser-template',
            init(instance: { injectionRouter: (arg0: (typeof HomeScene)[]) => void; instance: Phaser.Game; }) {
              instance.injectionRouter([
                HomeScene,
              ])
      
              window.__phaser_game__ = instance.instance
            }
          }
      
          invoke.$event.notify('childAppLoaded', finoApp)
    }
}

export function initPhaserGame() {
    const gameConfig: Phaser.Types.Core.GameConfig = {
        type: Phaser.AUTO,
        width: window.innerWidth,
        height: window.innerHeight,
        autoFocus: true,
        transparent: true,
        plugins: {
            scene: [
              {
                key: 'SpinePlugin',
                plugin: (window as any)['SpinePlugin'],
                mapping: 'spine'
              }
            ]
        },
        scale: {
            mode: Phaser.Scale.FIT,
            autoCenter: Phaser.Scale.CENTER_BOTH
        }
    }

    const game: Phaser.Game = new Game(gameConfig);
    game.scene.add('HomeScene', HomeScene, true)
    window.__phaser_game__ = game;
}
