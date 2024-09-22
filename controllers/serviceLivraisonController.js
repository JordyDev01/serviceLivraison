
import fs from 'fs';
import path from 'path';
import { ServiceLivraison } from '../models/serviceLivraison.js';

const DELIVERY_FILE_PATH = path.resolve('data', 'serviceLivraison.json');

function readServiceLivraisonFile() {
    try {
      const serviceLivraisonData = fs.readFileSync(DELIVERY_FILE_PATH, 'utf8');
      // Ensure that the file content is parsed as an array, even if the file is empty
      if (!serviceLivraisonData.trim()) {
        return [];
      }
      const parsedData = JSON.parse(serviceLivraisonData);
      // Check if the parsed data is an array
      return Array.isArray(parsedData) ? parsedData : [];
    } catch (error) {
      // If the file doesn't exist or there's an error, return an empty array
      return [];
    }
  }

function writeServiceLivraisonFile(data){
  try {
    fs.writeFileSync(DELIVERY_FILE_PATH, JSON.stringify(data, null, 2), 'utf8');
  } catch (error) {
    throw new Error('erreur a l\'ecriture dans la liste de service de livraison');
  }
};

export const getAllDelivery = (req, res) => {
  try {
    const serviceLivraisons = readServiceLivraisonFile();
    res.status(200).json(serviceLivraisons);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getDeliveryById = (req, res) => {
  try {
    const serviceLivraisons = readServiceLivraisonFile();
    const serviceLivraison = serviceLivraisons.find(s => s.id === parseInt(req.params.id));
    if (!serviceLivraison) {
      return res.status(404).json({ message: 'Service de livraison non trouvé' });
    }
    res.status(200).json(serviceLivraison);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const createDelivery = (req, res) => {
    try {
      const serviceLivraisons = readServiceLivraisonFile(); 
      const { nom, typeCuisine } = req.body;
  
      
      if (!nom && !typeCuisine) {
        return res.status(400).json({ message: 'Nom et typeCuisine sont requis' });
      }
  
      const newServiceLivraison = new ServiceLivraison(serviceLivraisons.length + 1, nom, typeCuisine, new Date().toISOString());
      
      
      serviceLivraisons.push(newServiceLivraison);
      
      
      writeServiceLivraisonFile(serviceLivraisons);
  
      res.status(201).json(newServiceLivraison);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  };

export const updateDelivery =  (req, res) => {
  try {
    
    const index = serviceLivraisons.findIndex(s => s.id === parseInt(req.params.id));
    const serviceLivraisons = readServiceLivraisonFile();
    if (index === -1) {
      return res.status(404).json({ message: 'service de livraison non trouvé' });
    }
    serviceLivraisons[index].nom = req.body.nom || serviceLivraisons[index].nom;
    serviceLivraisons[index].typeCuisine = req.body.typeCuisine || serviceLivraisons[index].typeCuisine;
    writeServiceLivraisonFile(serviceLivraisons);
    res.status(200).json(serviceLivraisons[index]);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const deleteDelivery = (req, res) => {
  try {
    let serviceLivraisons = readServiceLivraisonFile();
    const index = serviceLivraisons.findIndex(s => s.id === parseInt(req.params.id));
    if (index === -1) {
      return res.status(404).json({ message: 'service livraison non trouvé' });
    }
    serviceLivraisons = serviceLivraisons.filter(s => s.id !== parseInt(req.params.id));
    writeServiceLivraisonFile(serviceLivraisons);
    res.status(200).json({ message: 'service livraison effacé' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}; 
