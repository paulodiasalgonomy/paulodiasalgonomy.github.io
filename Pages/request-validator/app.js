let app = {
  config: {
    papa: {
      quoteChar: '"',
      escapeChar: '"',
      header: true,
      transformHeader: (key) => {
        return key.trim().replace(/[^\w\s]/gmi, '_').replace(/^_{1}/gim, '');
      },
      dynamicTyping: true,
      encoding: 'UTF-8',
      step: (result) => {
        let that = app;
        that.parseMsg(result)
      },
      complete: () => {
        console.log('CSV parse done');
      },
      error: (error) => {
        console.log('CSV parse error >> ', error);
      },
      skipEmptyLines: true,
      transform: (value, headerName) => {
        // A function to apply on each value.
        if (headerName === 'msg') {
          // remove escape slash from msg
          value = value.replace(/\\/gmi, '');
        }
        return value;
      }
    },
    requiredParameters: {
      recsForPlacements: ['apiKey','apiClientKey','placements','sessionId','userId','rcs','rid'],
      personalize: ['apiKey','apiClientKey','placements','sessionId','userId','rcs','rid','cv','ipor','ssl','includeRcs'],
      autocomplete: ['apiKey','placements','sessionId','userId','rcs','query','rid','lang','rows/count','start','ssl','log','channelId'],
      find: ['apiKey','placements','sessionId','userId','rcs','query','rid','lang','rows/count','start','ssl','log','channelId'],
      p13n: ['apiKey','placements','sessionId','userId','rcs','rid','ssl'],
      targeting: ['apiKey','apiClientKey','placements','sessionId','userId','rcs','rid'],
      experiences: ['apiKey','apiClientKey','sessionId','userId','rcs','rid']
    }
  },
  getTag: (id) => {
    return document.getElementById(id);
  },
  parseMsg: (row) => {
    let apacheLogRegex = /^(\S*).*\[(.*)\]\s"(\S*)\s(\S*)\s([^"]*)"\s(\S*)\s(\S*)\s"([^"]*)"\s"([^"]*)"$/gm;
    let groups = [...row?.data?.msg?.matchAll?.(apacheLogRegex)]?.[0];
    let parsedRow = {
      env: row?.data?.env,
      raw: groups[0],
      remoteHost: groups[1],
      time: groups[2],
      method: groups[3],
      rawQuery: groups[4],
      protocol: groups[5],
      status: groups[6],
      size: groups[7],
      referer: groups[8],
      agent: groups[9],
      parameters: new URLSearchParams(groups[4]?.replace?.(/%7C/gi, '|')?.substring?.(groups[4]?.indexOf('?'))),
      type: groups[4]?.indexOf?.('placements=') > -1 ? 'api' : groups[4]?.indexOf?.('pt=') > -1 ? 'p13n' : 'unknown'
    };

    // define API
    switch (true) {
      case parsedRow.rawQuery.includes('recsForPlacements'):
        if (parsedRow.rawQuery.includes('count')) {
          parsedRow.api = 'discover';
          parsedRow.apiClass = 'discover';
        } else {
          parsedRow.api = 'recsForPlacements';
          parsedRow.apiClass = 'recsForPlacements';
        }
        break;
      case parsedRow.rawQuery.includes('personalize'):
        parsedRow.api = 'personalize';
        parsedRow.apiClass = 'personalize';
        break;
      case parsedRow.rawQuery.includes('p13n_generated'):
        parsedRow.api = 'p13n';
        parsedRow.apiClass = 'p13n';
        break;
      case parsedRow.rawQuery.includes('find/v1/track/click'):
        parsedRow.api = 'findClick';
        parsedRow.apiClass = 'findClick';
        break;
      case parsedRow.rawQuery.includes('autocomplete'):
        parsedRow.parameters.set('apiKey', /[^/?]+(?=\?|$)/.exec(parsedRow.rawQuery)?.[0]);
        parsedRow.api = 'autocomplete';
        parsedRow.apiClass = 'autocomplete';
        break;
      case parsedRow.rawQuery.includes('find'):
        parsedRow.parameters.set('apiKey', /[^/?]+(?=\?|$)/.exec(parsedRow.rawQuery)?.[0]);
        parsedRow.api = 'find';
        parsedRow.apiClass = 'find';
        break;
      case parsedRow.rawQuery.includes('rrserver/click'):
        parsedRow.api = 'recsClick';
        parsedRow.apiClass = 'recsClick';
        break;
      case parsedRow.rawQuery.includes('targeting'):
        parsedRow.api = 'targeting';
        parsedRow.apiClass = 'dxp';
        break;
      case parsedRow.rawQuery.includes('experiences'):
        parsedRow.api = 'experiences';
        parsedRow.apiClass = 'dxp';
        break;
      case parsedRow.rawQuery.includes('trackExperienceEvent'):
        parsedRow.api = 'trackExperienceEvent';
        parsedRow.apiClass = 'dxp';
        break;
      default: 
        parsedRow.api = 'unknown';
    }

    // get request parameters
    parsedRow.validationParameters = {
      apiKey: parsedRow?.parameters?.get('a') ?? parsedRow?.parameters?.get('apiKey'),
      apiClientKey: parsedRow?.parameters?.get('ack') ?? parsedRow?.parameters?.get('apiClientKey'),
      placements: parsedRow?.parameters?.get('pt') ?? parsedRow?.parameters?.get('placements') ?? parsedRow?.parameters?.get('placement'),
      sessionId: parsedRow?.parameters?.get('s') ?? parsedRow?.parameters?.get('sessionId'),
      userId: parsedRow?.parameters?.get('u') ?? parsedRow?.parameters?.get('userId'),
      rcs: parsedRow?.parameters?.get('rcs'),
      order: parsedRow?.parameters?.get('o'),
      productId: parsedRow?.parameters?.get('p') ?? parsedRow?.parameters?.get('productId'),
      productPrice: parsedRow?.parameters?.get('pp'),
      productPriceCents: parsedRow?.parameters?.get('ppc'),
      quantity: parsedRow?.parameters?.get('q'),
      atcid: parsedRow?.parameters?.get('atcid'),
      categoryId: parsedRow?.parameters?.get('c') ?? parsedRow?.parameters?.get('categoryId'),
      chi: parsedRow?.parameters?.get('chi'),
      fpb: parsedRow?.parameters?.get('fpb'),
      name: parsedRow?.parameters?.get('n'),
      searchTerm: parsedRow?.type === 'p13n' ? parsedRow?.parameters?.get('st') : parsedRow?.parameters?.get('searchTerm'),
      channelId: parsedRow?.parameters?.get('channelId'),
      includeRcs: parsedRow?.parameters?.get('includeRcs'),
      log: parsedRow?.parameters?.get('log'),
      ssl: parsedRow?.parameters?.get('ssl'),
      ipor: parsedRow?.parameters?.get('ipor'),
      start: parsedRow?.parameters?.get('start') ?? parsedRow?.type !== 'p13n' ? parsedRow?.parameters?.get('st') : '',
      'rows/count': parsedRow?.parameters?.get('rows') ?? parsedRow?.parameters?.get('count'),
      lang: parsedRow?.parameters?.get('lang'),
      pref: parsedRow?.parameters?.get('pref'),
      cv: parsedRow?.parameters?.get('cv'),
      rid: parsedRow?.parameters?.get('rid'),
      query: parsedRow?.parameters?.get('query')
    }
    
    parsedRow.parametersFiltered = {};
    for (const [key, value] of parsedRow.parameters.entries()) {
      let validationParams = ['a', 'ack', 'apiClientKey', 'apiKey', 'atcid', 'c', 'categoryId', 'channelId', 'chi', 'count', 'cv', 'fpb', 'includeRcs', 'ipor', 'lang', 'log', 'n', 'o', 'p', 'placement', 'placements', 'pp', 'ppc', 'pref', 'productId', 'pt', 'q', 'query', 'rcs', 'rid', 'rows', 's', 'searchTerm', 'sessionId', 'ssl', 'st', 'start', 'u', 'userId'];
      if (!(new RegExp(validationParams.join('|'))).test(key)) {
        parsedRow.parametersFiltered[key] = value;
      }
    }

    app.appendRow(parsedRow);
  },
  appendRow: (row) => {
    let content = app.getTag('content');
    content.insertAdjacentHTML('afterbegin', app.buildRowHtml(row));
  },
  buildRowHtml: (row) => {
    // console.log(row);

    let html = `
    <table border='0' class='apiTable bg-${row.apiClass}'>
      <tr>
        <td><strong>Time: </strong>${row?.time}</td>
        <td><strong>Data Center: </strong>${row?.env}</td>
        <td><strong>API: </strong>${row.api}</td>
      </tr>
      ${
      !(new RegExp(['click', 'unknown', 'track'].join('|'))).test(row.api.toLowerCase())
        ? Object.entries(row.validationParameters)
          .map(([key, value]) => {
            let requiredKey = (new RegExp(app.config.requiredParameters[row.api].join('|'))).test(key);
            if (value || (value === null && requiredKey)) {
              return `<tr'><td><strong>${key}</strong></td><td colspan='2'>${value ?? ''}</td></tr>`;
            }
          }).join('')
        : ``
      }
      ${
        Object.entries(row.parametersFiltered)
        .map(([key, value]) => {
          return `<tr'><td><strong>${key}</strong></td><td colspan='2'>${value ?? ''}</td></tr>`;
        }).join('')
      }
      ${`<tr'><td><strong>Full Request</strong></td><td colspan='2'>${row?.rawQuery ?? ''}</td></tr>`}
    </table>
    `;
    return html;
  }
}

function init() {
  var targetFile = app.getTag('targetFile');
  targetFile.addEventListener('change', function (e) {
    var file = targetFile.files[0];
    Papa?.parse(file, app.config.papa);
  });
}