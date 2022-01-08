
import { html } from "./lib.js";


const donateTemplate = ()=>html`
<section id="welcome-world">
<div id="donate-page">
    <h1>Donate Section</h1>
<!-- Display div: with information about every offer (if any) -->
<div class="donate-wrapper">
<p class="donate-info">
We are young fast growing team and we all believe and support crypto currency!
If you really like platform and belive in us you can support us.
</p>
<h2 class='wallet-address'>Wallets Address</h2>
<div class="donate-links">
<!-- <div class="donate-address"> -->
  <span class="span-links">BTC: 1Gge8ZAgnB6pCwQ36AKuf4YpBHeJCYFGB2<a href="javascript:void(0)"><img src="./img/btc-address.jpg"> </a> </a></span>
  <span class="span-links">Dash: Xd12wNVMSPnYMfykSTg2RBvC3BdcME7aqb<a href="javascript:void(0)"><img src="./img/dash-address.jpg"></a></span>
  <span class="span-links">Ethereum(ERC20): 0x39d0252b5022285694e55fb8356661e26a303b09<a href="javascript:void(0)"><img src="./img/etherium-address.jpg"></a></span>
  <span class="span-links">Litecoin: LMhGSuaftBTcb6cK9gqMweVA1bhiX29jnT<a href="javascript:void(0)"><img src="./img/ltc-address.jpg"></a></span>

</div>
    </div>
  </div>
</section>
<div class="push"></div>
`;
export async function donatePage(ctx) {

    ctx.render(donateTemplate())
}


