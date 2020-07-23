import namor from 'namor'

const range = len => {
  const arr = [];
  for (let i = 0; i < len; i++) {
    arr.push(i)
  }
  return arr
};

const randomDate = (date1, date2) => {
  function randomValueBetween(min, max) {
    return Math.random() * (max - min) + min;
  }
  var date1 = date1 || '01-01-1970';
  var date2 = date2 || new Date().toLocaleDateString();
  date1 = new Date(date1).getTime();
  date2 = new Date(date2).getTime();
  if( date1>date2){
    return new Date(randomValueBetween(date2,date1)).toLocaleDateString()
  } else{
    return new Date(randomValueBetween(date1, date2)).toLocaleDateString()

  }
};

const newCode = (terminologyName) => {
  const version = Math.floor(Math.random() * 100);
  const isLatest = Math.random() > 0.33;

  const status = () => {
    const random = Math.random();

    return {
      code: random > 0.66 ? 1 : 0,
      message: random > 0.66 ? 'Active' : 'Inactive'
    }
  }

  const codeVersions = () => {
    const versions = [
      {
        code: version,
        status: 'active'
      },
      {
        code: version - 1,
        status: 'inactive',
      }
    ];

    if(!isLatest) versions.unshift({code: version + 1, status: 'waiting for approval'})

    return versions
  };
  return {
    terminologyName: terminologyName ? terminologyName : namor.generate({ words: 1, numbers: 0 }),
    category: namor.generate({ words: 1, numbers: 0 }),
    codeId: terminologyName ? Math.floor(Math.random() * 10000) : null,
    description: terminologyName ? namor.generate({ words: 1, numbers: 0 }) : null,
    status: status(),
    lastUpdate: new Date(Math.random()).toLocaleDateString(),
    orgMapped: Math.floor(Math.random() * 100),
    version: version,
    isLatest: isLatest,
    versions: codeVersions(),
  }
};

export default function makeData(terminologyName, ...lens) {
  const makeDataLevel = (depth = 0) => {
    const len = lens[depth];
    return range(len).map(d => {
      return {
        ...newCode(terminologyName),
        subRows: lens[depth + 1] ? makeDataLevel(depth + 1) : undefined,
      }
    })
  };

  return makeDataLevel()
}
