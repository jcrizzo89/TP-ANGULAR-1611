import { Component, Input, OnInit } from '@angular/core'
import { StudentService } from 'src/app/services/student.service'
import { Student } from 'src/app/models/student'
import { NgbModal } from '@ng-bootstrap/ng-bootstrap'

@Component({
  selector: 'app-student-list',
  templateUrl: './student-list.component.html',
  styleUrls: ['./student-list.component.css']
})
export class StudentListComponent implements OnInit {

  studentList = new Array<Student>()

  @Input() dni: string
  @Input() lastName: string
  @Input() firstName: string
  @Input() email: string

  @Input() id2: number
  @Input() dni2: string
  @Input() lastName2: string
  @Input() firstName2: string
  @Input() email2: string

  dni3: string
  lastName3: string
  firstName3: string
  email3: string

  constructor(private studentService: StudentService, private modalService: NgbModal) { }

  ngOnInit(): void {
    this.getAll()
  }

  getAll() {
    this.studentService.getAll().subscribe(response => {
      this.studentList = response
      this.dni = ''
      this.lastName = ''
      this.firstName = ''
      this.email = ''
      document.getElementsByTagName('input')[0].focus()
    }, error => {
      console.error(error)
      alert('Error: ' + error.error.message)
    })
  }

  save() {
    if (this.dni.trim() !== '' && this.lastName.trim() !== '' && this.firstName.trim() !== '' && this.email.trim() !== '') {
      let student = new Student()
      student.dni = this.dni
      student.lastName = this.lastName
      student.firstName = this.firstName
      student.email = this.email
      student.cohort = 0
      student.status = 'activo'
      student.gender = 'masculino'
      student.address = 'abc123'
      student.phone = '000'
      this.studentService.save(student).subscribe(() => {
        location.reload()
      }, error => {
        console.error(error)
        alert('Error: ' + error.error.message)
        document.getElementsByTagName('input')[0].focus()
      })
    }
  }

  delete(id: number) {
    this.studentService.delete(id).subscribe(() => {
      location.reload()
    }, error => {
      console.error(error)
      alert('Error: ' + error.error.message)
    })
  }

  view(ver: any, s: Student) {
    this.id2 = s.id
    this.dni2 = s.dni
    this.lastName2 = s.lastName
    this.firstName2 = s.firstName
    this.email2 = s.email
    this.dni3 = s.dni
    this.lastName3 = s.lastName
    this.firstName3 = s.firstName
    this.email3 = s.email
    this.modalService.open(ver).result.then(() => {
      if (this.dni2.trim() !== '' && this.lastName2.trim() !== '' && this.firstName2.trim() !== '' && this.email2.trim() !== '' &&
        (this.dni2.trim() !== this.dni3.trim() || this.lastName2.trim() !== this.lastName3.trim() || this.firstName2.trim() !== this.firstName3.trim() || this.email2.trim() !== this.email3.trim())) {
        let student = new Student()
        student.id = this.id2
        student.dni = this.dni2
        student.lastName = this.lastName2
        student.firstName = this.firstName2
        student.email = this.email2
        student.cohort = 0
        student.status = 'activo'
        student.gender = 'masculino'
        student.address = 'abc123'
        student.phone = '000'
        this.studentService.edit(student).subscribe(() => {
          location.reload()
        }, error => {
          console.error(error)
          alert('Error: ' + error.error.message)
        })
      }
    }, reason => { })
  }
}