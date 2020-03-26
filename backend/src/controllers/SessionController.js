const connection = require('../database/connection');

module.exports = {

    async create(request, response){
        const ong_id = request.body;
        console.log(ong_id)
        const ong = await connection('ongs').where('id', ong_id.id).select('name').first();

        if(!ong){
            return response.status(400).json({error: "Do you have the right id?"});
        }
        return response.json(ong);
    }
}
