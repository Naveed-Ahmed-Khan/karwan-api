const Group = require("../models/group.model");

//////////////////////////////////////////////////////////////////////////////
async function addGroup(req, res) {
  const { groupName /* , groupAdmin_id */, groupMembers } = req.body;
  const totalMembers = groupMembers.length;
  try {
    const preGroup = await Group.findOne({ groupName: groupName });
    console.log(preGroup);
    if (preGroup) {
      res.status(404).send("This group name already exists");
    } else {
      const addGroup = await Group.create({
        groupName,
        totalMembers,
        groupMembers,
      });
      res.status(201).json(addGroup);
      console.log(addGroup);
    }
  } catch (error) {
    res.status(404).send(error.message);
  }
}

//////////////////////////////////////////////////////////////////////////////
async function getGroups(req, res) {
  try {
    const groupsData = await Group.find()
      /* .populate("groupAdmin_id") */
      .populate("groupMembers")
      .exec();

    res.status(200).json(groupsData);
    console.log(groupsData);
  } catch (error) {
    res.status(404).send(error);
  }
}

//////////////////////////////////////////////////////////////////////////////
async function getSingleGroup(req, res) {
  const groupId = req.params.id;
  try {
    const groupData = await Group.findById(groupId)
      /* .populate("groupAdmin_id") */
      .populate("groupMembers")
      .exec();

    res.status(200).json(groupData);
    console.log(groupData);
  } catch (error) {
    res.status(404).send(error);
  }
}

//////////////////////////////////////////////////////////////////////////////
async function deleteGroup(req, res) {
  const groupId = req.params.id;
  try {
    await Group.findByIdAndDelete(groupId);
    res.status(200).json({ msg: "Group Deleted" });
  } catch (err) {
    console.log(err);
    res.status(500).json({ msg: err.message });
  }
}

module.exports = { getGroups, getSingleGroup, addGroup, deleteGroup };
