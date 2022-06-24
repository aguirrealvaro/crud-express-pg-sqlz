import express from 'express';
const router = express();
import Task from '../models/Task';
import Project from '../models/Project'

router.get('/', async (req, res) => {
	try {
		const tasks = await Task.findAll(
			{
				include: [
					{model: Project, as:'alias-project'}
				]
			},
			{
				order: [ [ 'id', 'ASC' ] ]
			}
		);
		res.status(200).json({ tasks });
	} catch (err) {
		res.status(500).send({ err });
	}
});

router.get('/:id', async (req, res) => {
	try {
		const task = await Task.findOne({
			where: {
				id: req.params.id
			}
		});
		if (!task) return res.status(500).json({ msg: 'No task found' });
		res.status(200).json({ task });
	} catch (err) {
		res.status(500).send({ err });
	}
});

//get task by projectid
router.get('/by-project/:id', async (req, res) => {
	try {
		const taskByProject = await Task.findAll({
			where: {
				projectid: req.params.id
			}
		});
		res.status(200).send({ taskByProject });
	} catch (err) {
		res.status(500).send({ err });
	}
});

router.post('/', async (req, res) => {
	const { name, done, projectid } = req.body;
	try {
		const newTask = await Task.create(
			{
				name,
				done,
				projectid
			},
			{
				fields: [ 'name', 'done', 'projectid' ]
			}
		);
		if (newTask) {
			res.status(200).json({
				msg: 'Task created successfully',
				newTask
			});
		}
	} catch (err) {
		res.status(500).send({ err });
	}
});

router.put('/:id', async (req, res) => {
	try {
		const { name, done, projectid } = req.body;
		const updatedTask = await Task.update( //mejor la opcion de projects
			{
				name,
				done,
				projectid
			},
			{
				where: {
					id: req.params.id
				}
			}
		);
		res.status(200).json({
			msg: 'Task updated',
			updatedTask
		});
	} catch (err) {
		res.status(500).send({ err });
	}
});

router.delete('/:id', async (req, res) => {
	try {
		const deletedTask = await Task.destroy({
			where: {
				id: req.params.id
			}
		});
		res.status(200).json({
			msg: 'Task deleted',
			deletedTask
		});
	} catch (err) {
		res.status(500).send({ err });
	}
});

export default router;
