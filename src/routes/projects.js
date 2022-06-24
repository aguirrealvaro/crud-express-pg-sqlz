import express from 'express';
const router = express();
import Project from '../models/Project';

router.post('/', async (req, res) => {
	const { name, priority, description, deliverydate } = req.body;
	try {
		const newProject = await Project.create(
			{
				name,
				priority,
				description,
				deliverydate
			},
			{
				fields: [ 'name', 'priority', 'description', 'deliverydate' ]
			}
		);
		if (newProject) {
			res.status(200).json({
				msg: 'Project created successfully',
				newProject
			});
		}
	} catch (err) {
		res.status(500).send(err);
	}
});

router.get('/', async (req, res) => {
	try {
		const projects = await Project.findAll({
            order: [
                ['id', 'ASC']
            ]
        });
		res.status(200).json({
			projects
		});
	} catch (err) {
		res.status(500).send(err);
	}
});

router.get('/:id', async (req, res) => {
	try {
		const project = await Project.findOne({
            where: {
                id: req.params.id
            }
        })
        res.status(200).json({project})
	} catch (err) {
        res.status(500).send(err);
    }
});

router.put('/:id', async (req, res)=>{
    const { name, priority, description, deliverydate } = req.body;
    try{
        const project = await Project.findOne({
            where: {
                id: req.params.id
            }
        })
        await project.update({
            name, 
            priority,
            description,
            deliverydate
        })
        res.status(200).json({
            msg: 'Proyect updated',
            project
        })
    }catch(err){
        res.status(500).send(err);
    }
})

router.delete('/:id', async (req, res) => {
	try {
		const deletedRowProject = await Project.destroy({
            where: {
                id: req.params.id
            }
        })
        res.status(200).json({
            msg: 'Project deleted',
            deletedRows: deletedRowProject
        })
	} catch (err) {
        res.status(500).send(err);
    }
});

export default router;
