import { Grid } from "@material-ui/core";
import React from "react";
import MapContainer from "../MapSection/MapContainer";
import './featuressection.scss'

export default function FeaturesSection() {
    const facilities=["facility 1","facility 2","facility 3","facility 4","facility 5","facility 6"]
  return (
    <div style={{ backgroundColor: "#F4F4F4", marginTop: "3%" }}>
      <Grid container xs={12} style={{padding:"2%"}}>
        <Grid container xs={12}>
          <Grid item container xs={6}>
            {/* Facilities */}
            <Grid item container xs={12} style={{backgroundColor:"white",padding:"1%",borderRadius:"0.4rem"}}>
              <h2 style={{marginLeft:"5%"}} className="facilitiesLabel">Facilities</h2>
              <Grid item container spacing={2}  xs={12}>
                  {facilities.map((item)=>
                    <Grid className="facilityItem" spacing={2} item xs={3} >{item}</Grid>
                  )}
                
                
              </Grid>
            </Grid>

            {/* Offers */}
            
            <Grid item container xs={12} style={{marginTop:"2%"}}>
              Offers Lorem ipsum dolor, sit amet consectetur adipisicing elit.
              Consequatur, fugiat. Nostrum expedita magnam magni voluptatibus
              quo ex rem, necessitatibus accusamus placeat sit distinctio
              maiores perferendis exercitationem sed est nulla, inventore
              quisquam saepe voluptate? Repellendus voluptatem maiores eius
              recusandae numquam architecto nesciunt quas placeat inventore,
              nemo deserunt perferendis, ipsam tempora odit. Excepturi,
              molestias tenetur sit rerum quod quo natus maiores suscipit,
              mollitia at sunt architecto cumque eveniet magnam provident. Nemo
              quod eos quas aliquam quidem aperiam quaerat repudiandae, alias
              hic, ad autem ut expedita eum minus. Quos, soluta! Repudiandae
              accusamus tempore ex in asperiores eos nihil voluptatem nesciunt
              earum totam, doloribus illum, voluptas facere? Labore, amet!
              Similique unde enim vitae tempora? Omnis tenetur adipisci
              praesentium incidunt minima deserunt! Expedita, id. Dolore, fugiat
              saepe, velit provident aliquid iste sapiente mollitia officia
              blanditiis modi nobis ipsum veniam delectus earum doloribus harum
              nihil suscipit voluptatibus. Nobis nemo neque delectus molestiae!
              Saepe distinctio labore, autem alias soluta placeat at voluptates
              illo dolorem quasi dolorum accusamus eum similique sequi animi
              modi repudiandae quas quod quidem veniam ut, inventore eos. Sunt
              eaque quisquam laboriosam at nesciunt voluptates, perspiciatis
              consectetur architecto quod in non sit similique, eum voluptate
              sapiente? Rem non reprehenderit, quibusdam delectus distinctio
              fugiat autem magni.
            </Grid>
          </Grid>
          <Grid item container xs={6}>
            Lorem, ipsum dolor. Lorem ipsum dolor sit amet consectetur
            adipisicing elit. Deleniti ipsam explicabo in doloribus possimus,
            similique excepturi, omnis et nulla obcaecati voluptatum sit eum
            eligendi corporis recusandae distinctio odit nemo reiciendis ullam!
            Cupiditate aut veritatis nemo deleniti autem unde nam ut laudantium,
            dolore aliquid amet cumque, natus corrupti esse reiciendis soluta
            repudiandae optio perferendis? Inventore ipsa quis quae quisquam
            perspiciatis laboriosam! Fuga autem itaque iusto non modi quia,
            tempora asperiores. Rerum pariatur beatae voluptate. Itaque magni
            exercitationem dolor similique possimus libero consectetur, nihil
            sit ratione animi optio. Vero sed autem dolorum cumque, porro
            dignissimos in doloribus blanditiis sint libero ipsa ullam iste quis
            optio vel corporis repellat consequuntur! Modi perferendis tenetur,
            quibusdam expedita corporis sint error suscipit omnis nam quidem
            debitis adipisci reiciendis quo ex pariatur obcaecati ipsum sequi
            sed iusto illo neque eos animi amet aliquid! Explicabo,
            reprehenderit obcaecati! Magni iste cupiditate numquam
            necessitatibus eum architecto non alias expedita praesentium. Cumque
            a voluptatibus excepturi consequatur illum sed quis facere sunt
            deleniti sint corrupti, ea possimus aut ducimus maiores, accusamus
            quibusdam id autem nostrum est. Aliquam repudiandae ipsum optio
            velit architecto, ex beatae animi, impedit officiis tenetur facilis
            atque magnam incidunt. Quos excepturi facilis provident itaque alias
            quidem corporis architecto maiores.
          </Grid>
        </Grid>

        <Grid item xs={12}>
          <MapContainer />
        </Grid>
      </Grid>
    </div>
  );
}
