document.addEventListener("DOMContentLoaded", () => {
    const sectionMetrics = document.querySelector("#metrics");
    const selectCampaign = document.querySelector("#campaign");
    const sectionCharts = document.querySelector("#charts");
    const inferenceSection = document.querySelector("#inference");

    fetch("dataCampaign.json")
        .then((response) => response.json())
        .then((dataCampaign) => {
            selectCampaign.addEventListener("change", () => {
                const campaignSelected = selectCampaign.value;
                const campaign = dataCampaign[campaignSelected];
                sectionMetrics.innerHTML = "";

                if(campaign) {
                    const CTR = campaign.visits/campaign.shows*100;
                    const CV1 = campaign.requests/campaign.visits*100;
                    const CV2 = campaign.payments/campaign.requests*100;
                    const ROI = (campaign.benefit-campaign.expenses)/campaign.expenses*100;
                    let negativeColor = "";
                    let positiveColor = "";
                    let negROI = 0;
                    let investment = "прибыль";
                    if(ROI < 0){
                        negativeColor = "#ED1C24";
                        positiveColor = "#ffffff";
                        negROI = ROI;
                        investment = "убыток";
                    }
                    else {
                        negativeColor = "#ffffff";
                        positiveColor = "#26ED79";
                    }
                    const table = document.createElement("table");
                    table.innerHTML = `
                    <tbody>
                    <tr>
                        <td>Показы<br><p>${campaign.shows}</p></td>
                        <td>Визиты<br><p>${campaign.visits}</p></td>
                        <td>Расходы<br><p>${campaign.expenses}</p></td>
                        <td>Заявки<br><p>${campaign.requests}</p></td>
                        <td>Оплаты<br><p>${campaign.payments}</p></td>
                        <td>Средний чек<br><p>${campaign.averageCheck}</p></td>
                        <td>Прибыль<br><p>${campaign.benefit}</p></td>
                    </tr>
                    </tbody>
                    `;
                    sectionMetrics.style.display = "block";
                    sectionMetrics.appendChild(table);

                    sectionCharts.innerHTML = "";

                    const divFunnelMetrics = document.createElement("div");
                        divFunnelMetrics.className = "funnelMetrics";
                        divFunnelMetrics.innerHTML = `
                        <div><p>Показы:</p></div>
                        <div><p>Визиты:</p></div>
                        <div><p>Заявки:</p></div>
                        <div><p>Оплаты:</p></div>`;
                        sectionCharts.appendChild(divFunnelMetrics);

                    const divFunnel = document.createElement("div");
                    divFunnel.className = "funnel";
                    divFunnel.innerHTML = `
                    <p>ВОРОНКА ПРОДАЖ:</p>
                    <div class="shows" 
                    style="width : ${campaign.shows/2500}px; background-color : #B9E5F3;"></div>
                    <div class="visits" 
                    style="width : ${campaign.visits/2500}px; background-color : #8AD4EB;"></div>
                    <div class="requests" 
                    style="width : ${campaign.requests/2500}px; background-color : #34B4E5;"></div>
                    <div class="payments" 
                    style="width : ${campaign.payments/2500}px; background-color : #1A7C9A;"></div>`;
                        sectionCharts.appendChild(divFunnel);

                    const divMetricsCalculate = document.createElement("div");
                    divMetricsCalculate.className = "calculateMetrics";
                    divMetricsCalculate.innerHTML = `
                    <div><p>CTR = ${parseFloat(CTR.toFixed(2))}%</p></div>
                    <div><p>CV1 =  ${parseFloat(CV1.toFixed(2))}%</p></div>
                    <div><p>CV2 =  ${parseFloat(CV2.toFixed(2))}%</p></div>
                    <div><p>ROI =  ${parseFloat(ROI.toFixed(2))}%</p></div>`;
                    sectionCharts.appendChild(divMetricsCalculate);

                    const negativeROI = document.createElement("div");
                    negativeROI.className = "negative";
                    negativeROI.innerHTML = `
                    <div class="negatROI" 
                        style="width : ${Math.abs(negROI)}px; background-color : ${negativeColor};"></div>`;
                        sectionCharts.appendChild(negativeROI);

                    const metricsCalculate = document.createElement("div");
                    metricsCalculate.className = "calculate"
                    metricsCalculate.innerHTML = `
                        <p>РАСЧЕТ МЕТРИК ЭФФЕКТИВНОСТИ РЕКЛАМЫ:</p>
                        <div class="CTR" 
                        style="width : ${CTR}px; background-color : #B9E5F3;"></div>
                        <div class="CV1" 
                        style="width : ${CV1}px; background-color : #34B4E5;"></div>
                        <div class="CV2" 
                        style="width : ${CV2}px; background-color : #219EC5;"></div>
                        <div class="ROI" 
                        style="width : ${Math.abs(ROI)}px; background-color : ${positiveColor};"></div>`;
                    
                    sectionCharts.appendChild(metricsCalculate);

                    inferenceSection.innerHTML = "";
                    const inference = document.createElement("div");
                    inference.innerHTML = `
                    <p>ROI(коэффициент возврата инвестиций) показывает, работает реклама в плюс или в убыток. 
                    Если ROI больше 0% — в плюс, меньше 0% — в убыток. Данная рекламная компания приносит ${investment}.</p>`;
                    inferenceSection.appendChild(inference);
                    sectionCharts.style.display = "inline-block";
                    inferenceSection.style.display = "block";
                    
                        
                } else {
                    sectionMetrics.style.display = "none";
                    sectionCharts.style.display = "none";
                    inferenceSection.style.display = "none"; }
            })
        })
});