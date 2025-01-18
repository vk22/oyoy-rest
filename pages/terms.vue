<template>
  <div class="info-page">
    <header :class="{ onscroll: scrolled }">
      <div class="logo">
        <nuxt-link to="/">
          <img src="/img/logo-b.svg" alt="" />
        </nuxt-link>
      </div>
    </header>

    <div class="policy">
      <div>
        <h2><strong>Terms and Conditions</strong></h2>
        <p>Effective Date: 18 January 2025</p>


        <p>Welcome to OyOy Restaurant! </p>

        <p>These Terms and Conditions ("Terms") govern your use of the OyOy Restaurant website ("Website") operated by ODYC Ltd ("we," "our," or "us"), a company registered in Malta under registration number C 097903.</p>

        <p>By accessing or using our Website or Restaurant, you agree to be bound by these Terms and Conditions and our Privacy Statement. If you do not agree to these Terms, please do not use our Website nor visit our Restaurant.</p>

        <p>1. General Information</p>

        <p>1.1. The Website is operated by ODYC Ltd, a restaurant registered in Malta with its operational location at 94 Spinola Road, St Julians.</p>

        <p>1.2. OyOy Restaurant provides dining services, catering options, and related information through this Website.</p>

        <p>2. Use of the Website</p>

        <p>2.1. The content of this Website is for your general information and use only. It is subject to change without notice.</p>

        <p>2.2. You agree to use the Website for lawful purposes only and in a manner that does not infringe the rights of, or restrict or inhibit the use and enjoyment of the Website by any third party.</p>

        <p>2.3. Unauthorized use of the Website may give rise to a claim for damages and/or constitute a criminal offense.</p>

        <p>3. Reservations and Orders</p>

        <p>3.1. Any reservations or orders placed through the Website are subject to availability and confirmation.</p>

        <p>3.2. Prices and availability of menu items are subject to change without notice.</p>

        <p>3.3. ODYC Ltd reserves the right to refuse or cancel any order or reservation at our discretion.</p>

        <p>4. Intellectual Property</p>

        <p>4.1. All content on this Website, including but not limited to text, images, logos, and graphics, is the property of ODYC Ltd or its licensors and is protected by applicable intellectual property laws.</p>

        <p>4.2. You may not reproduce, distribute, or otherwise use any content from this Website without prior written consent from ODYC Ltd.</p>

        <p>5. Limitation of Liability</p>

        <p>5.1. While we strive to ensure that the information provided on the Website is accurate, we do not guarantee its completeness or suitability for any particular purpose. Your use of the information is entirely at your own risk.</p>

        <p>5.2. ODYC Ltd shall not be liable for any direct, indirect, incidental, consequential, or punitive damages arising out of your use of the Website or any services offered.</p>

        <p>5.3. ODYC Ltd accepts no liability for accidents, injuries, or illnesses that occur within the restaurant premises or as a result of consuming our food or beverages. Guests are encouraged to notify staff of any dietary restrictions or allergies prior to ordering.</p>

        <p>6. Privacy Policy</p>

        <p>6.1. By using the Website, you acknowledge that you have read and understood our Privacy Policy, which explains how we collect, use, and protect your personal data.</p>
        
        <p>6.2. For more information, please see our <a href="/privacy" target="_blank">Privacy Policy</a>.</p>

        <p>7. Links to Third-Party Websites</p>

        <p>7.1. This Website may contain links to third-party websites for your convenience. ODYC Ltd has no control over the content of these websites and does not endorse or assume responsibility for them.</p>

        <p>7.2. Accessing third-party websites is at your own risk.</p>

        <p>8. Amendments</p>

        <p>8.1. ODYC Ltd reserves the right to amend these Terms at any time. Changes will be effective immediately upon posting on the Website.</p>

        <p>8.2. Continued use of the Website following any changes constitutes your acceptance of the updated Terms.</p>

        <p>9. Governing Law and Jurisdiction</p>

        <p>9.1. These Terms shall be governed by and construed in accordance with the laws of Malta.</p>

        <p>9.2. Any disputes arising out of or in connection with these Terms shall be subject to the exclusive jurisdiction of the Maltese courts.</p>

        <p>10. Contact Information</p>

        <p>For any questions or concerns about these Terms, please contact us:<br><br>

        OyOy Restaurant<br>
        Operated by ODYC Ltd<br>
        Registration Number: C 097903<br>
        94 Spinola Road, St Julians<br>
        E-mail: info @ oyoyrestaurant.com<br>
       </p>

      </div>
    </div>
  </div>
</template>
  
  <script>
export default {
  components: {},
  data() {
    return {
      isShow: false,
      arrowPos: 0,
      limitPosition: 100,
      scrolled: true,
      lastPosition: 0,
    };
  },
  mounted: function () {
    //this.startRotation();
    //this.isShow = true;
    setTimeout(() => {
      this.isShow = true;
    }, 100);
  },
  methods: {},

  computed: {},
  beforeRouteLeave(to, from, next) {
    //this.$modal.hide();
    next();
  },
};
</script>
  
<style lang="scss">
.info-page {
  padding: 3rem 4rem;

  header {
    position: relative;
    width: 100%;
    max-width: 980px;
    margin: 0 auto;
    margin-bottom: 4rem;
    display: flex;
    justify-content: center;
  }
  .logo {
    width: 220px;
  }
}
.policy {
  position: relative;
  width: 100%;
  max-width: 980px;
  margin: 0 auto;
  color: #111;
  padding-bottom: 2rem;

  p {
    text-align: justify;
  }

  h2 {
    text-transform: uppercase;
    margin-bottom: 3rem;
    text-align: center;
  }
}
</style>
  