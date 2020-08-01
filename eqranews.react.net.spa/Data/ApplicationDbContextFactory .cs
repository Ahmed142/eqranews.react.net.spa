﻿using IdentityServer4.EntityFramework.Options;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Design;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.Options;
using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Threading.Tasks;

namespace eqranews.react.net.spa.Data
{
    public class ApplicationDbContextFactory<T> : IDesignTimeDbContextFactory<T> where T : DbContext
    {
        public T CreateDbContext(string[] args)
        {
            IConfigurationRoot configuration = new ConfigurationBuilder()
            .SetBasePath(Directory.GetCurrentDirectory())
            .AddJsonFile("appsettings.json")
            .Build();


            var builder = new DbContextOptionsBuilder<T>();
            var connectionString = configuration.GetConnectionString("ConfigurationDb");
            builder.UseMySql(connectionString);

            var dbContext = (T)Activator.CreateInstance(
                typeof(T),
                builder.Options);

            return dbContext;
        }
    }
}
