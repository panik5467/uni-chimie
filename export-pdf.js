// format euro
const euroFormat = (value) => {
	let euro = Intl.NumberFormat('fr-FR', {
		minimumFractionDigits: 2,
		maximumFractionDigits: 2,
	})
	return euro.format(value).replace(' ',' ');
}

const exportPDF = () => {
	let panier = table.getData('active');
	let headers = [["Référence","Quantité","Désignation","Prix €","Montant €"]];

    var doc = new jsPDF('p', 'pt', 'a4')
	let sum = 0, body = [];
	panier.forEach(u => {
		sum += u.Total * 100;
		let prix = euroFormat(u.PrixC);
		let total = euroFormat(u.Total);
		body.push([u['Référence'],u['Quantité'],u['Désignation'],prix,total])
	});

	sum = euroFormat(sum / 100);

	body.push(
    [	{
            content: 'TOTAL  ',
            colSpan: 4,
            styles: {
                halign: 'right'
			},
		},
        {
            content: sum,
        }
    ]
	);
    // generate auto table with body
    var y = 10;
    doc.setLineWidth(2);
    doc.text(200, y = y + 30, "Bon de Commande");
    doc.autoTable({
        body: body,
		head: headers,
        startY: 70,
        theme: 'grid',
		columnStyles: {
           0: {
			  cellWidth: 70,
              halign: 'center'
           },
           1: {
              halign: 'center',
			  cellWidth: 60,
           },
           2: {
              halign: 'left'
           },
           3: {
              halign: 'right',
			  cellWidth: 50,
           },
           4: {
			  cellWidth: 60,
              halign: 'right'
           },
        },
		headStyles :{lineWidth: 1,fillColor: [124, 95, 240],textColor: [255,255,255], halign: 'center' },
		alternateRowStyles: {fillColor : [239,239,239]},
		willDrawCell: drawCell,
    });
    // view pdf in new tab
	//window.open(URL.createObjectURL(doc.output("blob")))
    // save pdf to file
    doc.save('Bon-Commande.pdf')
}

const drawCell = function(data) {
  let doc = data.doc;
  let rows = data.table.body;
  if (rows.length === 1) {
  } else if (data.row.index === rows.length - 1) {
    doc.setFontStyle("bold");
    doc.setFontSize("10");
    doc.setFillColor(255, 255, 255);
  }
};
