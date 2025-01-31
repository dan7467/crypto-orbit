const socket = io('http://localhost:3000');
        var params = new URLSearchParams(window.location.search);
        const coin_name = params.get('requested_coin');
        const data = [];
        const max_graph_len = 150;

        if (coin_name !== "") {
            document.getElementById('coin_title_and_price').innerHTML = `<div id="${coin_name}" class="price" style="font-size: 34px;">${coin_name.charAt(0).toUpperCase()}${coin_name.substring(1)} = <span id="${coin_name}-price">Loading...</span></div>`;
        }
        else {
            document.getElementById('coin_title_and_price').innerText = "An Error has occured, please go back and try again!";
        }
        Date.prototype.timeNow = function () {
            return ((this.getHours() < 10)?"0":"") + this.getHours() +":"+ ((this.getMinutes() < 10)?"0":"") + this.getMinutes() +":"+ ((this.getSeconds() < 10)?"0":"") + this.getSeconds();
        }
        function getCookie(cname) {
            let ca = decodeURIComponent(document.cookie).split(';');
            let c;
            for(let i = 0; i <ca.length; i++) {
                c = ca[i];
                while (c.charAt(0) == ' ') {
                    c = c.substring(1);
                }
                if (c.indexOf(cname + "=") == 0) {
                    return c.substring(cname.length + 1, c.length);
                }
            }
            return "";
        }

        function setCookie(cname, cvalue, hours_to_expire) {
            const d = new Date();
            d.setTime(d.getTime() + (hours_to_expire*60*60*1000));
            document.cookie = cname + "=" + cvalue + ";" + "expires="+ d.toUTCString() + ";path=/";
        }
    
        document.addEventListener("DOMContentLoaded", function () {
            // Setup Chart.js
            let ctx = document.getElementById('barChart').getContext('2d');
            
            const config = {
                type: 'line',
                data: {
                    datasets: [{
                        label: coin_name.charAt(0).toUpperCase()+coin_name.substring(1)+' Price ($)',
                        borderWidth: 2,
                        radius: 0,
                        data: data,
                        segment: {
                        borderColor: (ctx) => {
                            return ctx.p1.parsed.y > ctx.p0.parsed.y ? '#66ff33' : '#ff1a1a';
                        }
                    }
                    }]
                },
                options: {
                    animation: true, // Disable animations for real-time updates
                    interaction: {
                        intersect: false
                    },
                    plugins: { legend: {display: false} },
                    scales: {
                        x: {
                            type: 'time', // Use time scale for X-axis
                            time: {
                                unit: 'second', // Format by seconds
                                displayFormats: {
                                    second: 'HH:mm:ss' // Format as HH:MM:SS:MS
                                }
                            },
                            title: { display: true, text: 'Time (HH:mm:ss)' }
                        },
                        y: {
                            title: {
                                display: true,
                                text: 'Price ($)'
                            },
                            beginAtZero: false,
                        }
                    }
                }
            };
    
            let priceChart = new Chart(ctx, config);
    
            socket.on('prices', (prices) => {
                if (coin_name in prices) {
                    const price = parseFloat(prices[coin_name]).toFixed(2);
                    
                    const elem = document.getElementById(coin_name + '-price');

                    elem.textContent = `${Number(price).toLocaleString("en-US")} $ (USD)`;

                    data.push({ x: new Date().timeNow(), y: parseFloat(price) });

                    const lastPrice = parseFloat(getCookie(coin_name)).toFixed(2);

                    if (lastPrice !== "") {
                        config.data.datasets[0].borderColor = price > lastPrice ? '#66ff33' : '#ff1a1a';
                        elem.style.color = config.data.datasets[0].borderColor;
                    }
    
                    if (data.length > max_graph_len) {
                        data.shift();
                    }

                    setCookie(coin_name, prices[coin_name], 0.15);
    
                    priceChart.update();
                }
            });
        });