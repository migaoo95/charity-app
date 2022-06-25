// Get a single charity data
export const QGL_SINGLE_QUERY = `
query ListLimitSkip($id:[ID]) {
  CHC {
    getCharities(filters: {id: $id}) {
      list {
        id
        name
        orgIds{
          id
        }
       registrations {
        registrationDate
      }
        causes{
          name
        }
        website
        objectives
        operations{name}
       image{
        
        logo{
          medium
        }
      }
        numPeople{
          employees
          trustees
          volunteers
        }
        contact{

          postcode
          phone
          email
          social{
            platform
            handle
          }
        }
      }
    }
  }
}
`;
export const QGL_QUERY = `
query ListLimitSkip($limit:PageLimit) {
  CHC {
    getCharities(filters: {}) {
      list(limit: $limit, skip: 30) {
        id
        name
        causes{
          name
        }
        website
        objectives
        operations{name}
       image{
        logo{
          small
        }
      }
        contact{
          social{
            platform
            handle
          }
        }
      }
    }
  }
}  
`;
// export const QGL_QUERY = `
// query ListLimitSkip {
//   CHC {
//     getCharities(filters: {}) {
//       list(limit: 10, skip: 30) {
//         id
//         name
//         causes{
//           name
//         }
//         website
//         objectives
//         operations{name}
//        image{
//         logo{
//           small
//         }
//       }
//         contact{
//           social{
//             platform
//             handle
//           }
//         }

//       }
//     }
//   }
// }
// `;
