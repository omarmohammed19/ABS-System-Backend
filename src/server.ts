import bodyParser from 'body-parser';
import dotenv from 'dotenv';
import express from 'express';
import cors from 'cors';
import contactLogTypesRouter from './Backend/ship_ContactLogTypes/Route';
import AuthenticationRouter from './Backend/authentication/Route';
import verifyJWT from './Middlewares/verifyJWT';
import UsersRouter from './Backend/sys_Users/Route';
import callResultsRouter from './Backend/cc_CallResults/Route';
import callStatusRouter from './Backend/cc_CallStatus/Route';
import callTypesRouter from './Backend/cc_CallTypes/Route';
import messageStatusRouter from './Backend/cs_MessageStatus/Route';
import templateTypesRouter from './Backend/cs_TemplateTypes/Route';
import branchesRouter from './Backend/cmp_Branches/Route';
import departmentsRouter from './Backend/cmp_Departments/Route';
import infoRouter from './Backend/cmp_Info/Route';
import titlesRouter from './Backend/cmp_Titles/Route';
import vehicleTypesRouter from './Backend/cmp_VehicleTypes/Route';
import bankDetailsRouter from './Backend/cust_BankDetails/Route';
import mobileCashRouter from './Backend/cust_MobileCash/Route';
import paymentMethodsRouter from './Backend/cust_PaymentMethods/Route';
import salesChannelTypesRouter from './Backend/cust_SalesChannelTypes/Route';
import serviceTypesRouter from './Backend/cust_ServiceTypes/Route';
import walletDetailsRouter from './Backend/cust_WalletDetails/Route';
import locationsRouter from './Backend/cust_Locations/Route';
import subAccountsRouter from './Backend/cust_SubAccounts/Route';
import packageTypesRouter from './Backend/ship_PackageTypes/Route';
import pickupTypesRouter from './Backend/ship_PickupTypes/Route';
import reasonsRouter from './Backend/ship_Reasons/Route';
import recipientTypesRouter from './Backend/ship_RecepientsTypes/Route';
import shipmentTypesRouter from './Backend/ship_ShipmentTypes/Route';
import productsRouter from './Backend/ship_Products/Route';
import TicketStatus from './Backend/cs_TicketStatus/Route';
import TicketTypes from './Backend/cs_TicketTypes/Route';
import CountriesRouter from './Backend/sys_Countries/Route';
import BanksRouter from './Backend/sys_Banks/Route';
import servicesRouter from './Backend/cust_Services/Route';
import nearestBranchRouter from './Backend/cust_NearestBranch/Route';
import pricePlanNamesRouter from './Backend/cust_PricePlanNames/Route';
import salesChannelsRouter from './Backend/cust_SalesChannels/Route';
import AddressTypesRouter from './Backend/client_AddressTypes/Route';
import ContactNumberTypesRouter from './Backend/client_ContactNumberTypes/Route';
import ContactPersonTypesRouter from './Backend/client_ContactPersonTypes/Route';
import EmailTypesRouter from './Backend/client_EmailTypes/Route';
import NumberTypesRouter from './Backend/client_NumberTypes/Route';
import LegalPaperTypesRouter from './Backend/cust_LegalPaperTypes/Route';
import InfoRouter from './Backend/cust_Info/Route';
import zonesRouter from './Backend/cmp_Zones/Route';
import zonesTypesRouter from './Backend/cmp_ZoneTypes/Route';
import extraInfoRouter from './Backend/ship_ExtraInfo/Route';
import addressesRouter from './Backend/cnee_Addresses/Route';
import contactNumbersRouter from './Backend/cnee_ContactNumbers/Route';
import emailRouter from './Backend/cnee_Emails/Route';
import legalPaperRouter from './Backend/cust_LegalPapers/Route';
import contactPersonRouter from './Backend/cust_ContactPersons/Route';
import custAddressesRouter from './Backend/cust_Addresses/Route';
import pricePlansRouter from './Backend/cust_PricePlans/Route';
import contactLogsRouter from './Backend/ship_ContactLogs/Route';
import languagesRouter from './Backend/sys_Languages/Route';
import roleTypeRouter from './Backend/sys_RoleTypes/Route';
import userSessionsRouter from './Backend/sys_UserSessions/Route';
import employeesRouter from './Backend/cmp_Employees/Route';
import governoratesRouter from './Backend/sys_Governorates/Route';
import templateRouter from './Backend/cs_Templates/Route';
import citiesRouter from './Backend/cmp_Cities/Route';
import ticketsRouter from './Backend/cs_Tickets/Route';
import prevStatusRouter from './Backend/ship_prevStatus/Route';
import statusRouter from './Backend/ship_Status/Route';
import pickupsRouter from './Backend/ship_Pickups/Route';
import mainAccountsRouter from './Backend/cust_MainAccounts/Route';
import paymentInfoRouter from './Backend/cust_PaymentInfo/Route';
import pickupHistoryRouter from './Backend/ship_PickupHistory/Route';
import custzonesRouter from './Backend/cust_Zones/Route';
import trackShipmentRouter from './ClientServices/TrackShipment/Route';
import pickupServicesRouter from './ClientServices/Pickups/Route';
import awbRouter from './Backend/AWBGenerator/Route';
import transactionHdrRouter from './Backend/ship_TransactionHdr/Route';
import transactionsRouter from './Backend/ship_Transactions/Route';
import transactionHistoryRouter from './Backend/ship_TransactionHistory/Route';
import walletServicesRouter from './ClientServices/Wallet/Route';
import HomeServicesRouter from './ClientServices/Home/Route';
import CreatePickupServicesRouter from './ClientServices/Create Pickup/Route';
import CreateShipmentServicesRouter from './ClientServices/Create Shipments/Route';
import BusinessLocationsRouter from './ClientServices/Settings/BusinessLocations/Route';
import shipmentsRouter from './ClientServices/Shipments/Route';
import TeamMembersRouter from './ClientServices/Settings/TeamMembers/Route';
import ClientTypesRouter from './Backend/cust_ClientTypes/Route';
import RegisterRouter from './ClientServices/Register/Route';
import mail_route from './ClientServices/Mail Sender/Route';
import imageRouter from './Backend/Upload_Files/Routes';
import downloadTemplateRouter from './ClientServices/Download Template/Route';
import UserRolesRouter from './Backend/sys_UserRoles/Routes';
import ResetPasswordRouter from './ClientServices/Reset Password/Route';
import AddPaymentMethodsRouter from './ClientServices/Settings/PaymentMethods/Route';
import cmpservicesRouter from './Backend/cmp_Services/Route';
import custStatusRouter from './Backend/cust_DisplayedStatus/Route';
import callPlansRouter from './Backend/cc_CallPlans/Route';
import rolesRouter from './Backend/sys_Roles/Route';
import callHistoryRouter from './Backend/cc_CallHistory/Route';
import callCenterRouter from './EmployeeServices/CallCenter/Route';
import BusinessInfoRouter from './ClientServices/Settings/BusinessInfo/Route';
import verificationTypesRouter from './Backend/cust_VerificationTypes/Route';

const corsOptions = {
  origin: '*',
  credentials: true,
  optionSuccessStatus: 200,
};

const app: express.Application = express();
const address: string = 'localhost';

dotenv.config();

app.use(cors(corsOptions));

app.use(bodyParser.json());

app.use(express.static('public'));

//without authorization
AuthenticationRouter(app);
RegisterRouter(app);
mail_route(app);
ResetPasswordRouter(app);
downloadTemplateRouter(app);
app.use('/images', imageRouter);
pricePlansRouter(app);
pricePlanNamesRouter(app);
zonesRouter(app);
citiesRouter(app);

//with authorization
app.use(verifyJWT);

UsersRouter(app);
contactLogTypesRouter(app);
callResultsRouter(app);
callStatusRouter(app);
callTypesRouter(app);
messageStatusRouter(app);
templateTypesRouter(app);
branchesRouter(app);
departmentsRouter(app);
infoRouter(app);
titlesRouter(app);
vehicleTypesRouter(app);
bankDetailsRouter(app);
mobileCashRouter(app);
paymentMethodsRouter(app);
salesChannelTypesRouter(app);
serviceTypesRouter(app);
walletDetailsRouter(app);
locationsRouter(app);
subAccountsRouter(app);
packageTypesRouter(app);
pickupTypesRouter(app);
reasonsRouter(app);
recipientTypesRouter(app);
shipmentTypesRouter(app);
productsRouter(app);
servicesRouter(app);
nearestBranchRouter(app);

salesChannelsRouter(app);
AddressTypesRouter(app);
ContactNumberTypesRouter(app);
ContactPersonTypesRouter(app);
EmailTypesRouter(app);
NumberTypesRouter(app);
LegalPaperTypesRouter(app);
InfoRouter(app);

zonesTypesRouter(app);
extraInfoRouter(app);
addressesRouter(app);
contactNumbersRouter(app);
emailRouter(app);
legalPaperRouter(app);
contactPersonRouter(app);
custAddressesRouter(app);

contactLogsRouter(app);
languagesRouter(app);
TicketStatus(app);
TicketTypes(app);
CountriesRouter(app);
BanksRouter(app);
roleTypeRouter(app);
userSessionsRouter(app);
employeesRouter(app);
governoratesRouter(app);
templateRouter(app);

ticketsRouter(app);
prevStatusRouter(app);
statusRouter(app);
pickupsRouter(app);
mainAccountsRouter(app);
paymentInfoRouter(app);
pickupHistoryRouter(app);
custzonesRouter(app);
trackShipmentRouter(app);
pickupServicesRouter(app);
awbRouter(app);
transactionHdrRouter(app);
transactionsRouter(app);
transactionHistoryRouter(app);
walletServicesRouter(app);
HomeServicesRouter(app);
CreatePickupServicesRouter(app);
CreateShipmentServicesRouter(app);
BusinessLocationsRouter(app);
shipmentsRouter(app);
TeamMembersRouter(app);
ClientTypesRouter(app);

cmpservicesRouter(app);
// AddMembersRouter(app);

servicesRouter(app);
// AddMembersRouter(app);

UserRolesRouter(app);
AddPaymentMethodsRouter(app);
custStatusRouter(app);
callPlansRouter(app);
rolesRouter(app);
callHistoryRouter(app);
callCenterRouter(app);
BusinessInfoRouter(app);
verificationTypesRouter(app);

app.listen(process.env.PORT, () => {
  console.log(`Server running on port http://${address}:${process.env.PORT}`);
});

export default app;
