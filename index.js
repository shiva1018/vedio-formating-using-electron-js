var app=require('electron').app

var BrowserWindow=require('electron').BrowserWindow
 
var ipc =require('electron').ipcMain
const os=require('os')

var{dialog}=require('electron')
var mainWindow =null
app.on('ready',function(){
    mainWindow= new  BrowserWindow({
resizable:true,
height:500,
width:800,
webpreferences:{
    nodeIntegration:true
}
    })

    mainWindow.loadURL("file://" + __dirname +'/main.html')
    mainWindow.on('closed',function() {
        mainWindow=null
    
    })
    })

    ipc.on('open-file-dialog-for-file',function(event){
        console.log("button prress")
        console.log(event)
        if(os.platform()==='linux' || os.platform()==='win32'){
            dialog.showOpenDialog(null,{
                properties:['openFile']
            }).then((result)=>{
                            console.log(result.filePaths)
                            event.sender.send("selected-file",result.filePaths[0])
            }).catch((err)=>{
                      console.log(err)

                })


                        }
    })