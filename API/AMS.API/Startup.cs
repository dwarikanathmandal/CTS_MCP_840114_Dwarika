using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using Microsoft.Extensions.Logging;
//using Microsoft.AspNetCore.Authentication.JwtBearer;
using AMS.API.Persistence;
using Microsoft.EntityFrameworkCore;

namespace AMS.API
{
    public class Startup
    {
        readonly string AllowAuditorClient = "_allowAuditorClient";
        public Startup(IConfiguration configuration)
        {
            Configuration = configuration;
        }

        public IConfiguration Configuration { get; }

        // This method gets called by the runtime. Use this method to add services to the container.
        public void ConfigureServices(IServiceCollection services)
        {
            services.AddDbContext<AuditingSystemContext>(options =>
            options.UseSqlite(Configuration.GetConnectionString("DefaultConnection")));

            //services.AddAuthentication(options =>
            //{
            //    options.DefaultAuthenticateScheme = JwtBearerDefaults.AuthenticationScheme;
            //    options.DefaultChallengeScheme = JwtBearerDefaults.AuthenticationScheme;
            //}).AddJwtBearer(options =>
            //{
            //    options.Authority = $"https://{Configuration["Auth0:Domain"]}/";
            //    options.Audience = Configuration["Auth0:Audience"];
            //});

            services.AddCors(options =>
            {
                options.AddPolicy(name: AllowAuditorClient,
                                  builder =>
                                  {
                                      builder.WithOrigins("http://localhost:3000", "http://localhost:3001");
                                      builder.WithMethods("*");
                                      builder.WithHeaders("*");
                                  });
            });

            services.AddControllers();
        }

        // This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
        public void Configure(IApplicationBuilder app, IWebHostEnvironment env)
        {
            if (env.IsDevelopment())
            {
                app.UseDeveloperExceptionPage();
            }

            app.UseRouting();

            app.UseCors(AllowAuditorClient);

            app.UseAuthorization();

            app.UseEndpoints(endpoints =>
            {
                endpoints.MapControllers();
            });
        }
    }
}
