import BaseScene from "./BaseScene";



class HomeScene extends BaseScene {
    constructor() {
       super('HomeScene', true) 
        window.__current_scene_name__ = 'HomeScene'
    }

    build() {
        debugger;
        this.createRect()
    }

    createRect() {
        const rect = this.add.graphics();
        rect.fillRoundedRect(0, 0, this.background.width, this.background.height, 30)
        rect.fillStyle(0x00ccff, 0.6)
    }
}

export default HomeScene