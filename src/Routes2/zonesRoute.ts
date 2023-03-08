import express, { Request, Response } from 'express';
import { ZonesController } from '../Controllers2/zonesController';

const zonesRouter = express.Router();
const zones = new ZonesController();

async function getZonesByID(req: Request, res: Response) {
  try {
    const zone = await zones.getZoneByID(Number(req.params.id));
    res.status(200).json(zone);
  } catch (error) {
    res.status(500).json('Could not get the zone');
  }
}

async function addZone(req: Request, res: Response) {
  try {
    const zone = await zones.addZone(req.body);
    res.status(200).json(zone);
  } catch (error) {
    res.status(500).json('Could not add a new zone');
  }
}

async function getZones(req: Request, res: Response) {
  try {
    const zone = await zones.getZones();
    res.status(200).json(zone);
  } catch (error) {
    res.status(500).json('Could not get the zones');
  }
}

async function deleteZone(req: Request, res: Response) {
  try {
    const zone = await zones.deleteZone(Number(req.params.id));
    res.status(200).json(zone);
  } catch (error) {
    res.status(500).json('Could not delete the zone');
  }
}

async function updateZone(req: Request, res: Response) {
  try {
    const zone = await zones.updateZone({
      ID: Number(req.params.id),
      Zone: req.body.Zone,
      zoneTypeID: req.body.zoneTypeID,
      cityID: req.body.cityID,
    });
    res.status(200).json(zone);
  } catch (error) {
    res.status(404).json('The zone is not found');
  }
}



const Zones_endpoints = (app: express.Application) => {
  app.get('/Zones/get/:id', getZonesByID);
  app.get('/Zones/get', getZones);
  app.post('/Zones/add', addZone);
  app.delete('/Zones/delete/:id', deleteZone);
  app.put('/Zones/update/:id', updateZone);
};

export default Zones_endpoints;
