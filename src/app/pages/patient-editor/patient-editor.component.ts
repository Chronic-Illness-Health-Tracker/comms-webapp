import { Component } from '@angular/core';
import { PageComponent } from '../../base/page.component';
import { HeaderService } from '../../svc/header.service';
import { NgbDropdownModule } from '@ng-bootstrap/ng-bootstrap';
import { PatientDetailsCardComponent } from '../../components/patient-details-card/patient-details-card.component';
import { GpDetailsCardComponent } from '../../components/gp-details-card/gp-details-card.component';
import { FormsModule } from '@angular/forms';
import { Patient } from '../../../api/model/patient';
import { PatientControllerService } from '../../../api';

@Component({
    selector: 'app-patient-editor',
    standalone: true,
    imports: [
        NgbDropdownModule,
        PatientDetailsCardComponent,
        GpDetailsCardComponent,
        FormsModule,
    ],
    templateUrl: './patient-editor.component.html',
    styleUrl: './patient-editor.component.scss',
})
export class PatientEditorComponent implements PageComponent {
    protected creatingNewPatient = false;
    protected patientSearch = '';

    protected patient?: Patient;

    constructor(private headerService: HeaderService) {
        this.setHeader();
    }

    setHeader(): void {
        this.headerService.header = 'Patient';
    }

    createNewPatient() {
        this.creatingNewPatient = true;
    }

    patientSearchChanged(value: string) {
        console.log(value);
    }

    onPatientChanges(patient: Patient) {}

    savePatient() {}
}
