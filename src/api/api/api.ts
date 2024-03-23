export * from './gpController.service';
import { GpControllerService } from './gpController.service';
export * from './gpSurgeryController.service';
import { GpSurgeryControllerService } from './gpSurgeryController.service';
export * from './healthConditionController.service';
import { HealthConditionControllerService } from './healthConditionController.service';
export * from './organisationController.service';
import { OrganisationControllerService } from './organisationController.service';
export * from './patientController.service';
import { PatientControllerService } from './patientController.service';
export * from './registrationController.service';
import { RegistrationControllerService } from './registrationController.service';
export * from './userController.service';
import { UserControllerService } from './userController.service';
export const APIS = [
    GpControllerService,
    GpSurgeryControllerService,
    HealthConditionControllerService,
    OrganisationControllerService,
    PatientControllerService,
    RegistrationControllerService,
    UserControllerService,
];
