```mermaid
usecaseDiagram
    actor Student
    actor Faculty
    actor "Librarian (Admin)" as Admin

    package "BookNest System Scope" {
        usecase "Login / Authentication" as UC1
        usecase "Search Catalog" as UC2
        usecase "Borrow Book" as UC3
        usecase "Return Book" as UC4
        usecase "Pay Fine" as UC5
        usecase "Manage Inventory" as UC6
        usecase "Generate Reports" as UC7
        usecase "System Configuration" as UC8
        usecase "Reserve Book" as UC9
    }

    Student --> UC1
    Student --> UC2
    Student --> UC3
    Student --> UC4
    Student --> UC9
    
    Faculty --> UC1
    Faculty --> UC2
    Faculty --> UC3
    Faculty --> UC4
    Faculty --> UC9

    Admin --> UC1
    Admin --> UC6
    Admin --> UC7
    Admin --> UC8
    Admin --> UC5 : "Override Fine"

    UC3 ..> UC1 : <<include>>
    UC9 ..> UC3 : <<extend>>
    UC4 ..> UC5 : <<include>>
    UC3 <.. UC2 : <<extend>>
```