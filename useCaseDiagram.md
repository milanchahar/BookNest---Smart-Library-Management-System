```mermaid
flowchart TD

User[Member]

Register[Register]
Login[Login]
Search[Search Book]
Borrow[Borrow Book]
Return[Return Book]
Reserve[Reserve Book]
ViewFine[View Fine]
Purchase[Purchase Request]

Admin[Librarian]
ManageInventory[Manage Inventory]
OverrideFine[Override Fine]
ManageUsers[Manage Users]
Reports[View Reports]

User --> Register
User --> Login
User --> Search
User --> Borrow
User --> Return
User --> Reserve
User --> ViewFine
User --> Purchase

Admin --> ManageInventory
Admin --> OverrideFine
Admin --> ManageUsers
Admin --> Reports
Admin --> Search
```
