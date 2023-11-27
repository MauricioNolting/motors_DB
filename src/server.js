const app = require("./app")
const { authenticated, syncUp } = require("./config/database/database")
const { envs } = require("./config/enviroments/enviroments")
envs

async function main(){
    try {
        await authenticated()
        await syncUp()
    } catch (error) {
        console.log(error)
    }
}

main()

app.listen(envs.PORT, () => {
    console.log('Server running on port ' + envs.PORT)
})


