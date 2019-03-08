const readline = require('readline')

class Log
{
    constructor(r1)
    {
        this.r1 = r1
    }
    log ()   //handle the input line 
    {
        if (this.rl)    //if there is an input stream
        {
            this.rl.clearLine()     // clear the previous line
            this.rl.close()
            this.rl = undefined     // make r1 empty
        }
        for (let i = 0, len = arguments.length; i < len; i++)    //use argument variable to print the input stream
        {
            console.log(arguments[i])     
        }
        askUser()   //this functin read the user message
        const askUser = async () =>    //synchronization function to handle the input
        {
            this.rl = readline.createInterface(   // create an interface to ask for entering data
            {
                input: process.stdin,
                output: process.stdout
            })
            
            this.rl.question('Send message: ', function(message)  // ask to enter a message
            {
                for (let id in peers)    // iterate for all connected peers to send the message
                {
                    peers[id].conn.write(message)
                }
                this.rl.close()     
                this.rl = undefined
                askUser()
            });
        }
    }
}