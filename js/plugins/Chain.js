//=============================================================================
/*:
 * @target MZ
 * @plugindesc [v1.0] Blockchain Ethers Connect for RMMZ
 * @author Billy
 *
 * @help
 * ----------------------------------------------------------------------------
 * Terms of Use
 * ----------------------------------------------------------------------------
 *
 * Free for use in commercial and non-commercial games, with credit
 * Do NOT remove the author of this plugin
 * Do NOT post anywhere (modified or otherwise) except the RPG Maker Web site.
 *
 * ----------------------------------------------------------------------------
 * Changelog
 * ----------------------------------------------------------------------------
 *
 * v1.0 - Plugin released!
 *
 * ----------------------------------------------------------------------------
 *
 */
//=============================================================================
const pluginNameEthers = 'ethers';
const chainParams = PluginManager.parameters(pluginNameEthers);

const setupChain = function() {
    if(main.signer == null){
        main.connect();
    }
};

var windowCommand_addCommand = Window_Command.prototype.addCommand;
var windowCommand = Window_MenuCommand.prototype.makeCommandList;
var windowCommand_setHandler = Window_MenuCommand.prototype.setHandler;

Window_MenuCommand.prototype.makeCommandList = function() {
    windowCommand_addCommand.call(this, "Connect Wallet", "connect", true);
    windowCommand.call(this);

    windowCommand_setHandler.call(this, "connect", function(){
        main.connect().then(function(){
            SceneManager.pop();
        });
    });
};

var sceneMap_update = Scene_Map.prototype.update;

var sceneMap = Scene_Map.prototype.createDisplayObjects;
Scene_Map.prototype.createDisplayObjects = function() {
    sceneMap.call(this);
    this.drawText();
}

Scene_Map.prototype.drawText = function() {
    console.log("Draw text");
    const x = 5;
    const y = 5;
    const maxWidth = 800;
    let text = "";
    if(main.chainId){
        let chainName = ""
        if(main.chainId == "56"){
            chainName = "BSC"
        }
        else if(main.chainId == "1"){
            chainName = "ETH"
        }
        else if(main.chainId == "137"){
            chainName = "MATIC"
        }
        
        
        text = "Connected to : "+chainName+" | Address : "+main.address;
    }
    const sprite = new Sprite(
        new Bitmap(Graphics.width, Graphics.height)
    );
    const bitmap = sprite.bitmap;
    bitmap.fontFace = $gameSystem.mainFontFace();
    bitmap.outlineColor = "black";
    bitmap.outlineWidth = 8;
    bitmap.fontSize = 24;
    bitmap.drawText(text, x, y, maxWidth, 48, "center");
    this.addChild(sprite);
};

	