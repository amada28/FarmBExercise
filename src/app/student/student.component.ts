import { Component, OnInit, ViewChild } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { StudentService } from './../student.service';
import { DataTable } from 'primeng/primeng';

@Component({
  selector: 'app-student',
  templateUrl: './student.component.html',
  styleUrls: ['./student.component.scss']
})
export class StudentComponent implements OnInit {
  studentForm: any;
  studentDetails = [];
  editStudentData = {};
  total: any;
  maxGrade: number;
  avgGrade: number;
  minGrade: number;

  isNewRecord: boolean = false;
  isEditable: boolean = false;
  display: boolean = false;
  isNewTableRecord: boolean = false;
  editStudent: boolean = false;
  @ViewChild(DataTable) dt: any;

  rows: any = [];

  cols = [
    { field: 'studentId', header: 'Student Id' },
    { field: 'studentName', header: 'Student Name' },
    { field: 'subject1', header: 'Subject1' },
    { field: 'subject2', header: 'Subject2' },
    { field: 'subject3', header: 'Subject3' },
    { field: 'grade', header: 'Grade' },
  ];

  constructor(private fb: FormBuilder, private studentService: StudentService) {

  }
  ngOnInit() {
    console.log(this.dt.immutable);
    this.buildForm();
    this.studentService.getStudentDetails().subscribe(res => {
      console.log(res);
      this.rows = res.students;
      this.rows.forEach(row => {
        row['isEditable'] = false;
        this.calculateGrade(row);
      });
      this.assignGrade();
    })
  }


  addRecord(){
    this.isNewRecord = !this.isNewRecord;
  }

  assignGrade() {
    this.maxGrade = this.filterGrade('A');
    this.avgGrade = this.filterGrade('B');
    this.minGrade = this.filterGrade('FAIL');
    console.log(this.maxGrade, this.avgGrade, this.minGrade)
  }

  filterGrade(grade) {
    if (grade) {
      return this.rows.filter(student => student.grade == grade).length;
    }
  }

  buildForm() {
    this.studentForm = this.fb.group({
      'studentId': ['', [Validators.required]],
      'studentName': ['', [Validators.required]],
      "testScore": ['', [Validators.required]]
    })
  }
  add(student) {
    console.log(this.studentForm.value)
    this.rows.push(this.studentForm.value);
    this.calculateGrade(this.studentForm.value);
    this.assignGrade();
    this.studentForm.reset();
    this.isNewRecord =  false;
  }

  editRecord(student) {
    this.editStudentData = student;
    this.isEditable = true;
    this.editStudentData['isEditable'] = true;
    console.log(student);
  }
  cancel(student) {
    this.editStudentData = student;
    this.editStudent = false;
    this.editStudentData['isEditable'] = false;
  }

  saveRecord(student) {
    this.editStudentData = student;
    this.isEditable = false;
    this.calculateGrade(this.editStudentData);
    this.editStudentData['isEditable'] = false;
  }

  cancelRecord(student) {
    this.isEditable = false;
    student.isEditable = false;
  }

  deleteRecord(index) {
    console.log("Delete")
    this.rows.splice(index, 1);
    this.isNewTableRecord = false;
  }

  calculateGrade(row) {
    let testScore = row['testScore'];
    let grade = "";
    if (testScore >= 90) {
      grade = "A"
    }
    else if (testScore >= 65 && testScore < 90) {
      grade = "B"
    }
    else if (testScore < 65) {
      grade = "FAIL"
    }
    row['grade'] = grade;
  }

  testScoreChanged(row) {
    console.log(row)
    this.calculateGrade(row);
    this.assignGrade();
  }
}
