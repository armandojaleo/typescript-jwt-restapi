import express, { Request, Response } from 'express'

import Resource, { IResource } from '../models/Resource'

class ResourceController {

    app: express.Application;

    constructor() {
        this.app = express();
    }

    // Get all resources
    public getResources = async (req: Request, res: Response) => {
        const resources = await Resource.find();
        if (!resources) {
            return res.status(404).json('No Resources found');
        }
        res.json(resources);
    };

    // New resource
    public createResource = async (req: Request, res: Response) => {
        try {
            const newResource: IResource = new Resource(req.body);
            await newResource.save();
            return res.json(newResource);
        } catch (e) {
            res.status(400).json(e);
        }
    };

    // Get one
    public getResource = async (req: Request, res: Response) => {
        const resource = await Resource.findById(req.params.id);
        if (!resource) {
            return res.status(404).json('No Resource found');
        }
        res.json(resource);
    };

    // Edit resource
    public editResource = async (req: Request, res: Response) => {
        const { id } = req.params;
        const resource = req.body;
        await Resource.findByIdAndUpdate(id, { $set: resource }, { new: true });
        res.json(resource);
    };

    // Delete resource
    public deleteResource = async (req: Request, res: Response) => {
        await Resource.findByIdAndRemove(req.params.id);
        res.json({ status: 'Resource Deleted' });
    };
}

export default ResourceController;