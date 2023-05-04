const superagent = require('superagent')
// const chunk = require('lodash/chunk') // common convention is to use an under score to denote lodash
// const flattenDeep = require('lodash/flattenDeep')

const Pokemon = async(req, res, next) => {
    const pokemonIDs = req.body.ids

    const ids = await Promise.all(pokemonIDs.map(async pokemon =>{
        try{
            const data = await superagent.get(`https://pokeapi.co/api/v2/pokemon/${pokemon}`)
            res.send(data)
            const currPoke = JSON.parse(data.text)
            
            const types = Object.assign(currPoke.types).map(currtype => currtype.type.name)
            return{
                name: currPoke.name,
                types: types,
                sprite: currPoke.sprites.front_default
            }
        }catch(error){
            return{
                name: 'notfound'
            }
        }
    }))
    // res.status(200).send(ids)
    next()
}

module.exports = Pokemon



    //Original code
    //
    // const currSelection = await superagent.get('https://pokeapi.co/api/v2/pokemon?limit=151&offset=0')

    // const pokemon = JSON.parse(currSelection.text)

    // const pokeNameNUrls = pokemon.results

    // const pokeChunk = chunk(pokeNameNUrls, 15)

    // let pokeData = []
    // for(let x = 0; x < pokeChunk.length; x++){
    //     const currPoke = pokeChunk[x]

    //     const currPokeData = await Promise.all(currPoke.map(async pokemon => {
    //         const url = pokemon.url
    //         const response = await superagent.get(url)
    //         return response.body
    //     }))

    //     pokeData.push(...currPokeData)
    // }
    
    // const ids = pokeData.map(pokemon => {
    //     const types = Object.assign(pokemon.types).map(currtype => currtype.type.name)
    //     return{
    //         name: pokemon.name,
    //         types: types,
    //         sprite: pokemon.sprites.front_default
    //     }
    // })

    // console.log(ids)