import { NgModule, ModuleWithProviders, SkipSelf, Optional } from '@angular/core';
import { Configuration } from './configuration';
import { HttpClient } from '@angular/common/http';


import { GpControllerService } from './api/gpController.service';
import { GpSurgeryControllerService } from './api/gpSurgeryController.service';
import { HealthConditionControllerService } from './api/healthConditionController.service';
import { OrganisationControllerService } from './api/organisationController.service';
import { PatientControllerService } from './api/patientController.service';
import { RegistrationControllerService } from './api/registrationController.service';
import { UserControllerService } from './api/userController.service';

@NgModule({
  imports:      [],
  declarations: [],
  exports:      [],
  providers: [
    GpControllerService,
    GpSurgeryControllerService,
    HealthConditionControllerService,
    OrganisationControllerService,
    PatientControllerService,
    RegistrationControllerService,
    UserControllerService ]
})
export class ApiModule {
    public static forRoot(configurationFactory: () => Configuration): ModuleWithProviders<ApiModule> {
        return {
            ngModule: ApiModule,
            providers: [ { provide: Configuration, useFactory: configurationFactory } ]
        };
    }

    constructor( @Optional() @SkipSelf() parentModule: ApiModule,
                 @Optional() http: HttpClient) {
        if (parentModule) {
            throw new Error('ApiModule is already loaded. Import in your base AppModule only.');
        }
        if (!http) {
            throw new Error('You need to import the HttpClientModule in your AppModule! \n' +
            'See also https://github.com/angular/angular/issues/20575');
        }
    }
}
