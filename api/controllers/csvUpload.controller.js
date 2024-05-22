import multer from "multer";
import csvParser from "csv-parser";
import fs from "fs";
import { createCustomer } from "./customer.controller.js";
import Address from "../models/adress.model.js";
import ContactPerson from "../models/contactPerson.model.js";
import Customer from "../models/customer.model.js";

// Multer-Konfiguration für Dateiupload
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads/");
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  },
});

const upload = multer({ storage: storage });

export { upload };

// Hochladen und Verarbeiten einer Kunden-CSV-Datei
export const uploadCustomersCSV = async (req, res) => {
  if (!req.file) {
    return res.status(400).send("No CSV file uploaded.");
  }

  const filePath = req.file.path;
  console.log("filePath:", filePath);

  if (!fs.existsSync(filePath)) {
    return res.status(500).send("File not found.");
  }

    // Array zum Speichern der CSV-Daten
  const csvData = [];

  // CSV-Datei lesen und Daten in csvData speichern
  fs.createReadStream(filePath)
    .pipe(csvParser())
    .on("data", (row) => {
      csvData.push(row);
    })
    .on("end", async () => {
      const createdCustomers = [];
      // CSV-Daten verarbeiten und Kunden anlegen
      for (const row of csvData) {
        try {
          const customerData = {
            intnr: row.intnr,
            type: row.type,
            addresses: [],
            contact_persons: [],
          };
          // Adresse aus der CSV-Zeile erstellen
          const addressData = {
            company_name: row["addresses.company_name"],
            country: row["addresses.country"],
            city: row["addresses.city"],
            zip: row["addresses.zip"],
            fax: row["addresses.fax"],
            phone: row["addresses.phone"],
            street: row["addresses.street"],
            email: row["addresses.email"],
          };
          // Neue Adresse anlegen
          const createdAddress = await Address.create(addressData);
          customerData.addresses.push(createdAddress._id);

          const contactPersonData = {
            first_name: row["contact_persons.first_name"],
            last_name: row["contact_persons.last_name"],
            email: row["contact_persons.email"],
            mobile_phone: row["contact_persons.mobile_phone"],
            birth_date: new Date(row["contact_persons.birth_date"]),
          };

          // Kontaktperson aus der CSV-Zeile erstellen
          const createdContactPerson = await ContactPerson.create(
            contactPersonData
          );
          customerData.contact_persons.push(createdContactPerson._id);

          // Neue Kontaktperson anlegen
          const createdCustomer = await createCustomer(customerData);
          createdCustomers.push(createdCustomer);
        } catch (error) {
          if (error.code === 11000) {
            console.error(`Duplicate key error: ${JSON.stringify(error.keyValue)}`);
            res.status(409).send(`Duplicate key error: ${JSON.stringify(error.keyValue)}`);
            return;
          }
          console.error(error);
          res.status(500).send("Error processing CSV file.");
        }
      }
      // Hochgeladene Datei löschen 
      fs.unlinkSync(filePath);
      res.status(200).send("CSV file successfully processed.");
    });
  };

// Hochladen und Verarbeiten einer Kontaktpersonen-CSV-Datei
export const uploadContactPersonsCSV = async (req, res) => {
    if (!req.file) {
      return res.status(400).send("No CSV file uploaded.");
    }
  
    const filePath = req.file.path;
  
    const csvData = [];
    // CSV-Datei lesen und Daten in csvData speichern
    fs.createReadStream(filePath)
      .pipe(csvParser())
      .on("data", (row) => {
        csvData.push(row);
      })
      .on("end", async () => {
        const createdContactPersons = [];
    // CSV-Daten verarbeiten und Kontaktpersonen anlegen
    for (const row of csvData) {
          try {
            const intnr = row.intnr;
            const customer = await Customer.findOne({ intnr: row.intnr });
  
            if (!customer) {
              return res.status(404).send(`One Intnr is not matching any Customer`);
            }
            // Neue Kontaktperson anlegen
            const contactPersonData = {
              first_name: row["contact_persons.first_name"],
              last_name: row["contact_persons.last_name"],
              email: row["contact_persons.email"],
              mobile_phone: row["contact_persons.mobile_phone"],
              birth_date: new Date(row["contact_persons.birth_date"]),
            };
  
            const createdContactPerson = await ContactPerson.create(contactPersonData);

            // Kontaktperson zum Kunden hinzufügen
            customer.contact_persons.push(createdContactPerson._id);
            await customer.save();
            createdContactPersons.push(createdContactPerson);
          } catch (error) {
            if (error.code === 11000) {
              console.error(`Duplicate key error: ${JSON.stringify(error.keyValue)}`);
              res.status(409).send(`Duplicate key error: ${JSON.stringify(error.keyValue)}`);
              return;
            }
            console.error(error);
            res.status(500).send("Error processing CSV file.");
          }
        }
        fs.unlinkSync(filePath);
        res.status(200).send("CSV file successfully processed.");
      });
    };

// Hochladen und Verarbeiten einer Adressen-CSV-Datei
export const uploadAddressesCSV = async (req, res) => {
  if (!req.file) {
    return res.status(400).send("No CSV file uploaded.");
  }
  
  const filePath = req.file.path;
  
  const csvData = [];
   // CSV-Datei lesen und Daten in csvData speichern
  fs.createReadStream(filePath)
  .pipe(csvParser())
  .on("data", (row) => {
    csvData.push(row);
  })
  .on("end", async () => {
    const createdAddresses = [];
    // CSV-Daten verarbeiten und Adressen anlegen
    for (const row of csvData) {
      try {
        const customer = await Customer.findOne({ intnr: row.intnr });

        if (!customer) {
          return res.status(404).send(`One Customer is Missing `);
        }
           // Neue Adresse anlegen
        const addressData = {
          company_name: row["addresses.company_name"],
          country: row["addresses.country"],
          city: row["addresses.city"],
          zip: row["addresses.zip"],
          fax: row["addresses.fax"],
          phone: row["addresses.phone"],
          street: row["addresses.street"],
          email: row["addresses.email"],
        };

        const createdAddress = await Address.create(addressData);

        // Addresse zum Kunden hinzufügen
        customer.addresses.push(createdAddress._id);
        await customer.save();
        createdAddresses.push(createdAddress);
      } catch (error) {
        if (error.code === 11000) {
          console.error(`Duplicate key error: ${JSON.stringify(error.keyValue)}`);
          res.status(409).send(`Duplicate key error: ${JSON.stringify(error.keyValue)}`);
          return;
        }
        console.error(error);
        res.status(500).send("Error processing CSV file.");
      }
    }
    fs.unlinkSync(filePath);
    res.status(200).send("CSV file successfully processed.");
  });
};
