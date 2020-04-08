const TaskHistory = require("../models/TaskHistory.js");
const Task = require("../models/Task.js");

function getTask(id) {
	return new Promise(resolve => {
		Task.findOne({
			where: {
				id: id
			}
		}).then(task => {
			if (!task) resolve(null);
			resolve(task);
		});
	});
}

async function createTaskHistory(req, res, action) {
	let oldId = null;
	let newId = null;
	let entity = null;

	const task = await getTask(req, res);

	return new Promise(resolve => {
		if (task === null) resolve();

		if (action === "UPDATE_TASK_STATUS") {
			entity = "task";
			newId = req.params.employeeId;
		} else if (action === "NEW_RESPONSIBLE_EMPLOYEE") {
			entity = "employee";
			newId = req.params.employeeId;
		} else if (action === "UPDATE_CONNECTED_UNIT") {
			entity = "unit";
			oldId = ticket.unitId;
			newId = req.body.unitId;
		} else if (action === "UPDATE_STATUS_ID") {
			entity = "ticket_status";
			oldId = ticket.ticketStatusId;
			newId = req.body.ticketStatusId;
		} else if (action === "NEW_TICKET") {
			entity = "ticket";
			newId = req.body.ticketId;
		} else if (action === "NEW_TICKET_ORDER") {
			entity = "ticket_order";
			newId = req.body.ticketOrderId;
		} else if (action === "SEND_TICKET_ORDER") {
			entity = "ticket_order";
			oldId = req.body.ticketOrderId;
			newId = req.body.ticketOrderId;
		} else if (action === "ACCEPTED_TICKET_ORDER") {
			entity = "ticket_order";
			oldId = req.params.ticketOrderId;
			newId = req.params.ticketOrderId;
		} else if (action === "DECLINED_TICKET_ORDER") {
			entity = "ticket_order";
			oldId = req.params.ticketOrderId;
			newId = req.params.ticketOrderId;
		} else if (action === "INVOICE_TICKET_ORDER") {
			entity = "ticket_order";
			oldId = req.params.ticketOrderId;
			newId = req.params.ticketOrderId;
		} else if (action === "CLOSED_TICKET_ORDER") {
			entity = "ticket_order";
			oldId = req.params.ticketOrderId;
			newId = req.params.ticketOrderId;
		} else if (action === "COMPLETE_TICKET_ORDER") {
			entity = "ticket_order";
			oldId = req.params.ticketOrderId;
			newId = req.params.ticketOrderId;
		}

		// Create a new Ticket History
		if (oldId == newId && entity === "ticket_status") return resolve();

		TicketHistory.create({
			ticketId: ticket.id,
			action: action,
			entity: entity,
			oldId: oldId,
			newId: newId
		}).then(history => {
			return resolve(history);
		});
	});
}

function getTicketHistory(req, res) {
	return new Promise(resolve => {
		TicketHistory.findAll({
			where: {
				ticketId: req.params.ticketId
			},
			order: [["updatedAt", "DESC"]]
		}).then(async history => {
			const statusIds = await getTicketStatus();
			history.forEach(h => {
				if (h.action === "UPDATE_STATUS_ID") {
					h.newId = statusIds.find(sId => {
						return sId.id == h.newId;
					});
					h.oldId = statusIds.find(sId => {
						return sId.id == h.oldId;
					});
				}
			});
			return resolve(history);
		});
	});
}
module.exports = {
	getTicketHistory,
	createTicketHistory
};
