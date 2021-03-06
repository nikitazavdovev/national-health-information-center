import { v4 as uuidv4 } from 'uuid';
import {
  ADD_NEW_TERMINOLOGY_FORM_DATA,
  REMOVE_NEW_TERMINOLOGY_FORM_DATA,
  ADD_NEW_TERMINOLOGY_ADMIN,
  ADD_NEW_TERMINOLOGY_USER,
  SEND_CODE_FOR_APPROVAL,
  APPROVE_CODE,
  DECLINE_CODE
} from "./types";

const generateId = uuidv4();

const initialState = {
  newTerminologyData: '',
  adminTerminologies: [
    {
      terminologyName: 'ICD8',
      id: uuidv4(),
      category: 'Diagnosis',
      status: {
        code: 1,
        message: 'Active'
      },
      lastUpdate: new Date().toDateString(),
      orgMapped: '14',
      version: '10.1',
    },
    {
      terminologyName: 'ICD9',
      id: uuidv4(),
      category: 'Diagnosis',
      status: {
        code: 2,
        message: 'Waiting for Approval'
      },
      lastUpdate: new Date().toDateString(),
      orgMapped: '11',
      version: '1.1',
    },
    {
      terminologyName: 'ICD10',
      id: uuidv4(),
      category: 'Diagnosis',
      status: {
        code: 0,
        message: 'Inactive'
      },
      lastUpdate: new Date().toDateString(),
      orgMapped: '3',
      version: '5.3',
    }
  ],
  userTerminologies: [
    {
      organizationId: 0,
      id: generateId,
      localTerminologyName: 'ICD8-user',
      category: 'Diagnosis',
      status: {
        code: 1,
        message: 'Fully mapped'
      },
      lastUpdate: new Date().toDateString(),
      codesMapped: '8/10',
    },
  ],
  terminologyMapData: [
    {
      terminologyId: generateId,
      data: [
        {
          localCodeId: '1',
          localCodeDescription: 'Electrocorticography',
          nationalCodeId: '45740-00',
          nationalCodeDescription: 'Electrocorticography',
          status: {
            code: 1,
            message: 'Fully mapped'
          },
          activationStatus: 1,
          matchDescription: null,
        },
        {
          localCodeId: '2',
          localCodeDescription: 'EMG with quantitative comput analysis',
          nationalCodeId: '45741-00',
          nationalCodeDescription: 'Electromyography with quantitative computerised analysis',
          status: {
            code: 1,
            message: 'Fully mapped'
          },
          activationStatus: 1,
          matchDescription: null,
        },
        {
          localCodeId: '3',
          localCodeDescription: 'Electroretinography [ERG]',
          nationalCodeId: '45742-00',
          nationalCodeDescription: 'Electroretinography [ERG]',
          status: {
            code: 1,
            message: 'Fully mapped'
          },
          activationStatus: 1,
          matchDescription: null,
        },
        {
          localCodeId: '4',
          localCodeDescription: 'Air conduction audiometry, std tech',
          nationalCodeId: '45743-00',
          nationalCodeDescription: 'Air conduction audiometry, standard technique',
          status: {
            code: 1,
            message: 'Fully mapped'
          },
          activationStatus: 1,
          matchDescription: null,
        },
        {
          localCodeId: '5',
          localCodeDescription: '>=3 Osteo/ostectomies mandible w IF',
          nationalCodeId: '45744-00',
          nationalCodeDescription: 'Osteotomies or ostectomies of mandible, >= 3 procedures, with internal fixation',
          status: {
            code: 1,
            message: 'Fully mapped'
          },
          activationStatus: 1,
          matchDescription: null,
        },
        {
          localCodeId: '6',
          localCodeDescription: 'Removal of synthetic skin graft',
          nationalCodeId: '45745-00',
          nationalCodeDescription: 'Removal of synthetic skin',
          status: {
            code: 2,
            message: 'Partially mapped'
          },
          activationStatus: 0,
          matchDescription: [
            {
              id: '45745-00',
              description: 'Removal of synthetic skin',
              match: '95%',
            },
            {
              id: '45745-01',
              description: 'Removal of synthetic skin graft to burn',
              match: '80%',
            },
            {
              id: '45745-02',
              description: 'Excision of skin for graft',
              match: '65%',
            },

          ],
        },
        {
          localCodeId: '7',
          localCodeDescription: 'Osteotomy of zygoma',
          nationalCodeId: '45746-00',
          nationalCodeDescription: 'Osteotomy of zygoma, unilateral',
          status: {
            code: 2,
            message: 'Partially mapped'
          },
          activationStatus: 0,
          matchDescription: [
            {
              id: '45746-00',
              description: 'Osteotomy of zygoma, unilateral',
              match: '95%',
            },
            {
              id: '45746-01',
              description: 'Ostectomy of zygoma, bilateral',
              match: '90%',
            },
            {
              id: '45746-02',
              description: 'Ostectomy of zygoma with internal fixation',
              match: '75%',
            },
          ],
        },
        {
          localCodeId: '8',
          localCodeDescription: 'Magnetic resonance imaging',
          nationalCodeId: '45747-00',
          nationalCodeDescription: 'Magnetic resonance imaging of brain',
          status: {
            code: 2,
            message: 'Partially mapped'
          },
          activationStatus: 0,
          matchDescription: [
            {
              id: '45747-00',
              description: 'Magnetic resonance imaging of brain',
              match: '95%',
            },
            {
              id: '45747-01',
              description: 'Magnetic resonance imaging of head',
              match: '90%',
            },
            {
              id: '45747-02',
              description: 'Magnetic resonance imaging of neck',
              match: '85%',
            },
          ],
        },
        {
          localCodeId: '9',
          localCodeDescription: 'Other open procedures for obesity',
          nationalCodeId: '',
          nationalCodeDescription: '',
          status: {
            code: 0,
            message: 'Not mapped'
          },
          activationStatus: 0,
          matchDescription: null,
        },
        {
          localCodeId: '10',
          localCodeDescription: 'Endoscopic revision of device in stomach',
          nationalCodeId: '',
          nationalCodeDescription: '',
          status: {
            code: 0,
            message: 'Not mapped'
          },
          activationStatus: 0,
          matchDescription: null,
        },
      ]
    }
  ],
  pendingRequest: []
};

export const terminologyReducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_NEW_TERMINOLOGY_FORM_DATA:
      return {...state, newTerminologyData: action.payload};
    case REMOVE_NEW_TERMINOLOGY_FORM_DATA:
      return {...state, newTerminologyData: ''};
    case ADD_NEW_TERMINOLOGY_ADMIN:
      return {
        ...state,
        adminTerminologies: [
          ...state.adminTerminologies,
          {
            terminologyName: action.payload.standardName,
            category: action.payload.standardCategory.value,
            status: {
              code: 0,
              message: 'Inactive'
            },
            lastUpdate: new Date().toDateString(),
            orgMapped: 0,
            version: 1
          }
        ]
      };
    case ADD_NEW_TERMINOLOGY_USER:
      return {
        ...state,
        userTerminologies: [
          ...state.userTerminologies,
          {
            id: uuidv4(),
            localTerminologyName: action.payload.standardName,
            category: action.payload.standardCategory.value,
            status: {
              code: 2,
              message: 'Mapping in process'
            },
            lastUpdate: new Date().toDateString(),
            codesMapped: 0
          }
        ]
      };
    case SEND_CODE_FOR_APPROVAL:
      return {
        ...state,
        terminologyMapData: state.terminologyMapData.map(item => {
          if(item.terminologyId === action.payload.payload.terminologyId) {
            return {
              ...item,
              data: item.data.map(code => {
                if (code.localCodeId === action.payload.payload.data.localCodeId) return {
                  ...action.payload.payload.data,
                  activationStatus: 2
                };
                return code;
              })
            }
          }
          return item
        }),
      };
    case APPROVE_CODE:
      return {
        ...state,
        terminologyMapData: state.terminologyMapData.map(item => {
          if(item.terminologyId === action.payload.terminologyId) {
            return {
              ...item,
              data: item.data.map(code => {
                if (code.localCodeId === action.payload.data.localCodeId) return {
                  ...code,
                  activationStatus: 1
                };
                return code;
              })
            }
          }
          return item;
        })
      };
    case DECLINE_CODE:
      return {
        ...state,
        terminologyMapData: state.terminologyMapData.map(item => {
          if(item.terminologyId === action.payload.terminologyId) {
            return {
              ...item,
              data: item.data.map(code => {
                if (code.localCodeId === action.payload.data.localCodeId) {
                  return {
                    ...code,
                    activationStatus: 0
                  };
                }
                return code;
              })
            }
          }
          return item;
        })
      };
    default:
      return state;
  }
};