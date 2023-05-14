import express, { Request, Response } from 'express';
import { webUsersController } from '../Controllers2/webUsersController';
import bcrypt from 'bcrypt';

const webUserRouter = express.Router();
const webUser = new webUsersController();

async function getWebUsersByID(req: Request, res: Response) {
  try {
    const user = await webUser.getWebUsersByID(Number(req.params.id));
    res.status(200).json(user);
  } catch (error) {
    res.status(500).json('Could not get the user');
  }
}


async function addWebUser(req: Request, res: Response) {
  try {
    const user = await webUser.addWebUser(req.body);
    res.status(200).json(user);
  } catch (error) {
    res.status(500).json('Could not add a new user');
  }
}

async function getWebUsers(req: Request, res: Response) {
  try {
    const user = await webUser.getwebUsers();
    res.status(200).json(user);
  } catch (error) {
    res.status(500).json('Could not get the users');
  }
}

async function deleteWebUser(req: Request, res: Response) {
  try {
    const user = await webUser.deleteWebUser(Number(req.params.id));
    res.status(200).json(user);
  } catch (error) {
    res.status(500).json('Could not delete the user');
  }
}

async function updateWebUser(req: Request, res: Response) {
  try {
    const user = await webUser.updateWebUser({
      ID: Number(req.params.id),
      userName: req.body.userName,
      webUserPassword: req.body.webUserPassword,
      Roles: Number(req.body.Roles),
      subAccountID: Number(req.body.subAccountID),
      Avatar: req.body.Avatar,
    });
    res.status(200).json(user);
  } catch (error) {
    res.status(404).json('The user is not found');
  }
}

async function activateUser(req: Request, res: Response) {
  try {
    const user = await webUser.activateUser(Number(req.params.id));
    res.status(200).json(user);
  } catch (error) {
    res.status(500).json('Could not get the user');
  }
}

async function deactivateUser(req: Request, res: Response) {
  try {
    const user = await webUser.deactivateUser(Number(req.params.id));
    res.status(200).json(user);
  } catch (error) {
    res.status(500).json('Could not get the user');
  }
}

async function checkUsername(req: Request, res: Response) {
  try {
    const user = await webUser.checkUsername(req.body.userName);
    res.status(200).json(user);
  } catch (error) {
    res.status(500).json('Could not get the user');
  }
}

async function getRolesByID(req: Request, res: Response) {
  try {
    const user = await webUser.getRolesByID(Number(req.params.id));
    res.status(200).json(user);
  } catch (error) {
    res.status(500).json('Could not get the user');
  }
}

async function getMembersBysubAccountID(req: Request, res: Response) {
  try {
    const user = await webUser.getMembersBysubAccountID(Number(req.params.id));
    res.status(200).json(user);
  } catch (error) {
    res.status(500).json('Could not get the user');
  }
}

async function addNewMember(req: Request, res: Response) {
  try {
    const user = await webUser.addNewMember(req.body);
    res.status(200).json(user);
  } catch (error) {
    console.log(error);
    res.status(500).json('Could not add a new user');
  }
}

async function updateImage(req: Request, res: Response) {
  try {
    const user = await webUser.updateImage({
      ID: Number(req.params.id),
      Avatar: req.body.Avatar,
    });
    res.status(200).json(user);
  } catch (error) {
    console.log(error);
    res.status(500).json('Could not update image');
  }
}

async function changePassword(req: Request, res: Response) {
  try {
    const user = await webUser.getPasswordByID(Number(req.params.id));
    const match = await bcrypt.compareSync(req.body.oldPassword + process.env.pepper, user.webUserPassword ? user.webUserPassword : '');

    if (req.body.oldPassword == req.body.newPassword) {
      res.status(203).json('New password cannot be the same as old password');
      return;
    }

    if (match) {
      const user = await webUser.updatePassword({
        ID: Number(req.params.id),
        webUserPassword: req.body.newPassword,
      });
      res.status(200).json('Password has been changed');
    }
    else {
      res.status(202).json('Old password is incorrect');
      return;
    }

  } catch (error) {
    res.status(500).json('Could not get the user');
  }
}

const webUser_endpoints = (app: express.Application) => {
  app.get('/webUser/get/:id', getWebUsersByID);
  app.get('/webUser/get', getWebUsers);
  app.get('/webUser/getMembers/:id', getMembersBysubAccountID);
  app.get('/webUser/getroles/:id', getRolesByID);
  app.post('/webUser/add', addWebUser);
  app.post('/webUser/addNewMember', addNewMember);
  app.post('/webUser/checkusername', checkUsername);
  app.put('/webUser/update/:id', updateWebUser);
  app.put('/webUser/activate/:id', activateUser);
  app.put('/webUser/updateImage/:id', updateImage);
  app.put('/webUser/deactivate/:id', deactivateUser);
  app.put('/webUser/changePassword/:id', changePassword);
  app.delete('/webUser/delete/:id', deleteWebUser);


};

export default webUser_endpoints;
